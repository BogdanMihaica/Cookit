package com.cookit.app.controllers;


import com.cookit.app.dtos.Notification;
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

    @MessageMapping("/chat/{chatId}")   //basically this is /app/chat/{chatId}, where we send the message
    @SendTo("/topic/chat/{chatId}")   //this is /topic/chat/{chatId} , the place where our partner is subscribed
    public Message sendMessage(@DestinationVariable String chatId, Message message)
    {
        messageService.saveMessage(message);
        return message;
    }

    @MessageMapping("/user/{userId}")
    @SendTo("/topic/user/{userId}")
    public Notification sendNotification(@DestinationVariable String userId, Notification notification)
    {
        return notification;
    }
}
