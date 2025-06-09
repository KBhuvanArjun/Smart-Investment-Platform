/*
# API Queries for Smart Investment Platform

This file contains optimized SQL queries that can be used
by your backend API to interact with the database efficiently.
*/

-- =============================================
-- USER AUTHENTICATION QUERIES
-- =============================================

-- Login user (use with password hashing)
SELECT id, username, email, role, first_name, last_name, profile_image, last_login
FROM users 
WHERE (username = ? OR email = ?) AND password_hash = ? AND is_active = TRUE;

-- Register new user
INSERT INTO users (username, email, password_hash, role, first_name, last_name, bio)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- Update last login
UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?;

-- =============================================
-- MOVIE/PROJECT QUERIES
-- =============================================

-- Get all active movies with investment progress
SELECT 
    m.id,
    m.title,
    m.description,
    m.poster_url,
    m.director,
    m.producer,
    m.singer,
    m.hero,
    m.heroine,
    m.total_amount,
    m.invested_amount,
    m.stock_price,
    m.available_stocks,
    m.funding_deadline,
    m.project_status,
    m.ai_risk_score,
    m.ai_fraud_check,
    u.username as creator_name,
    pc.name as category_name,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage,
    COUNT(DISTINCT i.investor_id) as investor_count
FROM movies m
LEFT JOIN users u ON m.creator_id = u.id
LEFT JOIN project_categories pc ON m.category_id = pc.id
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
WHERE m.project_status = 'active'
GROUP BY m.id
ORDER BY m.created_at DESC;

-- Get movie by ID with detailed information
SELECT 
    m.*,
    u.username as creator_name,
    u.first_name as creator_first_name,
    u.last_name as creator_last_name,
    u.bio as creator_bio,
    pc.name as category_name,
    COUNT(DISTINCT i.investor_id) as investor_count,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage
FROM movies m
LEFT JOIN users u ON m.creator_id = u.id
LEFT JOIN project_categories pc ON m.category_id = pc.id
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
WHERE m.id = ?
GROUP BY m.id;

-- Get movies by creator
SELECT 
    m.*,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage,
    COUNT(DISTINCT i.investor_id) as investor_count,
    COUNT(i.id) as total_investments
FROM movies m
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
WHERE m.creator_id = ?
GROUP BY m.id
ORDER BY m.created_at DESC;

-- Search movies by title
SELECT 
    m.id,
    m.title,
    m.poster_url,
    m.total_amount,
    m.invested_amount,
    m.stock_price,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage
FROM movies m
WHERE m.title LIKE CONCAT('%', ?, '%') AND m.project_status = 'active'
ORDER BY m.title;

-- Create new movie
INSERT INTO movies (title, description, poster_url, director, producer, singer, hero, heroine, category_id, creator_id, total_amount, stock_price, funding_deadline)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Update movie
UPDATE movies 
SET title = ?, description = ?, director = ?, producer = ?, singer = ?, hero = ?, heroine = ?, 
    total_amount = ?, stock_price = ?, funding_deadline = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ? AND creator_id = ?;

-- =============================================
-- INVESTMENT QUERIES
-- =============================================

-- Get investment details for payment processing
SELECT 
    i.*,
    m.title as movie_title,
    m.poster_url as movie_poster,
    u.username as investor_name
FROM investments i
JOIN movies m ON i.movie_id = m.id
JOIN users u ON i.investor_id = u.id
WHERE i.id = ?;

-- Get investments by investor
SELECT 
    i.*,
    m.title as movie_title,
    m.poster_url as movie_poster,
    m.project_status,
    ROUND((i.stock_count * i.stock_price / m.total_amount) * 100, 4) as ownership_percentage
FROM investments i
JOIN movies m ON i.movie_id = m.id
WHERE i.investor_id = ? AND i.payment_status = 'completed'
ORDER BY i.investment_date DESC;

-- Get investments for a specific movie
SELECT 
    i.*,
    u.username as investor_name,
    u.first_name,
    u.last_name
FROM investments i
JOIN users u ON i.investor_id = u.id
WHERE i.movie_id = ? AND i.payment_status = 'completed'
ORDER BY i.investment_date DESC;

-- Get investments by creator (for creator dashboard)
SELECT 
    i.*,
    m.title as movie_title,
    u.username as investor_name
FROM investments i
JOIN movies m ON i.movie_id = m.id
JOIN users u ON i.investor_id = u.id
WHERE m.creator_id = ? AND i.payment_status = 'completed'
ORDER BY i.investment_date DESC;

-- Create new investment
INSERT INTO investments (movie_id, investor_id, stock_count, stock_price, total_amount, payment_method)
VALUES (?, ?, ?, ?, ?, ?);

