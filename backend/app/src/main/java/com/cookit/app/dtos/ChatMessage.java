package com.cookit.app.dtos;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {

    private String content;
    private String sender;

}
