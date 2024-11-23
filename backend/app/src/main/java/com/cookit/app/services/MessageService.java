package com.cookit.app.services;

import com.cookit.app.models.Message;
import com.cookit.app.repositories.MessageRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}