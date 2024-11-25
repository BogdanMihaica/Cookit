package com.cookit.app.controllers;


import com.cookit.app.models.Chat;
import com.cookit.app.models.Message;
import com.cookit.app.services.ChatService;
import com.cookit.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    ChatService chatService;

    @Autowired
    MessageService messageService;
    @GetMapping("/chat/{id}")
    public Chat getById(@PathVariable Integer id)
    {
        return chatService.findById(id);
    }
    @GetMapping("/chat/user/{id}")
    public List<Chat> getByUserId(@PathVariable Integer id)
    {
        return chatService.findChatsOfUser(id);
    }

    @GetMapping("/messages/{id}")
    public List<Message> getByChatId(@PathVariable Integer id){
        return messageService.findByChatId(id);
    }

    @PostMapping("/chat")
    public Chat saveChat(Chat chat)
    {
        chatService.saveChat(chat);
        return chat;
    }
}
