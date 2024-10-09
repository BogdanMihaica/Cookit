package com.cookit.app.controllers;

import com.cookit.app.models.RecipeModelResponse;
import com.cookit.app.services.RecipeScrapingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class RecipeController {

    private final RecipeScrapingService recipeScrapingService;

    RecipeController(){
        recipeScrapingService=new RecipeScrapingService();
    }
    @GetMapping("/scraped")
    Set<RecipeModelResponse> scrape()
    {
        return  recipeScrapingService.scrapeRecipes();
    }
}
