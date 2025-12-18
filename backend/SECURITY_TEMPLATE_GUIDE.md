# Spring Security + JWT Authentication Template

This is a complete, production-ready Spring Security and JWT authentication setup that you can use as a template for future projects.

## ✅ What's Included

### Core Security Components

1. **SecurityConfig.java** - Spring Security configuration
   - JWT-based authentication (stateless)
   - Public endpoints: `/register`, `/login`, `/`
   - All other endpoints require authentication
   - CSRF disabled (stateless JWT doesn't need it)
   - HTTP Basic auth disabled (JWT only)

2. **JwtFilter.java** - JWT token validation filter
   - Intercepts all requests
   - Extracts JWT from `Authorization: Bearer <token>` header
   - Validates token and sets authentication context
   - Handles errors gracefully

3. **JWTService.java** - JWT token operations
   - Generates JWT tokens
   - Validates tokens
   - Extracts user information from tokens
   - Token expiration: 1 hour (configurable)

4. **MyUserDetailsService.java** - User authentication
   - Loads user from database by username
   - Required by Spring Security

5. **UserPrincipal.java** - Spring Security adapter
   - Converts your User entity to Spring Security's UserDetails
   - Provides user authorities/permissions

6. **UserService.java** - Business logic
   - User registration (with password hashing)
   - User authentication and token generation

7. **GlobalExceptionHandler.java** - Error handling
   - Catches exceptions across all controllers
   - Returns clean, standardized JSON error responses
   - Proper HTTP status codes

## 🔧 Configuration

### application.properties

```properties
# JWT Configuration
jwt.secret=BHgtlMN4bSygr0dD1mZ9yGJ5v7oSAyfh9VRGzmvblRQ=

# To generate a new secret:
# openssl rand -base64 32
```

**⚠️ IMPORTANT:** Change the JWT secret in production! The current one is a secure random string, but you should generate a new one for each project.

### Dependencies (pom.xml)

Already included:
- Spring Boot Starter Security
- JWT libraries (jjwt-api, jjwt-impl, jjwt-jackson)
- PostgreSQL driver
- JPA/Hibernate

## 📝 API Endpoints

### Public Endpoints (No authentication required)

- `POST /register` - Register a new user
  ```json
  Request: { "username": "john", "password": "secret123" }
  Response: User object (with hashed password)
  ```

- `POST /login` - Login and get JWT token
  ```json
  Request: { "username": "john", "password": "secret123" }
  Response: "eyJhbGciOiJIUzI1NiIs..." (JWT token string)
  ```

- `GET /` - Hello endpoint

### Protected Endpoints (Require JWT token)

All other endpoints require the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

Example:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." http://localhost:8080/api/users
```

## 🔒 How Authentication Works

1. **Registration**
   - User sends username/password to `/register`
   - Password is hashed with BCrypt (strength 12)
   - User is saved to database

2. **Login**
   - User sends username/password to `/login`
   - Spring Security validates credentials
   - JWT token is generated and returned
   - Token expires in 1 hour

3. **Making Authenticated Requests**
   - Frontend includes token in header: `Authorization: Bearer <token>`
   - JwtFilter intercepts request
   - Token is validated
   - User is authenticated for the request

4. **Token Expiration**
   - After 1 hour, token expires
   - User must login again to get new token
   - (See TOKEN_REFRESH_EXPLANATION.md if you want refresh tokens)

## 🚀 Using This Template

### For a New Project:

1. Copy the entire backend folder structure
2. Update `application.properties`:
   - Change database connection
   - Generate new JWT secret: `openssl rand -base64 32`
3. Update package names to match your project
4. Customize User entity if needed (add fields like email, etc.)
5. That's it! Your authentication is ready

### Customization Points:

- **Token expiration**: Change `EXP_MS` in `JWTService.java`
- **Password encoder strength**: Change BCrypt strength in `SecurityConfig.java`
- **Public endpoints**: Add more to `.permitAll()` in `SecurityConfig.java`
- **User model**: Add fields to `User.java`, update `UserPrincipal.java` accordingly

## 📚 Understanding the Components

### SecurityConfig
- The "blueprint" for security
- Defines which endpoints need authentication
- Configures password encoding
- Sets up the security filter chain

### JwtFilter
- Runs on every request
- Extracts and validates JWT tokens
- Sets authentication context if token is valid

### JWTService
- Token generation and validation
- Handles token parsing and expiration

### MyUserDetailsService
- Loads users from database
- Required by Spring Security's authentication system

### UserPrincipal
- Adapter pattern
- Converts your User entity to Spring Security's format

### GlobalExceptionHandler
- Catches exceptions automatically
- Returns clean error responses
- No need for try-catch in controllers

## 🎯 Best Practices Implemented

✅ Passwords hashed with BCrypt (industry standard)
✅ JWT tokens with expiration
✅ Stateless authentication (no server-side sessions)
✅ Secure random JWT secret
✅ Proper exception handling
✅ Clean error responses
✅ CSRF protection disabled (not needed for stateless JWT)
✅ HTTP Basic auth disabled (using JWT only)

## 🔐 Security Notes

- JWT secret should be at least 32 characters
- In production, store JWT secret as environment variable
- Tokens expire after 1 hour (configurable)
- No token refresh implemented (see TOKEN_REFRESH_EXPLANATION.md)
- Consider adding rate limiting for login endpoints
- Consider adding password complexity requirements

## 📖 Further Reading

- See `TOKEN_REFRESH_EXPLANATION.md` for information about refresh tokens
- Spring Security documentation: https://spring.io/projects/spring-security
- JWT.io for token debugging: https://jwt.io/

---

**Template Status: ✅ Complete and Ready to Use**

This template provides a solid foundation for authentication in any Spring Boot project. It's production-ready and follows security best practices.

