# Calculator Microservice

This is a basic calculator microservice built using Node.js and Express. It provides four endpoints for performing basic arithmetic operations: addition, subtraction, multiplication, and division.

---

## Features

- **API Endpoints:**
  - `/add`: Adds two numbers.
  - `/substraction`: Subtracts two numbers.
  - `/multi`: Multiplies two numbers.
  - `/division`: Divides two numbers (handles division by zero).

- **Error Handling:** Returns error messages for invalid inputs (non-numeric values) and division by zero.

- **Logging:** Logs request details and errors using Winston.
  - Logs are stored in `logs/combined.log` and `logs/error.log`.

---

## Getting Started Locally

1. **Clone the repository**
2. Install dependencies:
   ```bash
   npm install
