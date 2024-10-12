package com.cookit.app.services;

import com.cookit.app.models.User;
import com.cookit.app.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Get a user by ID
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    // Get all users
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Update an existing user
    public User updateUser(Integer id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setPhotoUrl(userDetails.getPhotoUrl());
        user.setUserRank(userDetails.getUserRank());
        user.setBronzeTrophies(userDetails.getBronzeTrophies());
        user.setSilverTrophies(userDetails.getSilverTrophies());
        user.setGoldTrophies(userDetails.getGoldTrophies());
        return userRepository.save(user);
    }

    // Delete a user
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
