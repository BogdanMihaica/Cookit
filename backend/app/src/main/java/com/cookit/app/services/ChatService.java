package com.cookit.app.services;
import com.cookit.app.models.Chat;
import com.cookit.app.models.Message;
import com.cookit.app.repositories.ChatRepository;
import com.cookit.app.repositories.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public void saveChat(Chat chat) {
        chatRepository.save(chat);
    }
    public Chat findById(Integer id)
    {
        return chatRepository.findById(id).orElse(null);
    }

    public List<Chat> findChatsOfUser(Integer id){
        return chatRepository.findChatsByUserId(id);
    }
}