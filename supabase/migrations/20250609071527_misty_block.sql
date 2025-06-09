-- =============================================
-- SMART INVESTMENT PLATFORM - COMPLETE DATABASE
-- =============================================
-- This file contains the complete database schema, sample data, and API queries
-- Ready for XAMPP/MySQL deployment

-- Create database
CREATE DATABASE IF NOT EXISTS smart_investment_platform;
USE smart_investment_platform;

-- =============================================
-- TABLE CREATION
-- =============================================

-- Users table for both creators and investors
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('creator', 'investor') NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL
);

-- Project categories table
CREATE TABLE project_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies/Projects table
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    poster_url VARCHAR(500),
    director VARCHAR(100),
    producer VARCHAR(100),
    singer VARCHAR(100),
    hero VARCHAR(100),
    heroine VARCHAR(100),
    category_id INT,
    creator_id INT NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    invested_amount DECIMAL(15,2) DEFAULT 0.00,
    stock_price DECIMAL(10,2) NOT NULL,
    available_stocks INT GENERATED ALWAYS AS (FLOOR((total_amount - invested_amount) / stock_price)) STORED,
    funding_deadline DATE,
    project_status ENUM('draft', 'active', 'funded', 'completed', 'cancelled') DEFAULT 'active',
    ai_risk_score DECIMAL(3,2) DEFAULT 0.50,
    ai_fraud_check BOOLEAN DEFAULT FALSE,
    ai_analysis_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE SET NULL,
    INDEX idx_creator_id (creator_id),
    INDEX idx_project_status (project_status),
    INDEX idx_funding_deadline (funding_deadline)
);

-- Investments table
CREATE TABLE investments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    investor_id INT NOT NULL,
    stock_count INT NOT NULL,
    stock_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    investment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    roi_percentage DECIMAL(5,2) DEFAULT 0.00,
    profit_earned DECIMAL(15,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (investor_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_movie_id (movie_id),
    INDEX idx_investor_id (investor_id),
    INDEX idx_investment_date (investment_date),
    UNIQUE KEY unique_investment (movie_id, investor_id, investment_date)
);

-- Investment history for tracking changes
CREATE TABLE investment_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    investment_id INT NOT NULL,
    action_type ENUM('created', 'updated', 'cancelled', 'profit_distributed') NOT NULL,
    old_values JSON,
    new_values JSON,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (investment_id) REFERENCES investments(id) ON DELETE CASCADE,
    INDEX idx_investment_id (investment_id),
    INDEX idx_action_date (action_date)
);

-- User sessions for authentication
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_expires_at (expires_at)
);

-- Payment transactions table
CREATE TABLE payment_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    investment_id INT NOT NULL,
    transaction_type ENUM('investment', 'refund', 'profit_distribution') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_gateway VARCHAR(50),
    gateway_transaction_id VARCHAR(100),
    gateway_response JSON,
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (investment_id) REFERENCES investments(id) ON DELETE CASCADE,
    INDEX idx_investment_id (investment_id),
    INDEX idx_status (status),
    INDEX idx_processed_at (processed_at)
);

