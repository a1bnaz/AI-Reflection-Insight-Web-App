package com.idea1.app.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.idea1.app.backend.config.GlobalExceptionHandler.ForbiddenException;
import com.idea1.app.backend.config.GlobalExceptionHandler.ResourceNotFoundException;
import com.idea1.app.backend.model.Note;
import com.idea1.app.backend.model.User;
import com.idea1.app.backend.repository.NoteRepo;
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
public class NoteService {

    @Autowired
    private NoteRepo noteRepo;

    @Autowired
    private UserRepo userRepo;

    // 0. get note (by note Id)
    public Note getNoteById(Long noteId){

        return noteRepo.findById(noteId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        
    }

    // 1. get all notes (filtered by user)
    public List<Note> getAllNotesFromUser(String username){
        // flow:
        // 1. use the username to find the User object
        // 2. ask the repo for: findAllByUser(user)
        User user = userRepo.findByUsername(username);

        return noteRepo.findByUserId(user.getId());
    }

    // 2. create note
    // if something goes wrong halfway through the method, spring will "roll back" the changes so your database doesn't end up with partial or corrupted data
    @Transactional
    public Note createNote(Note note, String username){
        // flow:
        // 1. find the User from the DB using the username
        // 2. set the User on the note object: note.setUser(user)
        // 3. save and return
        System.out.println("1. starting createNote with username: " + username);
        User user = userRepo.findByUsername(username);
        System.out.println("2. found user: " + (user != null ? user.getUsername() : "NULL"));

        if (user == null) {
            throw new ResourceNotFoundException("user not found");
        }

        System.out.println("3. setting user on note");
        note.setUser(user);

         System.out.println("4. About to save note. Note ID before save: " + note.getId());
        System.out.println("5. Note data - Title: " + note.getTitle() + ", Content: " + note.getContent() + ", User ID: " + note.getUser().getId() + "and the noteId is: " + note.getId());

        return noteRepo.save(note);

    }

    // 3. update note (with security check)
    @Transactional
    public Note updateNote(Long noteId, Note updatedData, String username){
        // flow:
        // 1. find the existing note by ID
        // 2. check: does note.getUser().getUsername() match the 'username' parameter?
        // 3. if NO: throw a 403 forbidden exception
        // 4. if yes: update fields and save
        Note note = noteRepo.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if (!note.getUser().getUsername().equals(username)){
            throw new ForbiddenException("you don't have permission to update this note");
        }

        note.setTitle(updatedData.getTitle());
        note.setContent(updatedData.getContent());
        note.setTag(updatedData.getTag());
        

        return noteRepo.save(note);

    }

    // 4. delete note (with security check)
    @Transactional
    public void deleteNote(Long noteId, String username){
        // similar logic to update: find -> check ownership -> delete
        Note note = noteRepo.findById(noteId).orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        if(!note.getUser().getUsername().equals(username)){
            throw new ForbiddenException("you don't have permission to update this note");
        }

        noteRepo.deleteById(noteId);
    }
    
}
