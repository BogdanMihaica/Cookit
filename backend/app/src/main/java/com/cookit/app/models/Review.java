package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "author_id", nullable = false)
    private Integer authorId;

    @Column(name = "author_username")
    private String authorUsername;

    @Column(name = "recipe_id", nullable = false)
    private Integer recipeId;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @Column(name="stars")
    private Integer value;
}
