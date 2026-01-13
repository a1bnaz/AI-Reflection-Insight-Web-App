package com.idea1.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import jakarta.validation.Valid;

import com.idea1.app.backend.model.User;
import com.idea1.app.backend.service.UserService;
import com.idea1.app.backend.dto.AuthResponse;

import com.idea1.app.backend.repository.UserRepo;

@RestController
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/users")
    public Iterable<?> getUsers() {
        return userRepo.findAll();
    }

    @PostMapping("/register")
    public AuthResponse register(/*@Valid*/ @RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(/*@Valid*/ @RequestBody User user){
        return userService.verify(user);
    }
}
