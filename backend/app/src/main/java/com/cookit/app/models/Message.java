package com.cookit.app.models;

import com.cookit.app.enums.MessageStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

@Setter
@Data
@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @Column(name = "sender_id", nullable = false)
    private Integer senderId;

    @Column(name = "receiver_id", nullable = false)
    private Integer receiverId;

    @Column(name = "chat_id", nullable = false)
    private Integer chatId;

    @Column(nullable = false, columnDefinition = "BOOLEAN default 0")
    private Boolean seen;

    @Column(name = "sent_on", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp sentOn;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private MessageStatus status;


}
