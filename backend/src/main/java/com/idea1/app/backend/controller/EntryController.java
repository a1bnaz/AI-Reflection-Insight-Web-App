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
import org.springframework.web.reactive.result.method.annotation.ResponseEntityResultHandler;

import jakarta.validation.Valid;

import com.idea1.app.backend.dto.CreateEntryRequest;
import com.idea1.app.backend.dto.EntryResponse;
import com.idea1.app.backend.service.EntryService;

@RestController
@RequestMapping("/api/entries")
public class EntryController {
    
    @Autowired
    private EntryService entryService;

    @GetMapping()
    public List<EntryResponse> getAllEntriesFromUser(Authentication authentication){
        String username = authentication.getName();

        return entryService.getAllEntriesFromUser(username);
    }

    @GetMapping("/{entryId}")
    public EntryResponse getEntryById(@PathVariable Long entryId){

        return entryService.getEntryById(entryId);

    }
    
    @PostMapping
    public ResponseEntity<EntryResponse> createEntry(@Valid @RequestBody CreateEntryRequest request, Authentication authentication){
        String username = authentication.getName();
        System.out.println("the user: " + username + " is trying to access the controller");
        EntryResponse newEntry = entryService.createEntry(request, username);
        System.out.println("new entry is being created");

        return ResponseEntity.ok(newEntry);
    }

    @PutMapping("/{entryId}")
    public ResponseEntity<EntryResponse> updateEntry(@PathVariable Long entryId, @Valid @RequestBody CreateEntryRequest updatedData, Authentication authentication){
        String username = authentication.getName();
        EntryResponse updatedEntry = entryService.updateEntry(entryId, updatedData, username);

        return ResponseEntity.ok(updatedEntry);
    }

    @PutMapping("/{entryId}/analyze")
    public ResponseEntity<EntryResponse> analyzeEntry(@PathVariable Long entryId, Authentication authentication){
        String username = authentication.getName();
        try {
            EntryResponse analyzedEntry = entryService.analyzeEntry(entryId, username);

            return ResponseEntity.ok(analyzedEntry);
        } catch (RuntimeException e) {
            System.err.println("error analyzing entry: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(500).build();
        } catch (Exception e) {
            e.printStackTrace(); // print full stack trace
            System.err.println("Error analyzing entry: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{entryId}")
    public String deleteEntry(@PathVariable Long entryId, Authentication authentication){
        String username = authentication.getName();
        entryService.deleteEntry(entryId, username);

        return "Entry with ID " + entryId + " from user: " + username + " deleted successfully.";
    }

}
