package com.cookit.app.models;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private long expiresIn;

}