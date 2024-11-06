package com.cookit.app.dtos;

import com.cookit.app.dtos.enums.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {

    private String content;
    private String sender;
    private MessageType type;
}
