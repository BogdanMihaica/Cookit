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
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username); // Assuming you have this method in your UserRepository
    }
    // Get a user by ID
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

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
