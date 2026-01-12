package com.idea1.app.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.idea1.app.backend.model.Note;
import com.idea1.app.backend.model.User;
import com.idea1.app.backend.repository.NoteRepo;
import com.idea1.app.backend.repository.UserRepo;

@Configuration
// DataSeeder class to seed initial data into the database (temporary)
public class DataSeeder {
    
    @Bean
    public CommandLineRunner initDatabase(UserRepo userRepo, NoteRepo noteRepo, JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {

        return args -> {
            System.out.println("clearing old data and resetting sequence...");
            try {
                jdbcTemplate.execute("DELETE FROM note");     // DELETE THIS FIRST
                jdbcTemplate.execute("DELETE FROM users");    // THEN DELETE THIS
                jdbcTemplate.execute("ALTER SEQUENCE note_id_seq RESTART WITH 1");
                jdbcTemplate.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1");
            } catch (Exception e) {
                System.out.println("Note: tables/sequences may not exist yet on first run.");
            }
            
            System.out.println("seeding temporary user data...");
            User albert = userRepo.save(new User("albert", passwordEncoder.encode("123")));
            User david = userRepo.save(new User("david", passwordEncoder.encode("123")));
            
            System.out.println("seeding temporary note data...");
            Note testNote = new Note("my first note", "this is a test note created by the seeder", "Personal");
            testNote.setUser(albert);
            noteRepo.save(testNote);

            System.out.println("data seeding complete!");
        };
    }
}
