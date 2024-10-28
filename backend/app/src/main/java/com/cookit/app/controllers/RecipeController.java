package com.cookit.app.controllers;

import com.cookit.app.models.Recipe;
import com.cookit.app.models.RecipeModelResponse;
import com.cookit.app.models.ScrapingReminder;
import com.cookit.app.models.User;
import com.cookit.app.services.RecipeScrapingService;
import com.cookit.app.services.RecipeService;
import com.cookit.app.services.ScrapingReminderService;
import com.cookit.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class RecipeController {

    @Autowired
    private RecipeScrapingService recipeScrapingService;
    @Autowired
    private RecipeService recipeService;

    @Autowired
    private UserService userService;
    @Autowired
    private ScrapingReminderService scrapingReminderService;

    private ResponseEntity<Recipe> createScrapedRecipes(@RequestBody Recipe recipe) {
        Recipe savedRecipe = recipeService.saveRecipe(recipe);
        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }



    private void scrapeDataAndPost() {
        Set<RecipeModelResponse> scrapedRecipes=recipeScrapingService.scrapeRecipes();
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8090/api/recipes"; // Replace with your actual URL
        User author = userService.findById(1).get();
        for (RecipeModelResponse recipeResponse : scrapedRecipes) {
            Recipe recipe=new Recipe();
            recipe.setTitle(recipeResponse.getTitle());
            recipe.setDescription(recipeResponse.getDescription());
            recipe.setRating(0);
            recipe.setCategory(recipeResponse.getCategory());
            recipe.setIngredients(recipeResponse.getIngredients());
            recipe.setAuthorId(author.getId());
            recipe.setHowToCook(recipeResponse.getHowToCook());
            recipe.setServings(recipeResponse.getServings());
            recipe.setPreparationTime(recipeResponse.getPreparationTime());
            recipe.setPhoto(recipeResponse.getPhotoUrl());



            ResponseEntity<Recipe> response = restTemplate.postForEntity(url, recipe, Recipe.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Successfully posted: " + recipe);
            } else {
                System.out.println("Failed to post: " + recipe + ", Status Code: " + response.getStatusCode());
            }
        }
    }
    @PostMapping("/api/scrape")
    @ResponseStatus(HttpStatus.CREATED)
    public void scrape() {

        List<ScrapingReminder> remainderList=scrapingReminderService.getAllReminders();
        if(remainderList.size()==0)
        {
            scrapeDataAndPost();
            ScrapingReminder scrapingReminder=new ScrapingReminder();
            scrapingReminder.setLast_scrape(Timestamp.from(Instant.now()));
            scrapingReminderService.saveScrapingRemainder(scrapingReminder);
        }

    }
    @GetMapping("/api/recipes/{id}")
    ResponseEntity<Recipe> showById(@PathVariable Integer id){
        Optional<Recipe> recipe = recipeService.getRecipeById(id);
        return recipe.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/api/recipes")
    List<Recipe> showAll(){
        return recipeService.getAllRecipes();
    }
    @PostMapping("/api/recipes")
    @ResponseStatus(HttpStatus.CREATED)
    public  ResponseEntity<String> createRecipe(@RequestBody Recipe recipe, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            recipeService.saveRecipe(recipe);
            return ResponseEntity.ok("Recipe added successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
        }
    }
}
