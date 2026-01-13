package com.idea1.app.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.idea1.app.backend.model.Entry;
import com.idea1.app.backend.model.User;
import com.idea1.app.backend.repository.EntryRepo;
import com.idea1.app.backend.repository.UserRepo;

@Configuration
// DataSeeder class to seed initial data into the database (temporary)
public class DataSeeder {
    
    @Bean
    public CommandLineRunner initDatabase(UserRepo userRepo, EntryRepo entryRepo, JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {

        return args -> {
            System.out.println("clearing old data and resetting sequence...");
            try {
                jdbcTemplate.execute("DELETE FROM entry");     // DELETE THIS FIRST
                jdbcTemplate.execute("DELETE FROM users");    // THEN DELETE THIS
                jdbcTemplate.execute("ALTER SEQUENCE entry_id_seq RESTART WITH 1");
                jdbcTemplate.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1");
            } catch (Exception e) {
                System.out.println("Entry: tables/sequences may not exist yet on first run.");
            }
            
            System.out.println("seeding temporary user data...");
            User albert = userRepo.save(new User("albert", passwordEncoder.encode("123")));
            User david = userRepo.save(new User("david", passwordEncoder.encode("123")));
            
            System.out.println("seeding temporary entry data...");
            Entry testEntry = new Entry("my first entry", "this is a test entry created by the seeder", "Personal");
            testEntry.setUser(albert);
            entryRepo.save(testEntry);

            System.out.println("data seeding complete!");
        };
    }
}
