# 📚 API Documentation

## Overview

The Recruitment Platform API is a RESTful API built with Django REST Framework that provides endpoints for user authentication, profile management, and recruitment functionality.

**Base URL**: `http://localhost:8000/api`  
**Authentication**: JWT Bearer Token  
**Content-Type**: `application/json`

---

## Authentication Endpoints

### Register User
Creates a new user account with email validation and secure password handling.

**Endpoint**: `POST /auth/register/`  
**Authentication**: Not required

#### Request Body
```json
{
  "username": "string (required, unique)",
  "email": "string (required, valid email, unique)",
  "first_name": "string (required)",
  "last_name": "string (required)",
  "password": "string (required, min 8 characters)",
  "password_confirm": "string (required, must match password)"
}
```

#### Success Response (201 Created)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Error Responses

**400 Bad Request - Validation Error**
```json
{
  "email": ["A user with this email already exists."],
  "password": ["This field is required."],
  "password_confirm": ["Passwords don't match"]
}
```

#### Example cURL
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "password": "securepassword123",
    "password_confirm": "securepassword123"
  }'
```

---

### Login User
Authenticates a user and returns JWT tokens for API access.

**Endpoint**: `POST /auth/login/`  
**Authentication**: Not required

#### Request Body
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

#### Success Response (200 OK)
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Error Responses

**400 Bad Request - Invalid Credentials**
```json
{
  "non_field_errors": ["Invalid credentials"]
}
```

**400 Bad Request - Account Disabled**
```json
{
  "non_field_errors": ["User account is disabled"]
}
```

#### Example cURL
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

---

### Refresh Token
Generates a new access token using a valid refresh token.

**Endpoint**: `POST /auth/token/refresh/`  
**Authentication**: Not required (refresh token in body)

#### Request Body
```json
{
  "refresh": "string (required, valid refresh token)"
}
```

#### Success Response (200 OK)
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### Error Responses

**401 Unauthorized - Invalid Token**
```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

### Logout User
Invalidates the refresh token and logs out the user.

**Endpoint**: `POST /auth/logout/`  
**Authentication**: Required (Bearer token)

#### Request Body
```json
{
  "refresh_token": "string (required, refresh token to blacklist)"
}
```

#### Success Response (205 Reset Content)
```json
{
  "message": "Logout successful"
}
```

#### Example cURL
```bash
curl -X POST http://localhost:8000/api/auth/logout/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

---

## User Profile Endpoints

### Get User Profile
Retrieves the complete user profile for the authenticated user.

**Endpoint**: `GET /profile/`  
**Authentication**: Required (Bearer token)

#### Success Response (200 OK)
```json
{
  "user_id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "phone_number": "+1234567890",
  "date_of_birth": "1990-01-15",
  "location": "New York, NY",
  "bio": "Experienced software developer with expertise in full-stack development.",
  "skills": "Python, JavaScript, React, Django",
  "skills_list": ["Python", "JavaScript", "React", "Django"],
  "experience_years": 5,
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "github_url": "https://github.com/johndoe",
  "is_recruiter": false,
  "company": null,
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

#### Example cURL
```bash
curl -X GET http://localhost:8000/api/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### Update User Profile
Updates user profile information with partial update support.

**Endpoint**: `PATCH /profile/`  
**Authentication**: Required (Bearer token)

#### Request Body (All fields optional)
```json
{
  "first_name": "string",
  "last_name": "string",
  "phone_number": "string (max 15 characters)",
  "date_of_birth": "date (YYYY-MM-DD)",
  "location": "string (max 100 characters)",
  "bio": "string (max 500 characters)",
  "skills": "string (comma-separated)",
  "experience_years": "integer",
  "linkedin_url": "string (valid URL)",
  "github_url": "string (valid URL)",
  "is_recruiter": "boolean",
  "company": "string (max 100 characters)"
}
```

#### Success Response (200 OK)
```json
{
  "user_id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Smith",
  "full_name": "John Smith",
  "phone_number": "+1234567890",
  "date_of_birth": "1990-01-15",
  "location": "San Francisco, CA",
  "bio": "Senior software developer specializing in full-stack web applications.",
  "skills": "Python, JavaScript, React, Django, AWS",
  "skills_list": ["Python", "JavaScript", "React", "Django", "AWS"],
  "experience_years": 6,
  "linkedin_url": "https://linkedin.com/in/johnsmith",
  "github_url": "https://github.com/johnsmith",
  "is_recruiter": false,
  "company": null,
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-20T16:45:00Z"
}
```

#### Error Responses

**400 Bad Request - Validation Error**
```json
{
  "phone_number": ["Ensure this field has no more than 15 characters."],
  "linkedin_url": ["Enter a valid URL."],
  "experience_years": ["Ensure this value is greater than or equal to 0."]
}
```

#### Example cURL
```bash
curl -X PATCH http://localhost:8000/api/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "location": "San Francisco, CA",
    "experience_years": 6,
    "skills": "Python, JavaScript, React, Django, AWS"
  }'
```

---

### Get User Info
Retrieves basic user information (lightweight endpoint).

**Endpoint**: `GET /user-info/`  
**Authentication**: Required (Bearer token)

#### Success Response (200 OK)
```json
{
  "user_id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "is_recruiter": false,
  "created_at": "2024-01-01T10:00:00Z"
}
```

---

## Error Handling

### Standard Error Response Format
All API errors follow a consistent format:

```json
{
  "field_name": ["Error message for specific field"],
  "non_field_errors": ["General error messages"],
  "detail": "Detailed error description"
}
```

### Common HTTP Status Codes

| Status Code | Description | When it occurs |
|-------------|-------------|----------------|
| 200 | OK | Successful GET/PATCH requests |
| 201 | Created | Successful POST requests (registration) |
| 400 | Bad Request | Validation errors, malformed requests |
| 401 | Unauthorized | Invalid/missing authentication token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server-side errors |

### Authentication Errors

**Missing Token**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**Invalid Token**
```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid"
}
```

**Expired Token**
```json
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Anonymous users**: 100 requests per hour
- **Authenticated users**: 1000 requests per hour

When rate limit is exceeded:

**429 Too Many Requests**
```json
{
  "detail": "Request was throttled. Expected available in 3600 seconds."
}
```

---

## CORS Configuration

The API supports Cross-Origin Resource Sharing (CORS) for the following origins:
- `http://localhost:3000` (React development)
- `http://localhost:5173` (Vite development)

Allowed headers:
- `Authorization`
- `Content-Type`
- `X-CSRFToken`

---

## Token Lifecycle

### Access Tokens
- **Lifetime**: 60 minutes
- **Usage**: Include in Authorization header as `Bearer <token>`
- **Refresh**: Automatically handled by frontend interceptors

### Refresh Tokens
- **Lifetime**: 1 day
- **Usage**: Used to obtain new access tokens
- **Security**: Rotated on each refresh, old tokens blacklisted

### Example Authorization Header
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwOTk1MjAwLCJqdGkiOiIxMjM0NTY3ODkwIiwidXNlcl9pZCI6MX0.example_signature
```

---

## Postman Collection

For testing the API, you can import this Postman collection:

```json
{
  "info": {
    "name": "Recruitment Platform API",
    "description": "Complete API collection for the Recruitment Platform"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000/api"
    },
    {
      "key": "access_token",
      "value": ""
    }
  ],
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{access_token}}"
      }
    ]
  }
}
```

---

This API documentation provides comprehensive details for integrating with the Recruitment Platform API. For additional support or questions, refer to the main project documentation.
