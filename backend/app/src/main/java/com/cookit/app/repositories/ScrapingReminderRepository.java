package com.cookit.app.repositories;

import com.cookit.app.models.ScrapingReminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrapingReminderRepository extends JpaRepository<ScrapingReminder,Integer> {
}
