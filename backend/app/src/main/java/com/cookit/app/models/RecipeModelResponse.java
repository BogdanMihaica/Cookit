package com.cookit.app.models;

import lombok.Data;


@Data
public class RecipeModelResponse {
    String title;
    Integer authorId;
    String description;
    String photoUrl;
    String ingredients;
    String category;

    String servings;
    Integer rating;
    String preparationTime;
    String howToCook;

}
