package com.idea1.app.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.idea1.app.backend.dto.ErrorResponse;

/**
 * Global Exception Handler - Catches exceptions across ALL controllers
 * 
 * WHAT IT DOES:
 * Instead of letting exceptions bubble up and return messy error responses (or crash),
 * this class intercepts exceptions and returns clean, standardized JSON error responses.
 * 
 * HOW IT WORKS:
 * - When ANY controller throws an exception, Spring looks here first
 * - The @ExceptionHandler methods catch specific exception types
 * - They return a nice ErrorResponse object (converted to JSON automatically)
 * 
 * BENEFITS:
 * 1. Consistent error format across your entire API
 * 2. No need to wrap every controller method in try-catch
 * 3. Proper HTTP status codes (401 for auth errors, 400 for bad requests, etc.)
 * 4. Clean JSON responses that your frontend can easily parse
 * 
 * EXAMPLE:
 * Without this: Login fails → returns HTML error page or crashes
 * With this: Login fails → returns {"status": 401, "error": "Unauthorized", "message": "Invalid username or password", ...}
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles authentication failures (wrong username/password)
     * Returns HTTP 401 Unauthorized
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(
            BadCredentialsException ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.UNAUTHORIZED.value(),
            "Unauthorized",
            "Invalid username or password",
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles when a user is not found in the database
     * Returns HTTP 404 Not Found
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(
            UsernameNotFoundException ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Not Found",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles any other unexpected exceptions
     * Returns HTTP 500 Internal Server Error
     * In production, you might want to log this and return a generic message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
            Exception ex, WebRequest request) {
        
        ErrorResponse errorResponse = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal Server Error",
            "An unexpected error occurred",
            request.getDescription(false).replace("uri=", "")
        );
        
        // Log the actual exception for debugging (you might want to use a proper logger)
        System.err.println("Unexpected error: " + ex.getMessage());
        ex.printStackTrace();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

