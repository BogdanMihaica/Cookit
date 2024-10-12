package com.cookit.app.services;

import com.cookit.app.models.ScrapingReminder;
import com.cookit.app.repositories.ScrapingReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScrapingReminderService {
    @Autowired
    private ScrapingReminderRepository scrapingReminderRepository;

    public List<ScrapingReminder> getAllReminders() {
        return scrapingReminderRepository.findAll();
    }
    public void saveScrapingRemainder(ScrapingReminder scrapingReminder) {
        scrapingReminderRepository.save(scrapingReminder);
    }
}
