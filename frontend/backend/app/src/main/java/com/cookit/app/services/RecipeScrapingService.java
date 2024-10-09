package com.cookit.app.services;

import com.cookit.app.models.RecipeModelResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RecipeScrapingService {

    public List<String> urls = List.of("https://www.simplyrecipes.com/recipes-5090746", "https://www.bbcgoodfood.com/recipes");

    public Set<RecipeModelResponse> scrapeRecipes() {
        Set<RecipeModelResponse> recipes = new HashSet<>();
        for (String url : urls) {
            System.out.println(url);
            if (url.contains("simply")) {
                extractFromSimply(recipes, url);
            } else if (url.contains("bbcgoodfood")) {
                extractFromBbcGoodFood(recipes, url);
            }
        }
        return recipes;
    }

    private void simplyExtractRecipeUrls(List<String> recipeUrls, String link) {
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
    }

    private void extractDetailsOfSimplyRecipe(RecipeModelResponse response, String url) {
        try {
            Document document = Jsoup.connect(url).get();
            Element article = document.getElementById("article--structured-project_1-0");
            if (article == null) return; // Early return if article is null


            Element categoryList = article.getElementById("breadcrumbs__list_1-0");
            String category = (categoryList != null && categoryList.getAllElements().size() > 1)
                    ? categoryList.getAllElements().get(1).text()
                    : null;
            // Handle image URL extraction safely
            String imgUrl = article.getElementsByClass("primary-image__image").first() != null
                    ? article.getElementsByClass("primary-image__image").first().attr("src")
                    : null;

            Element ingredientsList = article.getElementsByClass("structured-ingredients__list").first();
            Element stepsList = article.getElementById("structured-project__steps_1-0").getElementsByTag("ol").first();
            StringBuilder ingredients = new StringBuilder();
            StringBuilder steps = new StringBuilder();


            if (ingredientsList != null) {
                for (Element listElement : ingredientsList.getAllElements()) {
                    ingredients.append(listElement.text()).append("|");
                }
            }

            int i = 1;
            if (stepsList != null) {
                for (Element step : stepsList.getAllElements()) {
                    steps.append(i).append(". ").append(step.text()).append("|");
                    i++;
                }
            }


            String title = article.getElementsByClass("heading__title").size() > 0
                    ? article.getElementsByClass("heading__title").get(0).text()
                    : null;
            String description = article.getElementsByClass("heading__subtitle").size() > 0
                    ? article.getElementsByClass("heading__subtitle").get(0).text()
                    : null;
            String servings = article.getElementsByClass("project-meta__recipe-serving").size() > 0
                    ? article.getElementsByClass("project-meta__recipe-serving").get(0)
                    .getElementsByTag("span").size() > 1
                    ? article.getElementsByClass("project-meta__recipe-serving").get(0)
                    .getElementsByTag("span").get(0)
                    .getElementsByTag("span").get(1).text()
                    : "0"
                    : "0";
            String preparationTime = article.getElementsByClass("project-meta__total-time").size() > 0
                    ? article.getElementsByClass("project-meta__total-time").get(0)
                    .getElementsByTag("span").size() > 1
                    ? article.getElementsByClass("project-meta__total-time").get(0)
                    .getElementsByTag("span").get(0)
                    .getElementsByTag("span").get(1).text()
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
            List<String> recipeUrls = new ArrayList<>();
            Document document = Jsoup.connect(url).get();
            Element elementContainer = document.getElementsByClass("mntl-taxonomysc-child-block__links").first();
            if (elementContainer != null) {
                Elements anchors = elementContainer.getElementsByTag("a");
                for (Element element : anchors) {
                    String categoryLink = element.attr("href");
                    simplyExtractRecipeUrls(recipeUrls, categoryLink);
                }
            }
            // At this point recipeUrls is filled with all the simply recipe list
            for (String recipeUrl : recipeUrls) {
                RecipeModelResponse response = new RecipeModelResponse();
                extractDetailsOfSimplyRecipe(response, recipeUrl);
                // Only add if the response contains valid data
                if (response.getTitle() != null) {
                    recipes.add(response);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void extractFromBbcGoodFood(Set<RecipeModelResponse> recipes, String url) {
        // Implementation for BBC Good Food if needed
    }
}
