package com.idea1.app.backend.repository;

import org.springframework.stereotype.Repository;

import com.idea1.app.backend.model.Entry;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface EntryRepo extends JpaRepository<Entry, Long>{
    // this asks spring data to automatically fetch all Entry records that belong to a given user. you pass userId, and it returns a list of ntoes associated with that user. no manual sql or implementatio needed- Spring builds the query from the method name.
    List<Entry> findByUserId(Long userId);
}
