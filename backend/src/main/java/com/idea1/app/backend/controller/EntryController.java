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

import com.idea1.app.backend.model.Entry;
import com.idea1.app.backend.service.EntryService;

@RestController
@RequestMapping("/api/entries")
public class EntryController {
    
    @Autowired
    private EntryService entryService;

    @GetMapping()
    public List<Entry> getAllEntriesFromUser(Authentication authentication){
        String username = authentication.getName();

        return entryService.getAllEntriesFromUser(username);
    }

    @GetMapping("/{entryId}")
    public Entry getEntryById(@PathVariable Long entryId){

        return entryService.getEntryById(entryId);

    }
    
    @PostMapping
    public ResponseEntity<Entry> createEntry(@RequestBody Entry entry, Authentication authentication){
        String username = authentication.getName();
        System.out.println("the user: " + username + " is trying to access the controller");
        Entry newEntry = entryService.createEntry(entry, username);
        System.out.println("new entry is being created");

        return ResponseEntity.ok(newEntry);
    }

    @PutMapping("/{entryId}")
    public ResponseEntity<Entry> updateEntry(@PathVariable Long entryId, @RequestBody Entry updatedData, Authentication authentication){
        String username = authentication.getName();
        Entry updatedEntry = entryService.updateEntry(entryId, updatedData, username);

        return ResponseEntity.ok(updatedEntry);
    }

    @DeleteMapping("/{entryId}")
    public String deleteEntry(@PathVariable Long entryId, Authentication authentication){
        String username = authentication.getName();
        entryService.deleteEntry(entryId, username);

        return "Entry with ID " + entryId + " from user: " + username + " deleted successfully.";
    }

}
