package com.idea1.app.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idea1.app.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    
    @Autowired
    private NoteService noteService;

    @GetMapping("/{userId}/all")
    public String getAllNotesFromUser() {
        return "Get all notes for user";
    }

    @GetMapping("/{id}")
    public String getNoteById() {
        return "Get Note by ID";
    }


    @PostMapping("/{id}")
    public String createNote(){
        return "Create Note";
    }


    @PutMapping("/{id}")
    public String updateNote(){
        return "Update Note";
    }   


    @DeleteMapping("/{id}")
    public String deleteNote(){
        return "Delete Note";
    }



}
