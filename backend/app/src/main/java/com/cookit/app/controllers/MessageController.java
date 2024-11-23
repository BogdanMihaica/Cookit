package com.cookit.app.controllers;


import com.cookit.app.dtos.MessageDto;
import com.cookit.app.models.Message;
import com.cookit.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @Autowired
    MessageService messageService;

    @MessageMapping("/{chatId}")
    @SendTo("/chat/{chatId}")
    public Message sendMessage(@DestinationVariable String chatId, Message message)
    {
        messageService.saveMessage(message);
        return message;
    }

    @MessageMapping("/{userId}")
    @SendTo("/notif/{userId}")
    public String sendNotification(@DestinationVariable String userId, Message message)
    {
        return "New message from: " + userId;
    }
}
