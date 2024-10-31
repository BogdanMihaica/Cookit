package com.cookit.app.services;

import com.cookit.app.models.Recipe;
import com.cookit.app.models.Review;
import com.cookit.app.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review)
    {
        return reviewRepository.save(review);
    }
    public List<Review> findByRecipeId(Integer recipeId) {
        return reviewRepository.findByRecipeId(recipeId);
    }



}
