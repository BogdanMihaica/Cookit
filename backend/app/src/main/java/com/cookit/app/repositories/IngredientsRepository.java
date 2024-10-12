package com.cookit.app.repositories;

import com.cookit.app.models.Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface IngredientsRepository extends JpaRepository<Ingredient, Integer> {
}
