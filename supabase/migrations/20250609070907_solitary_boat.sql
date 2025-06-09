/*
# Additional Sample Data for Smart Investment Platform

This file contains additional sample data to populate the database
with realistic content for testing and development purposes.
*/

USE smart_investment_platform;

-- Insert more sample users
INSERT INTO users (username, email, password_hash, role, first_name, last_name, bio, email_verified) VALUES
('filmmaker_mike', 'mike.filmmaker@test.com', '$2b$10$example_hash_6', 'creator', 'Mike', 'Anderson', 'Documentary filmmaker passionate about social issues.', TRUE),
('producer_lisa', 'lisa.producer@test.com', '$2b$10$example_hash_7', 'creator', 'Lisa', 'Rodriguez', 'Independent producer with focus on emerging talent.', TRUE),
('investor_david', 'david.investor@test.com', '$2b$10$example_hash_8', 'investor', 'David', 'Wilson', 'Tech entrepreneur investing in creative industries.', TRUE),
('investor_emma', 'emma.investor@test.com', '$2b$10$example_hash_9', 'investor', 'Emma', 'Thompson', 'Former entertainment executive turned angel investor.', TRUE),
('director_carlos', 'carlos.director@test.com', '$2b$10$example_hash_10', 'creator', 'Carlos', 'Martinez', 'Award-winning director specializing in Latin American cinema.', TRUE);

