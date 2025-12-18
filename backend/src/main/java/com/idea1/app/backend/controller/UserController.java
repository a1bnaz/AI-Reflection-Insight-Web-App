package com.idea1.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.idea1.app.backend.model.User;
import com.idea1.app.backend.service.UserService;

@RestController
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user){

        return userService.register(user);

    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        return userService.verify(user);
    }
}
