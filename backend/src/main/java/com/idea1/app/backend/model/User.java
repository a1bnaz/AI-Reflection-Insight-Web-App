package com.idea1.app.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // @NotBlank(message = "Username cannot be empty")
    // @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Column(unique = true) // prevent duplicate usernames
    private String username;
    
    // @NotBlank(message = "Password cannot be empty")
    // @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    // no-arg constructor required by JPA
    public User(){}

    // convenience constructor
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
