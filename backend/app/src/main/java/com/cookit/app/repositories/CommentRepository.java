package com.cookit.app.repositories;

import com.cookit.app.models.Comment;

import com.cookit.app.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Integer > {

}