-- Notifications table
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('investment', 'funding_complete', 'profit_distribution', 'system', 'security') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    related_movie_id INT NULL,
    related_investment_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (related_movie_id) REFERENCES movies(id) ON DELETE SET NULL,
    FOREIGN KEY (related_investment_id) REFERENCES investments(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger to update movie invested_amount when investment is made
DELIMITER //
CREATE TRIGGER update_movie_invested_amount 
AFTER INSERT ON investments 
FOR EACH ROW
BEGIN
    UPDATE movies 
    SET invested_amount = invested_amount + NEW.total_amount,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.movie_id;
END//

-- Trigger to update movie invested_amount when investment is cancelled
CREATE TRIGGER update_movie_invested_amount_on_cancel
AFTER UPDATE ON investments
FOR EACH ROW
BEGIN
    IF OLD.payment_status != 'refunded' AND NEW.payment_status = 'refunded' THEN
        UPDATE movies 
        SET invested_amount = invested_amount - NEW.total_amount,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.movie_id;
    END IF;
END//

-- Trigger to log investment history
CREATE TRIGGER log_investment_history
AFTER INSERT ON investments
FOR EACH ROW
BEGIN
    INSERT INTO investment_history (investment_id, action_type, new_values, notes)
    VALUES (NEW.id, 'created', JSON_OBJECT(
        'stock_count', NEW.stock_count,
        'stock_price', NEW.stock_price,
        'total_amount', NEW.total_amount,
        'payment_status', NEW.payment_status
    ), 'Investment created');
END//

-- Trigger to create notification when investment is made
CREATE TRIGGER create_investment_notification
AFTER INSERT ON investments
FOR EACH ROW
BEGIN
    DECLARE creator_id INT;
    DECLARE movie_title VARCHAR(200);
    
    SELECT m.creator_id, m.title INTO creator_id, movie_title
    FROM movies m WHERE m.id = NEW.movie_id;
    
    INSERT INTO notifications (user_id, title, message, type, related_movie_id, related_investment_id)
    VALUES (creator_id, 'New Investment Received', 
            CONCAT('You received a new investment of $', NEW.total_amount, ' for "', movie_title, '"'),
            'investment', NEW.movie_id, NEW.id);
END//

DELIMITER ;

-- =============================================
-- SAMPLE DATA INSERTION
-- =============================================

-- Insert sample project categories
INSERT INTO project_categories (name, description) VALUES
('Feature Film', 'Full-length theatrical movies'),
('Short Film', 'Short format films under 40 minutes'),
('Documentary', 'Non-fiction documentary projects'),
('Web Series', 'Digital series for online platforms'),
('Music Video', 'Music video productions'),
('Commercial', 'Advertisement and commercial content'),
('Animation', 'Animated content and films');

-- Insert sample users (passwords should be hashed in production)
INSERT INTO users (username, email, password_hash, role, first_name, last_name, bio, email_verified) VALUES
('creator1', 'creator@test.com', 'password', 'creator', 'John', 'Director', 'Passionate filmmaker with 10 years of experience in independent cinema.', TRUE),
('creator2', 'sarah.producer@test.com', 'password', 'creator', 'Sarah', 'Producer', 'Award-winning producer specializing in drama and thriller genres.', TRUE),
('investor1', 'investor@test.com', 'password', 'investor', 'Michael', 'Johnson', 'Angel investor focused on entertainment and media projects.', TRUE),
('investor2', 'jane.investor@test.com', 'password', 'investor', 'Jane', 'Smith', 'Portfolio manager with expertise in creative industry investments.', TRUE),
('creator3', 'alex.filmmaker@test.com', 'password', 'creator', 'Alex', 'Turner', 'Independent filmmaker and screenwriter.', TRUE),
('filmmaker_mike', 'mike.filmmaker@test.com', 'password', 'creator', 'Mike', 'Anderson', 'Documentary filmmaker passionate about social issues.', TRUE),
('producer_lisa', 'lisa.producer@test.com', 'password', 'creator', 'Lisa', 'Rodriguez', 'Independent producer with focus on emerging talent.', TRUE),
('investor_david', 'david.investor@test.com', 'password', 'investor', 'David', 'Wilson', 'Tech entrepreneur investing in creative industries.', TRUE),
('investor_emma', 'emma.investor@test.com', 'password', 'investor', 'Emma', 'Thompson', 'Former entertainment executive turned angel investor.', TRUE),
('director_carlos', 'carlos.director@test.com', 'password', 'creator', 'Carlos', 'Martinez', 'Award-winning director specializing in Latin American cinema.', TRUE);

-- Insert sample movies/projects
INSERT INTO movies (title, description, poster_url, director, producer, singer, hero, heroine, category_id, creator_id, total_amount, invested_amount, stock_price, funding_deadline, ai_risk_score, ai_fraud_check, ai_analysis_data) VALUES
('Epic Adventure', 'A thrilling adventure story set in ancient times with stunning visuals and compelling characters.', 'https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg', 'John Director', 'Jane Producer', 'Music Maestro', 'Action Star', 'Lead Actress', 1, 1, 1000000.00, 350000.00, 100.00, '2024-12-31', 0.25, TRUE, '{"market_potential": 0.80, "team_experience": 0.85, "budget_realism": 0.90}'),
('Romantic Drama', 'A heartwarming love story that explores the complexities of modern relationships.', 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg', 'Sarah Director', 'Mike Producer', 'Melody Singer', 'Romantic Lead', 'Drama Queen', 1, 2, 750000.00, 200000.00, 75.00, '2024-11-30', 0.30, TRUE, '{"market_potential": 0.75, "team_experience": 0.80, "budget_realism": 0.85}'),
('The Last Horizon', 'A sci-fi thriller about humanity\'s last hope for survival in a post-apocalyptic world.', 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg', 'Sarah Johnson', 'Michael Roberts', 'Electronic Composer', 'Future Hero', 'Sci-Fi Heroine', 1, 1, 2500000.00, 1750000.00, 100.00, '2025-01-15', 0.20, TRUE, '{"market_potential": 0.90, "team_experience": 0.95, "budget_realism": 0.80}'),
('Whispers of the Heart', 'An intimate character study exploring family dynamics and personal growth.', 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg', 'Robert Zhang', 'Sophia Davis', 'Classical Composer', 'Character Actor', 'Dramatic Lead', 1, 2, 1200000.00, 850000.00, 80.00, '2024-12-15', 0.35, TRUE, '{"market_potential": 0.70, "team_experience": 0.75, "budget_realism": 0.90}'),
('Shadows of Truth', 'A gripping mystery thriller that keeps audiences guessing until the final reveal.', 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg', 'Thomas Miller', 'Jennifer Brown', 'Suspense Composer', 'Detective Hero', 'Mystery Woman', 1, 5, 1800000.00, 450000.00, 70.00, '2025-02-28', 0.40, TRUE, '{"market_potential": 0.65, "team_experience": 0.70, "budget_realism": 0.75}'),
('Beyond the Mountains', 'An epic journey through breathtaking landscapes and human resilience.', 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg', 'Alex Turner', 'Lisa Rodriguez', 'Mountain Echo', 'Adventure Hero', 'Mountain Guide', 1, 5, 3000000.00, 2100000.00, 120.00, '2025-03-15', 0.15, TRUE, '{"market_potential": 0.85, "team_experience": 0.90, "budget_realism": 0.80}'),
('The Forgotten Symphony', 'A musical drama about a composer rediscovering their passion.', 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg', 'Elizabeth Parker', 'William Harris', 'Classical Master', 'Composer', 'Violinist', 1, 6, 1500000.00, 900000.00, 90.00, '2024-12-20', 0.25, TRUE, '{"market_potential": 0.75, "team_experience": 0.85, "budget_realism": 0.90}'),
('City of Dreams', 'Urban drama exploring the lives of immigrants in a bustling metropolis.', 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg', 'Mark Wilson', 'Jessica Moore', 'Urban Beats', 'Immigrant Worker', 'Social Worker', 1, 7, 2200000.00, 1200000.00, 85.00, '2025-01-30', 0.30, TRUE, '{"market_potential": 0.70, "team_experience": 0.75, "budget_realism": 0.85}');

-- Insert sample investments
INSERT INTO investments (movie_id, investor_id, stock_count, stock_price, total_amount, payment_status, payment_method, roi_percentage) VALUES
(1, 3, 1000, 100.00, 100000.00, 'completed', 'credit_card', 0.00),
(1, 4, 2500, 100.00, 250000.00, 'completed', 'bank_transfer', 0.00),
(2, 3, 800, 75.00, 60000.00, 'completed', 'credit_card', 0.00),
(2, 4, 1867, 75.00, 140000.00, 'completed', 'digital_wallet', 0.00),
(3, 3, 5000, 100.00, 500000.00, 'completed', 'bank_transfer', 0.00),
(3, 4, 12500, 100.00, 1250000.00, 'completed', 'wire_transfer', 0.00),
(4, 3, 3000, 80.00, 240000.00, 'completed', 'credit_card', 0.00),
(4, 4, 7625, 80.00, 610000.00, 'completed', 'bank_transfer', 0.00),
(6, 8, 5000, 120.00, 600000.00, 'completed', 'wire_transfer', 0.00),
(6, 9, 12500, 120.00, 1500000.00, 'completed', 'bank_transfer', 0.00),
(7, 8, 4000, 90.00, 360000.00, 'completed', 'credit_card', 0.00),
(7, 9, 6000, 90.00, 540000.00, 'completed', 'digital_wallet', 0.00),
(8, 3, 5000, 85.00, 425000.00, 'completed', 'bank_transfer', 0.00),
(8, 4, 9118, 85.00, 775000.00, 'completed', 'wire_transfer', 0.00);

-- Insert sample payment transactions
INSERT INTO payment_transactions (investment_id, transaction_type, amount, payment_gateway, gateway_transaction_id, status, processed_at) VALUES
(1, 'investment', 100000.00, 'stripe', 'txn_1234567890', 'completed', '2024-01-15 10:30:00'),
(2, 'investment', 250000.00, 'paypal', 'txn_0987654321', 'completed', '2024-01-16 14:45:00'),
(3, 'investment', 60000.00, 'stripe', 'txn_1122334455', 'completed', '2024-01-20 09:15:00'),
(4, 'investment', 140000.00, 'square', 'txn_5566778899', 'completed', '2024-01-22 16:20:00'),
(5, 'investment', 500000.00, 'wire_transfer', 'wire_1234567890', 'completed', '2024-02-01 11:00:00'),
(6, 'investment', 1250000.00, 'wire_transfer', 'wire_0987654321', 'completed', '2024-02-02 13:30:00'),
(7, 'investment', 240000.00, 'stripe', 'txn_9988776655', 'completed', '2024-02-10 15:45:00'),
(8, 'investment', 610000.00, 'paypal', 'txn_4433221100', 'completed', '2024-02-12 12:15:00');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, related_movie_id, related_investment_id) VALUES
(1, 'New Investment Received', 'You received a new investment of $600,000 for "Beyond the Mountains"', 'investment', 6, 9),
(1, 'Funding Milestone Reached', 'Your project "The Last Guardian" has reached 50% funding!', 'funding_complete', 3, NULL),
(2, 'New Investment Received', 'You received a new investment of $240,000 for "Whispers of the Heart"', 'investment', 4, 7),
(6, 'New Investment Received', 'You received a new investment of $360,000 for "The Forgotten Symphony"', 'investment', 7, 11),
(3, 'Investment Confirmed', 'Your investment of $425,000 in "City of Dreams" has been confirmed', 'investment', 8, 13),
(8, 'Investment Confirmed', 'Your investment of $600,000 in "Beyond the Mountains" has been confirmed', 'investment', 6, 9),
(9, 'Portfolio Update', 'Your total portfolio value has increased by 5% this month', 'system', NULL, NULL);

-- Update some movies to show different statuses
UPDATE movies SET project_status = 'funded' WHERE id IN (3, 7);
UPDATE movies SET project_status = 'completed' WHERE id IN (1, 2);

-- Add some profit distributions for completed projects
UPDATE investments SET roi_percentage = 15.5, profit_earned = total_amount * 0.155 WHERE movie_id = 1;
UPDATE investments SET roi_percentage = 12.3, profit_earned = total_amount * 0.123 WHERE movie_id = 2;

-- =============================================
-- VIEWS FOR COMMON QUERIES
-- =============================================

-- View for movie investment summary
CREATE VIEW movie_investment_summary AS
SELECT 
    m.id,
    m.title,
    m.creator_id,
    u.username as creator_name,
    m.total_amount,
    m.invested_amount,
    m.stock_price,
    m.available_stocks,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage,
    COUNT(DISTINCT i.investor_id) as investor_count,
    COUNT(i.id) as total_investments,
    m.ai_risk_score,
    m.project_status,
    m.funding_deadline
FROM movies m
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
LEFT JOIN users u ON m.creator_id = u.id
GROUP BY m.id;

-- View for investor portfolio
CREATE VIEW investor_portfolio AS
SELECT 
    i.investor_id,
    u.username as investor_name,
    i.movie_id,
    m.title as movie_title,
    i.stock_count,
    i.stock_price,
    i.total_amount as invested_amount,
    i.roi_percentage,
    i.profit_earned,
    i.investment_date,
    m.project_status,
    ROUND((i.stock_count * i.stock_price / m.total_amount) * 100, 4) as ownership_percentage
FROM investments i
JOIN users u ON i.investor_id = u.id
JOIN movies m ON i.movie_id = m.id
WHERE i.payment_status = 'completed';

-- View for creator dashboard
CREATE VIEW creator_dashboard AS
SELECT 
    u.id as creator_id,
    u.username as creator_name,
    COUNT(DISTINCT m.id) as total_projects,
    COUNT(DISTINCT CASE WHEN m.project_status = 'active' THEN m.id END) as active_projects,
    COUNT(DISTINCT CASE WHEN m.project_status = 'funded' THEN m.id END) as funded_projects,
    SUM(m.total_amount) as total_funding_goal,
    SUM(m.invested_amount) as total_raised,
    COUNT(DISTINCT i.investor_id) as unique_investors,
    COUNT(i.id) as total_investments
FROM users u
LEFT JOIN movies m ON u.id = m.creator_id
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
WHERE u.role = 'creator'
GROUP BY u.id;

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Procedure to get movie details with investment info
DELIMITER //
CREATE PROCEDURE GetMovieDetails(IN movie_id INT)
BEGIN
    SELECT 
        m.*,
        u.username as creator_name,
        u.first_name as creator_first_name,
        u.last_name as creator_last_name,
        pc.name as category_name,
        COUNT(DISTINCT i.investor_id) as investor_count,
        SUM(CASE WHEN i.payment_status = 'completed' THEN i.total_amount ELSE 0 END) as confirmed_investment,
        ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage
    FROM movies m
    LEFT JOIN users u ON m.creator_id = u.id
    LEFT JOIN project_categories pc ON m.category_id = pc.id
    LEFT JOIN investments i ON m.id = i.movie_id
    WHERE m.id = movie_id
    GROUP BY m.id;
END//

-- Procedure to create a new investment
CREATE PROCEDURE CreateInvestment(
    IN p_movie_id INT,
    IN p_investor_id INT,
    IN p_stock_count INT,
    IN p_payment_method VARCHAR(50)
)
BEGIN
    DECLARE v_stock_price DECIMAL(10,2);
    DECLARE v_total_amount DECIMAL(15,2);
    DECLARE v_available_stocks INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Get current stock price and available stocks
    SELECT stock_price, available_stocks 
    INTO v_stock_price, v_available_stocks
    FROM movies 
    WHERE id = p_movie_id AND project_status = 'active';
    
    -- Check if enough stocks are available
    IF v_available_stocks < p_stock_count THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough stocks available';
    END IF;
    
    SET v_total_amount = p_stock_count * v_stock_price;
    
    -- Insert the investment
    INSERT INTO investments (movie_id, investor_id, stock_count, stock_price, total_amount, payment_method)
    VALUES (p_movie_id, p_investor_id, p_stock_count, v_stock_price, v_total_amount, p_payment_method);
    
    COMMIT;
    
    SELECT LAST_INSERT_ID() as investment_id, v_total_amount as total_amount;
END//

DELIMITER ;

-- =============================================
-- PERFORMANCE INDEXES
-- =============================================

CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_funding_status ON movies(project_status, funding_deadline);
CREATE INDEX idx_investments_amount ON investments(total_amount);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email_verified ON users(email_verified);

-- =============================================
-- SAMPLE API QUERIES (FOR REFERENCE)
-- =============================================

/*
-- Login user
SELECT id, username, email, role, first_name, last_name, profile_image, last_login
FROM users 
WHERE (username = 'creator1' OR email = 'creator1') AND password_hash = 'password' AND is_active = TRUE;

-- Get all active movies
SELECT * FROM movie_investment_summary WHERE project_status = 'active';

-- Get movie by ID
CALL GetMovieDetails(1);

-- Get investor portfolio
SELECT * FROM investor_portfolio WHERE investor_id = 3;

-- Get creator dashboard
SELECT * FROM creator_dashboard WHERE creator_id = 1;

-- Create new investment
CALL CreateInvestment(1, 3, 100, 'credit_card');

-- Get user notifications
SELECT n.*, m.title as movie_title
FROM notifications n
LEFT JOIN movies m ON n.related_movie_id = m.id
WHERE n.user_id = 1
ORDER BY n.created_at DESC
LIMIT 20;
*/

-- =============================================
-- SETUP COMPLETE
-- =============================================
-- Database setup is complete!
-- Test credentials:
-- Creator: username='creator1', password='password'
-- Investor: username='investor1', password='password'