# Boardroom and Capsule Booking System

A comprehensive booking system for managing boardroom and capsule space reservations.

## Prerequisites

1. Java 17 or higher
2. PostgreSQL 13+
3. Node.js 16+ and npm 8+
4. Maven 3.6+

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL 13 from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)
2. Run the database setup script:
```powershell
.\setup-database.ps1
```

### 2. Backend Setup

1. Configure `application.yml` with your database credentials and email settings
2. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start on http://localhost:8080/api

### 3. Frontend Setup

1. Install frontend dependencies and start the development server:
```powershell
.\setup-frontend.ps1
```

The frontend will be available at http://localhost:3000

### Default Admin Credentials

- Email: admin@example.com
- Password: admin123

## API Documentation

Once the application is running, you can access:
- Swagger UI: http://localhost:8080/api/swagger-ui.html
- OpenAPI docs: http://localhost:8080/api/api-docs

## Features

- Secure user authentication with JWT
- Role-based access control
- Interactive booking calendar
- Real-time availability updates
- Email notifications for bookings
- Resource management (1 boardroom, 4 capsules)

## Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/booking/
│   │   │       ├── config/      # Configuration classes
│   │   │       ├── controller/  # REST controllers
│   │   │       ├── model/       # Entity classes
│   │   │       ├── repository/  # Data access layer
│   │   │       ├── service/     # Business logic
│   │   │       └── security/    # Security configuration
│   │   └── resources/
│   │       ├── application.yml
│   │       └── templates/       # Email templates
│   └── test/                    # Test classes
└── frontend/
    ├── src/
    │   ├── components/          # Reusable React components
    │   ├── pages/              # Page components
    │   ├── contexts/           # React contexts
    │   └── App.tsx            # Main application component
    ├── package.json
    └── tsconfig.json
```

## Development

1. Backend API endpoints are prefixed with `/api`
2. Frontend development server includes proxy configuration for the backend
3. JWT tokens are stored in localStorage
4. Email notifications use HTML templates with Thymeleaf

## Testing

Run backend tests:
```bash
mvn test
```

Run frontend tests:
```bash
cd frontend
npm test
```
