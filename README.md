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
