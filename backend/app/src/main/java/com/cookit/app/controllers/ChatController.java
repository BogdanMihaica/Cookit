package com.cookit.app.controllers;


import com.cookit.app.models.Chat;
import com.cookit.app.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @Autowired
    ChatService chatService;

    @GetMapping("/api/chat/{id}")
    public Chat getById(@PathVariable Integer id)
    {
        return chatService.findById(id);
    }

    @PostMapping("/api/chat")
    public Chat saveChat(Chat chat)
    {
        chatService.saveChat(chat);
        return chat;
    }
}