-- Insert more sample movies
INSERT INTO movies (title, description, poster_url, director, producer, singer, hero, heroine, category_id, creator_id, total_amount, invested_amount, stock_price, funding_deadline, ai_risk_score, ai_fraud_check, ai_analysis_data) VALUES
('Beyond the Mountains', 'An epic journey through breathtaking landscapes and human resilience.', 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg', 'Alex Turner', 'Lisa Rodriguez', 'Mountain Echo', 'Adventure Hero', 'Mountain Guide', 1, 5, 3000000.00, 2100000.00, 120.00, '2025-03-15', 0.15, TRUE, '{"market_potential": 0.85, "team_experience": 0.90, "budget_realism": 0.80}'),
('The Forgotten Symphony', 'A musical drama about a composer rediscovering their passion.', 'https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg', 'Elizabeth Parker', 'William Harris', 'Classical Master', 'Composer', 'Violinist', 1, 6, 1500000.00, 900000.00, 90.00, '2024-12-20', 0.25, TRUE, '{"market_potential": 0.75, "team_experience": 0.85, "budget_realism": 0.90}'),
('City of Dreams', 'Urban drama exploring the lives of immigrants in a bustling metropolis.', 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg', 'Mark Wilson', 'Jessica Moore', 'Urban Beats', 'Immigrant Worker', 'Social Worker', 1, 7, 2200000.00, 1200000.00, 85.00, '2025-01-30', 0.30, TRUE, '{"market_potential": 0.70, "team_experience": 0.75, "budget_realism": 0.85}'),
('The Last Guardian', 'Fantasy adventure about the last protector of an ancient realm.', 'https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg', 'David Scott', 'Laura Thomas', 'Epic Orchestral', 'Guardian Warrior', 'Mystic Princess', 1, 1, 4000000.00, 1500000.00, 150.00, '2025-04-30', 0.20, TRUE, '{"market_potential": 0.90, "team_experience": 0.95, "budget_realism": 0.75}'),
('Echoes of Yesterday', 'Time-travel thriller with mind-bending plot twists.', 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg', 'Patricia Nelson', 'George Mitchell', 'Temporal Sounds', 'Time Traveler', 'Quantum Physicist', 1, 2, 2800000.00, 1900000.00, 110.00, '2025-02-15', 0.35, TRUE, '{"market_potential": 0.80, "team_experience": 0.80, "budget_realism": 0.70}'),
('Digital Rebellion', 'Cyberpunk web series about hackers fighting corporate control.', 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg', 'Carlos Martinez', 'Tech Productions', 'Cyber Synth', 'Hacker Hero', 'AI Specialist', 4, 10, 800000.00, 320000.00, 40.00, '2024-11-15', 0.40, TRUE, '{"market_potential": 0.85, "team_experience": 0.70, "budget_realism": 0.90}'),
('Nature\'s Voice', 'Environmental documentary about climate change impact.', 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg', 'Mike Anderson', 'Green Films', 'Nature Sounds', 'Narrator', 'Environmental Scientist', 3, 6, 500000.00, 150000.00, 25.00, '2024-12-10', 0.20, TRUE, '{"market_potential": 0.75, "team_experience": 0.85, "budget_realism": 0.95}'),
('Love in the Digital Age', 'Romantic comedy about online dating mishaps.', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', 'Lisa Rodriguez', 'Comedy Central', 'Pop Romance', 'Tech Guy', 'App Developer', 2, 7, 600000.00, 180000.00, 30.00, '2024-11-30', 0.30, TRUE, '{"market_potential": 0.70, "team_experience": 0.80, "budget_realism": 0.85}');

-- Insert more sample investments
INSERT INTO investments (movie_id, investor_id, stock_count, stock_price, total_amount, payment_status, payment_method, roi_percentage) VALUES
-- Beyond the Mountains investments
(6, 8, 5000, 120.00, 600000.00, 'completed', 'wire_transfer', 0.00),
(6, 9, 12500, 120.00, 1500000.00, 'completed', 'bank_transfer', 0.00),
-- The Forgotten Symphony investments
(7, 8, 4000, 90.00, 360000.00, 'completed', 'credit_card', 0.00),
(7, 9, 6000, 90.00, 540000.00, 'completed', 'digital_wallet', 0.00),
-- City of Dreams investments
(8, 3, 5000, 85.00, 425000.00, 'completed', 'bank_transfer', 0.00),
(8, 4, 9118, 85.00, 775000.00, 'completed', 'wire_transfer', 0.00),
-- The Last Guardian investments
(9, 3, 3000, 150.00, 450000.00, 'completed', 'wire_transfer', 0.00),
(9, 8, 7000, 150.00, 1050000.00, 'completed', 'bank_transfer', 0.00),
-- Echoes of Yesterday investments
(10, 4, 8000, 110.00, 880000.00, 'completed', 'wire_transfer', 0.00),
(10, 9, 9273, 110.00, 1020000.00, 'completed', 'bank_transfer', 0.00),
-- Digital Rebellion investments
(11, 8, 4000, 40.00, 160000.00, 'completed', 'credit_card', 0.00),
(11, 9, 4000, 40.00, 160000.00, 'completed', 'digital_wallet', 0.00),
-- Nature's Voice investments
(12, 3, 3000, 25.00, 75000.00, 'completed', 'credit_card', 0.00),
(12, 8, 3000, 25.00, 75000.00, 'completed', 'paypal', 0.00),
-- Love in the Digital Age investments
(13, 4, 3000, 30.00, 90000.00, 'completed', 'credit_card', 0.00),
(13, 9, 3000, 30.00, 90000.00, 'completed', 'digital_wallet', 0.00);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, related_movie_id, related_investment_id) VALUES
(1, 'New Investment Received', 'You received a new investment of $600,000 for "Beyond the Mountains"', 'investment', 6, 9),
(1, 'Funding Milestone Reached', 'Your project "The Last Guardian" has reached 50% funding!', 'funding_complete', 9, NULL),
(2, 'New Investment Received', 'You received a new investment of $880,000 for "Echoes of Yesterday"', 'investment', 10, 17),
(6, 'New Investment Received', 'You received a new investment of $360,000 for "The Forgotten Symphony"', 'investment', 7, 11),
(3, 'Investment Confirmed', 'Your investment of $425,000 in "City of Dreams" has been confirmed', 'investment', 8, 13),
(8, 'Investment Confirmed', 'Your investment of $160,000 in "Digital Rebellion" has been confirmed', 'investment', 11, 19),
(9, 'Portfolio Update', 'Your total portfolio value has increased by 5% this month', 'system', NULL, NULL);

-- Insert more payment transactions
INSERT INTO payment_transactions (investment_id, transaction_type, amount, payment_gateway, gateway_transaction_id, status, processed_at) VALUES
(9, 'investment', 600000.00, 'wire_transfer', 'wire_2234567890', 'completed', '2024-02-15 10:30:00'),
(10, 'investment', 1500000.00, 'bank_transfer', 'bank_3345678901', 'completed', '2024-02-16 14:45:00'),
(11, 'investment', 360000.00, 'stripe', 'txn_4456789012', 'completed', '2024-02-20 09:15:00'),
(12, 'investment', 540000.00, 'square', 'txn_5567890123', 'completed', '2024-02-22 16:20:00'),
(13, 'investment', 425000.00, 'paypal', 'txn_6678901234', 'completed', '2024-03-01 11:00:00'),
(14, 'investment', 775000.00, 'wire_transfer', 'wire_7789012345', 'completed', '2024-03-02 13:30:00'),
(15, 'investment', 450000.00, 'stripe', 'txn_8890123456', 'completed', '2024-03-05 15:45:00'),
(16, 'investment', 1050000.00, 'bank_transfer', 'bank_9901234567', 'completed', '2024-03-06 12:15:00'),
(17, 'investment', 880000.00, 'wire_transfer', 'wire_0012345678', 'completed', '2024-03-10 10:30:00'),
(18, 'investment', 1020000.00, 'bank_transfer', 'bank_1123456789', 'completed', '2024-03-12 14:45:00'),
(19, 'investment', 160000.00, 'stripe', 'txn_2234567890', 'completed', '2024-03-15 09:15:00'),
(20, 'investment', 160000.00, 'square', 'txn_3345678901', 'completed', '2024-03-16 16:20:00'),
(21, 'investment', 75000.00, 'stripe', 'txn_4456789012', 'completed', '2024-03-18 11:00:00'),
(22, 'investment', 75000.00, 'paypal', 'txn_5567890123', 'completed', '2024-03-19 13:30:00'),
(23, 'investment', 90000.00, 'stripe', 'txn_6678901234', 'completed', '2024-03-20 15:45:00'),
(24, 'investment', 90000.00, 'square', 'txn_7789012345', 'completed', '2024-03-21 12:15:00');

-- Update some movies to show different statuses
UPDATE movies SET project_status = 'funded' WHERE id IN (3, 7, 10);
UPDATE movies SET project_status = 'completed' WHERE id IN (1, 2);

-- Add some profit distributions for completed projects
UPDATE investments SET roi_percentage = 15.5, profit_earned = total_amount * 0.155 WHERE movie_id = 1;
UPDATE investments SET roi_percentage = 12.3, profit_earned = total_amount * 0.123 WHERE movie_id = 2;

-- Insert profit distribution transactions
INSERT INTO payment_transactions (investment_id, transaction_type, amount, payment_gateway, status, processed_at) VALUES
(1, 'profit_distribution', 15500.00, 'bank_transfer', 'completed', '2024-03-25 10:00:00'),
(2, 'profit_distribution', 38750.00, 'bank_transfer', 'completed', '2024-03-25 10:05:00'),
(3, 'profit_distribution', 7380.00, 'bank_transfer', 'completed', '2024-03-26 10:00:00'),
(4, 'profit_distribution', 17220.00, 'bank_transfer', 'completed', '2024-03-26 10:05:00');