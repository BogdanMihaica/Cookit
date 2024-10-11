package com.cookit.app.services;

import com.cookit.app.models.RecipeModelResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class RecipeScrapingService {

    public List<String> urls = List.of("https://www.simplyrecipes.com/recipes-5090746");

    public Set<RecipeModelResponse> scrapeRecipes() {
        Set<RecipeModelResponse> recipes = new HashSet<>();
        for (String url : urls) {
            System.out.println(url);
            if (url.contains("simply")) {
                extractFromSimply(recipes, url);
            }
        }
        return recipes;
    }

    private CompletableFuture<List<String>> simplyExtractRecipeUrls(String link) {
        return CompletableFuture.supplyAsync(() -> {
            List<String> recipeUrls = new ArrayList<>();
            try {
                Document document = Jsoup.connect(link).get();
                Element recipesContainer = document.getElementById("mntl-taxonomysc-article-list_1-0");
                if (recipesContainer != null) {
                    Elements recipes = recipesContainer.getElementsByTag("a");
                    for (Element anchor : recipes) {
                        Element footerDiv = anchor.selectFirst("div.card__footer:not(:empty)");
                        if (footerDiv != null) {
                            recipeUrls.add(anchor.attr("href"));
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return recipeUrls;
        });
    }


    private void extractDetailsOfSimplyRecipe(RecipeModelResponse response, String url) {
        try {
            Document document = Jsoup.connect(url).get();
            Element article = document.getElementById("article--structured-project_1-0");
            if (article == null) return;


            Element categoryList = article.getElementById("breadcrumbs__list_1-0");
            String category = (categoryList != null && categoryList.getAllElements().size() > 1)
                    ? categoryList.getAllElements().get(categoryList.getAllElements().size()-1).text()
                    : null;
            // Handle image URL extraction safely
            String imgUrl = article.getElementsByClass("primary-image__image").first() != null
                    ? article.getElementsByClass("primary-image__image").first().attr("src")
                    : null;

            Element ingredientsList = article.getElementsByClass("structured-ingredients__list").first();
            Element stepsList = article.getElementById("structured-project__steps_1-0").children().first();
            StringBuilder ingredients = new StringBuilder();
            StringBuilder steps = new StringBuilder();


            if (ingredientsList != null) {
                for (Element listElement : ingredientsList.children()) {
                    ingredients.append(listElement.text()).append("|");
                }
            }

            int i = 1;
            if (stepsList != null) {
                for (Element step : stepsList.children()) {
                    StringBuilder liStep = new StringBuilder();
                    steps.append(i).append(". ");
                    for(Element li : step.children())
                    {
                        if(!Objects.equals(li.tagName(), "figure"))
                            liStep.append(li.text());
                    }
                    steps.append(liStep);
                    steps.append("|");
                    i++;
                }
            }


            String title = article.getElementsByClass("heading__title").size() > 0
                    ? article.getElementsByClass("heading__title").first().text()
                    : null;
            String description = article.getElementsByClass("heading__subtitle").size() > 0
                    ? article.getElementsByClass("heading__subtitle").first().text()
                    : null;
            String servings = article.getElementsByClass("project-meta__recipe-serving").size() > 0
                    ? article.getElementsByClass("project-meta__recipe-serving").first()
                    .getElementsByTag("span").size() > 1
                    ? article.getElementsByClass("project-meta__recipe-serving").first()
                    .getElementsByTag("span").first()
                    .getElementsByTag("span").last().text()
                    : "0"
                    : "0";
            String preparationTime = article.getElementsByClass("project-meta__total-time").size() > 0
                    ? article.getElementsByClass("project-meta__total-time").first()
                    .getElementsByTag("span").size() > 1
                    ? article.getElementsByClass("project-meta__total-time").first()
                    .getElementsByTag("span").first()
                    .getElementsByTag("span").last().text()
                    : "0"
                    : "0";


            if (title == null || imgUrl == null || description == null || category == null) {
                return;
            }

            response.setTitle(title);
            response.setAuthorId(1);
            response.setCategory(category);
            response.setPhotoUrl(imgUrl);
            response.setDescription(description);
            response.setIngredients(ingredients.toString());
            response.setHowToCook(steps.toString());
            response.setServings(servings);
            response.setPreparationTime(preparationTime);
            response.setRating(0);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void extractFromSimply(Set<RecipeModelResponse> recipes, String url) {
        try {
            List<CompletableFuture<List<String>>> futureRecipeUrls = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Element elementContainer = document.getElementsByClass("mntl-taxonomysc-child-block__links").first();
            if (elementContainer != null) {
                Elements anchors = elementContainer.getElementsByTag("a");
                for (Element element : anchors) {
                    String categoryLink = element.attr("href");
                    futureRecipeUrls.add(simplyExtractRecipeUrls(categoryLink));
                }
            }
            CompletableFuture<Void> allFutures = CompletableFuture.allOf(
                    futureRecipeUrls.toArray(new CompletableFuture[0])
            );

            allFutures.thenAccept(v -> {
                List<String> recipeUrls = new ArrayList<>();
                futureRecipeUrls.forEach(future -> {
                    try {
                        recipeUrls.addAll(future.get());
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                });

                List<CompletableFuture<Void>> futures = new ArrayList<>();
                for (String recipeUrl : recipeUrls) {
                    futures.add(CompletableFuture.runAsync(() -> {
                        RecipeModelResponse response = new RecipeModelResponse();
                        extractDetailsOfSimplyRecipe(response, recipeUrl);

                        if (response.getTitle() != null) {
                            synchronized (recipes) {
                                recipes.add(response);
                            }
                        }
                    }));
                }
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
            }).join();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
