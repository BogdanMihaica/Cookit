package com.cookit.app.dtos;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class Notification {
    private String text;
    private Integer senderId;
    private Timestamp sendDate;
}
