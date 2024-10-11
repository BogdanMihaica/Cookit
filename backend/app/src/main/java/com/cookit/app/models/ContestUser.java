package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "contest_user")
@IdClass(ContestUserId.class)  //composite key
public class ContestUser {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "contest_id")
    private Integer contestId;

}
