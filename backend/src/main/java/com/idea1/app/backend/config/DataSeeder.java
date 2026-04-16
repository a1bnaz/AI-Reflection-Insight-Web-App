package com.idea1.app.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.idea1.app.backend.model.Entry;
import com.idea1.app.backend.model.User;
import com.idea1.app.backend.repository.EntryRepo;
import com.idea1.app.backend.repository.UserRepo;

@Configuration
@Profile("dev")
// DataSeeder class to seed initial data into the database (temporary)
public class DataSeeder {
    
    @Bean
    public CommandLineRunner initDatabase(UserRepo userRepo, EntryRepo entryRepo, PasswordEncoder passwordEncoder) {

        return args -> {
            if (userRepo.count() > 0) {
                System.out.println("seed skipped: users already exist.");
                return;
            }
            
            System.out.println("seeding temporary user data...");
            User albert = userRepo.save(new User("albert", passwordEncoder.encode("123")));
            userRepo.save(new User("david", passwordEncoder.encode("123")));
            
            System.out.println("seeding temporary entry data...");
            Entry testEntry = new Entry("test entry", "this is a test entry created by the seeder!!!");
            testEntry.setUser(albert);
            entryRepo.save(testEntry);

            System.out.println("data seeding complete!");
        };
    }
}
