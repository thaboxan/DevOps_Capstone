-- Create database if not exists
CREATE DATABASE booking_system;

\c booking_system;

-- Create initial resources
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
(1, 'ROLE_ADMIN');
