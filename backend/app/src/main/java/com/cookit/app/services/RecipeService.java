package com.cookit.app.services;

import com.cookit.app.models.Recipe;
import com.cookit.app.models.Review;
import com.cookit.app.models.User;
import com.cookit.app.repositories.RecipeRepository;
import com.cookit.app.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private ReviewRepository reviewRepository;
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

    public Recipe updateRecipe(Integer id, Integer value)
    {
        List<Review> reviews = reviewRepository.findByRecipeId(id);
        Integer sum=value;
        for(Review R:reviews)
        {
            sum+=R.getValue();
        }
        float result= 1f*sum/(reviews.size()+1);
        Recipe recipe = recipeRepository.findById(id).get();
        recipe.setRating((result));
        recipeRepository.save(recipe);
        return recipe;
    }
}
