package com.idea1.app.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.idea1.app.backend.config.GlobalExceptionHandler.ForbiddenException;
import com.idea1.app.backend.config.GlobalExceptionHandler.ResourceNotFoundException;
import com.idea1.app.backend.dto.CreateEntryRequest;
import com.idea1.app.backend.dto.EntryResponse;
import com.idea1.app.backend.model.Entry;
import com.idea1.app.backend.model.User;
import com.idea1.app.backend.repository.EntryRepo;
import com.idea1.app.backend.repository.UserRepo;

/*
1. when a request hits your API with a JWT, spring security validates the token and stores the user's details in a "context." 
    -> the controller grabs the currently logged-in user (usually their username or ID) from that context.
    -> the controller passes that user information into Service methods
2. instead of using findAll(), your service logic changes to "find all that belong to me"
    -> process: the service tells the repository, "give me all the notes where userId matches the ID i jsut got from the JWT."
    -> why: this prevents a user from simply typing /api/notes and setting the entire database
3. ownership validation (the bodyguard check)
    -> the old way: you find the listing by ID and update it
    -> the new way: even if you find a note by ID, you must check if the ownerId of that note matche shte userID of the person making the request
    -> process: first fetch the note from the DB, then compare the note's owner to the loged-in user. if thtey don't match, throw an exception (403 forbidden). lastly, if they match, proceed with the update/delete.
4. summary
    -> every service method that accesses user-specific data must now take the userID as a parameter
    -> every service method that modifies user-specific data must validate ownership before proceeding
*/

@Service
public class EntryService {

    @Autowired
    private EntryRepo entryRepo;

    @Autowired
    private UserRepo userRepo;

    // Helper method to convert Entry entity to EntryResponse DTO
    private EntryResponse convertToEntryResponse(Entry entry) {
        EntryResponse response = new EntryResponse();
        response.setId(entry.getId());
        response.setTitle(entry.getTitle());
        response.setContent(entry.getContent());
        response.setAiSummary(entry.getAiSummary());
        response.setAiInsights(entry.getAiInsights());
        response.setAiThemes(entry.getAiThemes());
        response.setAiTone(entry.getAiTone());
        response.setAiGeneratedAt(entry.getAiGeneratedAt());
        response.setCreatedAt(entry.getCreatedAt());
        response.setUpdatedAt(entry.getUpdatedAt());
        return response;
    }

    // 0. get entry (by entry Id)
    public EntryResponse getEntryById(Long entryId){

        return entryRepo.findById(entryId)
            .map(this::convertToEntryResponse)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
    }

    // 1. get all entries (filtered by user)
    public List<EntryResponse> getAllEntriesFromUser(String username){
        // flow:
        // 1. use the username to find the User object
        // 2. ask the repo for: findAllByUser(user)
        User user = userRepo.findByUsername(username);

        return entryRepo.findByUserId(user.getId())
            .stream()
            .map(this::convertToEntryResponse)
            .collect(Collectors.toList());
    }

    // 2. create entry
    // if something goes wrong halfway through the method, spring will "roll back" the changes so your database doesn't end up with partial or corrupted data
    @Transactional
    public EntryResponse createEntry(CreateEntryRequest request, String username){
        // flow:
        // 1. find the User from the DB using the username
        // 2. create a new Entry entity from the request
        // 3. set the User on the entry object
        // 4. save and return as DTO

        User user = userRepo.findByUsername(username);

        if (user == null) {
            throw new ResourceNotFoundException("user not found");
        }

        Entry entry = new Entry();
        entry.setTitle(request.getTitle());
        entry.setContent(request.getContent());
        entry.setUser(user);

        Entry savedEntry = entryRepo.save(entry);
        return convertToEntryResponse(savedEntry);

    }

    // 3. update entry (with security check)
    @Transactional
    public EntryResponse updateEntry(Long entryId, CreateEntryRequest updatedData, String username){
        // flow:
        // 1. find the existing entry by ID
        // 2. check: does entry.getUser().getUsername() match the 'username' parameter?
        // 3. if NO: throw a 403 forbidden exception
        // 4. if yes: update fields and save
        Entry entry = entryRepo.findById(entryId)
            .orElseThrow(() -> new ResourceNotFoundException("Entry not found"));

        if (!entry.getUser().getUsername().equals(username)){
            throw new ForbiddenException("you don't have permission to update this entry");
        }

        entry.setTitle(updatedData.getTitle());
        entry.setContent(updatedData.getContent());
        
        Entry savedEntry = entryRepo.save(entry);
        return convertToEntryResponse(savedEntry);

    }

    // 4. delete entry (with security check)
    @Transactional
    public void deleteEntry(Long entryId, String username){
        // similar logic to update: find -> check ownership -> delete
        Entry entry = entryRepo.findById(entryId).orElseThrow(() -> new ResourceNotFoundException("Entry not found"));

        if(!entry.getUser().getUsername().equals(username)){
            throw new ForbiddenException("you don't have permission to update this entry");
        }

        entryRepo.deleteById(entryId);
    }
    
}
