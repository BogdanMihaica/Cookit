package com.cookit.app.services;

import com.cookit.app.models.Recipe;
import com.cookit.app.models.User;
import com.cookit.app.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {


    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }
    public Optional<Recipe> getRecipeById(Integer id) {
        return recipeRepository.findById(id);
    }

    public Recipe saveRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Integer id) {
        recipeRepository.deleteById(id);
    }
}
