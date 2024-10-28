package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "author_id", nullable = false)
    private Integer authorId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "photo", columnDefinition = "TEXT")
    private String photo;

    @Column(name = "ingredients", columnDefinition = "TEXT")
    private String ingredients;

    @Column(name = "rating")
    private Integer rating;

    @Column(name ="category", length=50)
    private String category;

    @Column(name = "preparation_time", length = 50)
    private String preparationTime;

    @Column(name = "serves")
    private String servings;

    @Column(name = "how_to_cook",columnDefinition = "TEXT")
    private String howToCook;
}