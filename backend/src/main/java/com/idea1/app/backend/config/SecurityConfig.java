package com.idea1.app.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
/*
this file acts like the "architec's plan". it doesn't do the work itself, it tells spring how the building (the security system) should be constructed.
- Role: configuration/blueprint
- What it says: it defines the security policies and rules for the application (like which endpoints need authentication, what kind of authentication to use, password encoding strategies, etc.)
- Connection: it sets up the security filter chain that intercepts incoming requests and applies the defined security rules.
*/
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(customizer -> customizer.disable()); // disable CSRF for testing purposes becuase I'm using Postman
        http.authorizeHttpRequests(request -> request.requestMatchers("/register", "/login").permitAll().anyRequest().authenticated()); // all requests need to be authenticated
        http.formLogin(form -> form.disable()); // enable form login (default login page)
        http.httpBasic(Customizer.withDefaults()); // enable basic auth (for Postman testing)
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
        
    }

    // @Bean
    // !!custom authentication provider that i'm going to comment out for now!!
    // public AuthenticationProvider authenticationProvider() {
    //     DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
    //     provider.setUserDetailsService(userDetailsService);
    //     provider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
    //      return provider;
    // }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder(12); 
        
    }

    // figure out what this method does later
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();

    }

}