package com.cookit.app.controllers;

import com.cookit.app.dtos.ChatMessage;
import com.cookit.app.services.ChatService;
import com.cookit.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired private MessageService chatMessageService;
    @Autowired private ChatService chatRoomService;

   // @MessageMapping("/chat")
//    public void processMessage(@Payload ChatMessage chatMessage) {
//        var chatId = chatRoomService
//                .getChatId(chatMessage.getSenderId(), chatMessage.getRecipientId(), true);
//        chatMessage.setChatId(chatId.get());
//
//        ChatMessage saved = chatMessageService.save(chatMessage);
//
//        messagingTemplate.convertAndSendToUser(
//                chatMessage.getRecipientId(),"/queue/messages",
//                new ChatNotification(
//                        saved.getId(),
//                        saved.getSenderId(),
//                        saved.getSenderName()));
//    }
}