package com.cookit.app.controllers;

import com.cookit.app.models.Ingredient;
import com.cookit.app.repositories.IngredientsRepository;
import com.cookit.app.services.IngredientsScrapingService;
import com.cookit.app.services.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class IngredientsController {
    @Autowired
    private IngredientsScrapingService scrapingService;
    @Autowired
    private IngredientsService ingredientsService;
    @GetMapping("/api/ingredients")
    List<Ingredient> showAll()
    {
        return ingredientsService.showAll();
    }

    @PostMapping("/api/save-ingredients")
    void saveAll()
    {
        if(showAll().size()==0)
            ingredientsService.bulkAddIngredients(scrapingService.scrapeIngredients());
    }
}
