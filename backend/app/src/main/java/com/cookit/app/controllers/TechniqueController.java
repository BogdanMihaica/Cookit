package com.cookit.app.controllers;

import com.cookit.app.models.Ingredient;
import com.cookit.app.models.Technique;
import com.cookit.app.services.TechniqueService;
import com.cookit.app.services.TechniquesScrapingServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TechniqueController {
    @Autowired
    private TechniqueService techniqueService ;
    @Autowired
    private TechniquesScrapingServices scrapingService;
    @GetMapping("/api/techniques")
    List<Technique> showAll()
    {
        return techniqueService.showAll();
    }

    @PostMapping("/api/save-techniques")
    void saveAll()
    {
        if(showAll().size()==0)
            techniqueService.bulkAddTechniques(scrapingService.scrapeTechniques());
    }
}
