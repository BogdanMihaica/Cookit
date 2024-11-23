package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
@Builder
@Entity
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user1_id", nullable = false)
    private Integer user1Id;

    @Column(name = "user2_id", nullable = false)
    private Integer user2Id;

}
