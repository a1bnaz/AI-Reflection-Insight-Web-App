package com.idea1.app.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idea1.app.backend.model.Note;
import com.idea1.app.backend.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    
    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotesFromUser(Authentication authentication){
        String username = authentication.getName();

        return noteService.getAllNotesFromUser(username);
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id){

        return noteService.getNoteById(id);

    }
    
    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note, Authentication authentication){
        String username = authentication.getName();
        System.out.println("the user: " + username + " is trying to access the controller");
        Note newNote = noteService.createNote(note, username);
        System.out.println("new note is being created");

        return ResponseEntity.ok(newNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long noteId, Note updatedData, Authentication authentication){
        String username = authentication.getName();
        Note updatedNote = noteService.updateNote(noteId, updatedData, username);

        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{noteId}")
    public String deleteNote(@PathVariable Long noteId, Authentication authentication){
        String username = authentication.getName();
        noteService.deleteNote(noteId, username);

        return "Note with ID " + noteId + " from user: " + username + " deleted successfully.";
    }

}
