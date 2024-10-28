package com.cookit.app.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestUserId implements Serializable {
    private Integer userId;
    private Integer contestId;
}
