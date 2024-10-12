package com.cookit.app.repositories;

import com.cookit.app.models.Technique;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechniqueRepository extends JpaRepository<Technique, Integer> {
}
