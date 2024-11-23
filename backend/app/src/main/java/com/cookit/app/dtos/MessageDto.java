package com.cookit.app.dtos;

import lombok.Data;

@Data
public class WebSocketMessageDto {
    private String text;
    private Integer senderId;
    private Integer receiverId;
}
