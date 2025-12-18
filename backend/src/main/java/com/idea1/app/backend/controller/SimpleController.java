package com.idea1.app.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idea1.app.backend.repository.UserRepo;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SimpleController {
    
    private UserRepo userRepo;
    // temporary, delete later
    public SimpleController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/")
    public String sayHello() {
        return "Hello from the backend!!! :)";
    }

    // temporary, delete later (maybe)
    @GetMapping("/users")
    public Iterable<?> getUsers() {
        return userRepo.findAll();
    }
}
