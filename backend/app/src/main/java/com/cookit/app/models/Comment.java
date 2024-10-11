package com.cookit.app.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "author_id", nullable = false)
    private Integer authorId;

    @Column(name = "contest_id", nullable = false)
    private Integer contestId;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @Column(name = "posted_on", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private java.sql.Timestamp postedOn;


}