-- Update investment payment status
UPDATE investments 
SET payment_status = ?, transaction_id = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?;

-- =============================================
-- DASHBOARD QUERIES
-- =============================================

-- Creator dashboard summary
SELECT 
    COUNT(DISTINCT m.id) as total_projects,
    COUNT(DISTINCT CASE WHEN m.project_status = 'active' THEN m.id END) as active_projects,
    COUNT(DISTINCT CASE WHEN m.project_status = 'funded' THEN m.id END) as funded_projects,
    COUNT(DISTINCT CASE WHEN m.project_status = 'completed' THEN m.id END) as completed_projects,
    COALESCE(SUM(m.total_amount), 0) as total_funding_goal,
    COALESCE(SUM(m.invested_amount), 0) as total_raised,
    COUNT(DISTINCT i.investor_id) as unique_investors,
    COUNT(i.id) as total_investments
FROM movies m
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
WHERE m.creator_id = ?;

-- Investor dashboard summary
SELECT 
    COUNT(DISTINCT i.movie_id) as invested_projects,
    COUNT(i.id) as total_investments,
    COALESCE(SUM(i.total_amount), 0) as total_invested,
    COALESCE(SUM(i.profit_earned), 0) as total_profit,
    COALESCE(AVG(i.roi_percentage), 0) as average_roi
FROM investments i
WHERE i.investor_id = ? AND i.payment_status = 'completed';

-- Platform statistics
SELECT 
    COUNT(DISTINCT CASE WHEN role = 'creator' THEN id END) as total_creators,
    COUNT(DISTINCT CASE WHEN role = 'investor' THEN id END) as total_investors,
    (SELECT COUNT(*) FROM movies WHERE project_status = 'active') as active_projects,
    (SELECT COUNT(*) FROM movies WHERE project_status = 'funded') as funded_projects,
    (SELECT COALESCE(SUM(invested_amount), 0) FROM movies) as total_invested,
    (SELECT COUNT(*) FROM investments WHERE payment_status = 'completed') as total_investments
FROM users;

-- =============================================
-- NOTIFICATION QUERIES
-- =============================================

-- Get user notifications
SELECT 
    n.*,
    m.title as movie_title
FROM notifications n
LEFT JOIN movies m ON n.related_movie_id = m.id
WHERE n.user_id = ?
ORDER BY n.created_at DESC
LIMIT 20;

-- Mark notification as read
UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?;

-- Create notification
INSERT INTO notifications (user_id, title, message, type, related_movie_id, related_investment_id)
VALUES (?, ?, ?, ?, ?, ?);

-- =============================================
-- ANALYTICS QUERIES
-- =============================================

-- Top performing movies by funding percentage
SELECT 
    m.id,
    m.title,
    m.total_amount,
    m.invested_amount,
    ROUND((m.invested_amount / m.total_amount) * 100, 2) as funding_percentage,
    COUNT(DISTINCT i.investor_id) as investor_count,
    u.username as creator_name
FROM movies m
LEFT JOIN investments i ON m.id = i.movie_id AND i.payment_status = 'completed'
LEFT JOIN users u ON m.creator_id = u.id
WHERE m.project_status IN ('active', 'funded')
GROUP BY m.id
ORDER BY funding_percentage DESC
LIMIT 10;

-- Recent investments
SELECT 
    i.total_amount,
    i.investment_date,
    m.title as movie_title,
    u.username as investor_name
FROM investments i
JOIN movies m ON i.movie_id = m.id
JOIN users u ON i.investor_id = u.id
WHERE i.payment_status = 'completed'
ORDER BY i.investment_date DESC
LIMIT 10;

-- Monthly investment trends
SELECT 
    DATE_FORMAT(i.investment_date, '%Y-%m') as month,
    COUNT(i.id) as investment_count,
    SUM(i.total_amount) as total_amount
FROM investments i
WHERE i.payment_status = 'completed'
    AND i.investment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(i.investment_date, '%Y-%m')
ORDER BY month;

-- =============================================
-- SECURITY QUERIES
-- =============================================

-- Create user session
INSERT INTO user_sessions (user_id, session_token, expires_at, ip_address, user_agent)
VALUES (?, ?, ?, ?, ?);

-- Validate session
SELECT u.id, u.username, u.role
FROM user_sessions s
JOIN users u ON s.user_id = u.id
WHERE s.session_token = ? 
    AND s.expires_at > CURRENT_TIMESTAMP 
    AND s.is_active = TRUE
    AND u.is_active = TRUE;

-- Invalidate session
UPDATE user_sessions SET is_active = FALSE WHERE session_token = ?;

-- Clean expired sessions
DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;