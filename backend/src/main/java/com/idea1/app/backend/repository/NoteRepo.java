package com.idea1.app.backend.repository;

import org.springframework.stereotype.Repository;

import com.idea1.app.backend.model.Note;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface NoteRepo extends JpaRepository<Note, Long>{
    // this asks spring data to automatically fetch all Note records that belong to a given user. you pass userId, and it returns a list of ntoes associated with that user. no manual sql or implementatio needed- Spring builds the query from the method name.
    List<Note> findByUserId(Long userId);
}
