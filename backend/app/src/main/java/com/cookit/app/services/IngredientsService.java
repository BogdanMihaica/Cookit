package com.cookit.app.services;

import com.cookit.app.models.Ingredient;
import com.cookit.app.repositories.IngredientsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class IngredientsService {
    @Autowired
    private IngredientsRepository ingredientsRepository;

    public List<Ingredient> showAll(){
        return ingredientsRepository.findAll();
    }
    @Transactional
    public void bulkAddIngredients(Set<Ingredient> ingredients) {
        ingredientsRepository.saveAll(ingredients);
    }
}
