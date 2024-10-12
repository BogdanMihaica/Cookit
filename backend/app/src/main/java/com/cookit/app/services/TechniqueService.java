package com.cookit.app.services;

import com.cookit.app.models.Ingredient;
import com.cookit.app.models.Technique;
import com.cookit.app.repositories.TechniqueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TechniqueService {
    @Autowired
    private TechniqueRepository techniqueRepository;


    public List<Technique> showAll(){
        return  techniqueRepository.findAll();
    }
    @Transactional
    public void bulkAddTechniques(Set<Technique> techniques) {
        techniqueRepository.saveAll(techniques);
    }
}
