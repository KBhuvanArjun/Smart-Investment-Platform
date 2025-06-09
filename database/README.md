# Smart Investment Platform Database

This directory contains the complete database schema and setup files for the Smart Investment Platform.

## Files Overview

- `schema.sql` - Complete database schema with tables, relationships, triggers, and views
- `sample_data.sql` - Sample data for testing and development
- `api_queries.sql` - Optimized queries for backend API integration

## Database Setup Instructions

### 1. Prerequisites
- MySQL 8.0 or higher
- XAMPP with MySQL/MariaDB
- phpMyAdmin (optional, for GUI management)

### 2. Setup with XAMPP

1. **Start XAMPP Services**
   ```bash
   # Start Apache and MySQL services in XAMPP Control Panel
   ```

2. **Access MySQL**
   ```bash
   # Via phpMyAdmin: http://localhost/phpmyadmin
   # Or via MySQL command line
   mysql -u root -p
   ```

3. **Create Database and Import Schema**
   ```sql
   -- Execute the schema.sql file
   source /path/to/database/schema.sql;
   
   -- Or copy and paste the contents of schema.sql into phpMyAdmin SQL tab
   ```

4. **Import Sample Data**
   ```sql
   -- Execute the sample_data.sql file
   source /path/to/database/sample_data.sql;
   ```

### 3. Database Configuration

Update your application's database configuration:

```javascript
// Example configuration for Node.js
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'smart_investment_platform',
  port: 3306
};
```

## Database Schema Overview

### Core Tables

1. **users** - Stores creator and investor accounts
2. **movies** - Project information and funding details
3. **investments** - Investment transactions
4. **project_categories** - Project type classifications
5. **payment_transactions** - Payment processing records
6. **notifications** - User notifications
7. **user_sessions** - Authentication sessions
8. **investment_history** - Audit trail for investments

### Key Features

- **Automatic Calculations**: Available stocks calculated automatically
- **Triggers**: Auto-update invested amounts and create notifications
- **Views**: Pre-built queries for common data needs
- **Stored Procedures**: Optimized operations for investments
- **Indexes**: Performance optimization for common queries

### Sample Users for Testing

| Username | Email | Password | Role |
|----------|-------|----------|------|
| creator1 | creator@test.com | password | creator |
| investor1 | investor@test.com | password | investor |

*Note: In production, passwords should be properly hashed*

## API Integration

The `api_queries.sql` file contains optimized queries for:

- User authentication
- Movie/project management
- Investment processing
- Dashboard data
- Analytics and reporting
- Security operations

## Security Considerations

1. **Password Hashing**: Use bcrypt or similar for password hashing
2. **SQL Injection**: Use parameterized queries
3. **Session Management**: Implement proper session handling
4. **Data Validation**: Validate all inputs before database operations
5. **Access Control**: Implement role-based access control

## Maintenance

### Regular Tasks

1. **Clean expired sessions**:
   ```sql
   DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;
   ```

2. **Update AI analysis data**:
   ```sql
   -- Update AI risk scores and analysis data periodically
   ```

3. **Archive old data**:
   ```sql
   -- Archive completed projects and old transactions
   ```

### Backup

```bash
# Create database backup
mysqldump -u root -p smart_investment_platform > backup.sql

# Restore from backup
mysql -u root -p smart_investment_platform < backup.sql
```

## Performance Optimization

- Indexes are created for frequently queried columns
- Views provide optimized data access patterns
- Stored procedures reduce network overhead
- Triggers maintain data consistency automatically

## Troubleshooting

### Common Issues

1. **Connection refused**: Check if MySQL service is running in XAMPP
2. **Access denied**: Verify username/password and user privileges
3. **Table doesn't exist**: Ensure schema.sql was executed successfully
4. **Foreign key constraints**: Check data integrity and relationships

### Useful Commands

```sql
-- Check database status
SHOW DATABASES;
USE smart_investment_platform;
SHOW TABLES;

-- Check table structure
DESCRIBE users;
DESCRIBE movies;
DESCRIBE investments;

-- View sample data
SELECT * FROM movie_investment_summary LIMIT 5;
SELECT * FROM investor_portfolio LIMIT 5;
```

## Next Steps

1. Integrate with your backend API using the provided queries
2. Implement proper authentication and session management
3. Add data validation and error handling
4. Set up automated backups
5. Monitor performance and optimize as needed

For production deployment, consider:
- Setting up proper user accounts with limited privileges
- Implementing SSL/TLS for database connections
- Setting up replication for high availability
- Implementing proper logging and monitoring