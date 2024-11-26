package com.cookit.app.repositories;

import com.cookit.app.models.Chat;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    @Query("SELECT c FROM Chat c WHERE c.user1Id = :userId OR c.user2Id = :userId")
    List<Chat> findChatsByUserId(@Param("userId") Integer userId);

    @Query("SELECT c FROM Chat c WHERE (c.user1Id = :user1Id AND c.user2Id = :user2Id) OR (c.user1Id = :user2Id AND c.user2Id = :user1Id)")
    Optional<Chat> findChatByUsers(@Param("user1Id") Integer user1Id, @Param("user2Id") Integer user2Id);
}
