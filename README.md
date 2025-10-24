# CSV → JSON → PostgreSQL API (Kelp Global Assignment)

## Overview
This Node.js application reads a CSV file, converts each row into a JSON object, and inserts the data into a PostgreSQL database. It also calculates the age distribution of all users and prints it to the console.

## Features
- Custom CSV parser (no external CSV libraries used)
- Handles nested properties using dot notation (e.g., `name.firstName`, `address.city`)
- Mandatory fields mapped to DB columns:
  - `name` = `firstName + lastName`
  - `age` → integer
- Nested properties like `address.*` stored as JSONB
- All other fields stored in `additional_info` JSONB
- Age distribution calculated for:
  - `<20`, `20-40`, `40-60`, `>60`
- Configurable CSV path and database via `.env`
- ES Modules style (import/export)
- Express.js API with `/upload` and `/health` endpoints

## Setup Instructions
1. Extract the ZIP to your preferred folder.
2. Open a terminal in the project root.
3. Install dependencies:
   ```bash
   npm install


4. Configure environment variables

  Create .env from .env.example:

  copy .env.example .env    # Windows
  # or
  cp .env.example .env      # macOS/Linux


  Update .env with your PostgreSQL credentials:
  ```bash
  PORT=5000
  CSV_PATH=./data/users.csv
  DATABASE_URL=postgresql://postgres:YourPassword@localhost:5432/kelpdb


Replace username, password, host, and port if different.

5. Ensure PostgreSQL is running

  Create the database kelpdb if it doesn’t exist:
  ```bash
  CREATE DATABASE kelpdb;


  Confirm connection with:
    ```bash
    node test-db.js

6. Start the application
  ```bash
  npm start


The API will run on http://localhost:5000

7. Use the API

Upload CSV:
Open your browser and navigate to:

http://localhost:5000/upload


This will:
Read data/users.csv
Parse each row into JSON
Insert into users table
Print age distribution to console

Health Check:
http://localhost:5000/health

Project Structure
```bash
  csv-json-api/
  │
  ├── src/
  │   ├── app.js           # Express server
  │   ├── db.js            # PostgreSQL connection
  │   ├── parser.js        # Custom CSV parser
  │   └── utils.js         # Insert & age distribution functions
  │
  ├── data/
  │   └── users.csv        # Sample CSV file
  ├── .env                 # Your local credentials (ignored in Git)
  ├── .env.example         # Placeholder credentials for repo
  ├── .gitignore           # Node modules & .env ignored
  ├── README.md            # Project documentation
  ├── package.json
  └── package-lock.json


Notes

.env contains sensitive info and should not be pushed. Only .env.example is in the repo.

CSV can contain 50,000+ records; parser is optimized for large files.

Nested properties are supported to any depth using dot notation.