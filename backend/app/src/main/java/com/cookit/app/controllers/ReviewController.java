package com.cookit.app.controllers;

import com.cookit.app.models.Review;
import com.cookit.app.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/reviews")
    @ResponseStatus(HttpStatus.CREATED)
    public Review addReview(@RequestBody Review review)
    {
        return reviewService.addReview(review);
    }
    @GetMapping("/reviews/{recipeId}")
    public List<Review> getReviewsByRecipeId(@PathVariable Integer recipeId) {
        return reviewService.findByRecipeId(recipeId);
    }
}
