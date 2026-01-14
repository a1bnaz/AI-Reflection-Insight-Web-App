package com.idea1.app.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/test")
public class TestController {


    @GetMapping("/")
    public String sayHello() {
        return "Hello from the backend!! :)";
    }

}
