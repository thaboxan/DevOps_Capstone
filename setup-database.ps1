# Download and install PostgreSQL if not already installed
$pgPath = "C:\Program Files\PostgreSQL\13\bin"
if (-not (Test-Path $pgPath)) {
    Write-Host "PostgreSQL is not installed. Please install PostgreSQL 13 from https://www.postgresql.org/download/windows/"
    exit 1
}

# Add PostgreSQL to PATH if not already there
$env:Path = "$env:Path;$pgPath"

# Create database
$env:PGPASSWORD = "postgres"
psql -U postgres -c "CREATE DATABASE booking_system;"

# Create tables
psql -U postgres -d booking_system -c "
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, role)
);

CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    active BOOLEAN DEFAULT true,
    description TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    resource_id BIGINT REFERENCES resources(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Insert initial data
psql -U postgres -d booking_system -c "
INSERT INTO resources (name, type, active, description) VALUES
('Main Boardroom', 'BOARDROOM', true, 'Large boardroom with video conferencing facilities'),
('Capsule A', 'CAPSULE', true, 'Quiet workspace for 2-3 people'),
('Capsule B', 'CAPSULE', true, 'Quiet workspace for 2-3 people'),
('Capsule C', 'CAPSULE', true, 'Quiet workspace for 2-3 people'),
('Capsule D', 'CAPSULE', true, 'Quiet workspace for 2-3 people');

-- Create admin user (password: admin123)
INSERT INTO users (email, password, full_name, enabled) VALUES
('admin@example.com', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS', 'Admin User', true);

INSERT INTO user_roles (user_id, role) VALUES
(1, 'ROLE_ADMIN');"

Write-Host "Database setup completed successfully!"
