package com.cookit.app.services;

import com.cookit.app.models.Ingredient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.io.IOException;
import java.util.*;

import java.util.concurrent.*;

@Service
@RestController
public class IngredientsScrapingService {
    private final long REQUEST_DELAY_MS = 1000;

    public  Set<Ingredient> scrapeIngredients() {
        Set<Ingredient> ingredients = Collections.synchronizedSet(new HashSet<>());

        int MAX_THREADS = 5;
        ExecutorService executor = Executors.newFixedThreadPool(MAX_THREADS);  // Create a thread pool

        try {
            String url = "https://www.bbc.co.uk/food/ingredients/a-z/a/1";
            Document document = Jsoup.connect(url).get();
            Element keyboardList = document.getElementsByClass("az-keyboard__list").first();
            List<String> keyUrls = new ArrayList<>();
            for (Element key : keyboardList.children()) {
                Element anchor = key.selectFirst("a.az-keyboard__link");
                if (anchor != null) {
                    keyUrls.add("https://www.bbc.co.uk" + anchor.attr("href"));
                }
            }

            List<String> paginationUrls = new ArrayList<>();
            for (String keyUrl : keyUrls) {
                List<String> keyPaginationUrls = extractLinksFromPagination(keyUrl);
                if (keyPaginationUrls.size() == 0) {
                    paginationUrls.add(keyUrl);
                } else {
                    paginationUrls.addAll(keyPaginationUrls);
                }
            }

            List<Future<Void>> futures = new ArrayList<>();
            for (String link : paginationUrls) {
                futures.add(executor.submit(() -> {
                    scrapeIngredientsFrom(link, ingredients);
                    Thread.sleep(REQUEST_DELAY_MS);  // Rate-limiting by adding a delay between requests
                    return null;
                }));
            }

            for (Future<Void> future : futures) {
                future.get();  // Wait for all threads to finish
            }

        } catch (IOException | InterruptedException | ExecutionException e) {
            e.printStackTrace();
        } finally {
            executor.shutdown();  // Shutdown the thread pool
        }

        return ingredients;
    }

    private  void scrapeIngredientsFrom(String link, Set<Ingredient> ingredients) {
        try {
            Document document = Jsoup.connect(link).get();
            Elements allIngredients = document.getElementsByClass("promo__ingredient");
            for (Element ingredient : allIngredients) {
                Ingredient response = new Ingredient();
                String photoUrl;
                Element imgContainer = ingredient.getElementsByClass("promo__image").first();
                if (imgContainer != null) {
                    photoUrl = imgContainer.children().first().attr("data-src");
                } else {
                    photoUrl = "NULL";
                }

                response.setPhotoUrl(photoUrl);
                response.setName(ingredient.select("h3").first().text());

                try {
                    String ingredientUrl = "https://www.bbc.co.uk" + ingredient.attr("href");
                    Document ingredientDocument = Jsoup.connect(ingredientUrl).get();
                    response.setDescription(ingredientDocument.getElementsByClass("page-header__description").text());
                } catch (IOException e1) {
                    e1.printStackTrace();
                }

                System.out.println(response);
                ingredients.add(response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private List<String> extractLinksFromPagination(String keyUrl) {
        List<String> links = new ArrayList<>();
        try {
            Document document = Jsoup.connect(keyUrl).get();
            Element paginationDiv = document.getElementsByClass("pagination__list").first();
            if (paginationDiv == null) {
                return new ArrayList<>();
            }
            Elements paginationAnchors = paginationDiv.children();
            for (Element page : paginationAnchors) {
                if (Objects.equals(page.children().first().tagName(), "a")) {
                    if (page.select("polygon").isEmpty()) {
                        links.add("https://www.bbc.co.uk" + page.children().first().attr("href"));
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return links;
    }
}
