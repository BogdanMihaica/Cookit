package com.cookit.app.dtos;

import lombok.Data;

@Data
public class UpdateRecipeRequest {
    private Integer id;
    private Integer value;
}