package com.cookit.app.dtos;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Notificiation {
    private String text;
    private Integer senderId;
    private Integer receiverId;
    private Timestamp sendDate;
}
