# 🚗 Car Rental Agency Portal

Welcome to the **Car Rental Agency** Full-Stack Web Application! This system was designed with a focus on real-world practical usage, robust clean architecture, and decoupled technologies.

It serves 2 primary types of users:
1. **Customers**: Can browse available cars and book vehicles for a specific number of days.
2. **Car Rental Agencies**: Can register, manage (add/view/update) their own cars, and view booked cars by customers.

## 🛠 Tech Stack
* **Frontend**: React.js (Modern Functional Components, Context API, Framer Motion for Animations)
* **Backend**: Core PHP 8 (RESTful JSON APIs, PDO for secure queries)
* **Database**: MySQL 

## ⚙️ How to Setup & Run locally (For Evaluator)
This project is configured to run smoothly on an offline **XAMPP / WAMP** server setup.

### Step 1: Database Setup
1. Turn on Apache and MySQL from your XAMPP Control Panel.
2. Open `http://localhost/phpmyadmin` (or `http://localhost:8080/phpmyadmin` depending on your ports).
3. Create a new database named exactly: **`car_rental`**
4. Click on the **Import** tab and upload the `car_rental.sql` file provided in the root of this folder.

### Step 2: Backend Setup
1. Ensure this entire project folder (`car-rental-api`) is moved inside your XAMPP's `htdocs` directory (e.g., `C:\xampp\htdocs\car-rental-api`).
2. *Note: If your Apache runs on a port other than 8080, please adjust the API endpoints in the React `frontend/src/pages/` files.*

### Step 3: Frontend Setup
1. Open a terminal in the main folder and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary Node modules:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The application will launch at `http://localhost:3000`.

## 🛡️ Security & Features Implemented
* **Agency-specific CRUD**: Strict SQL constraints (`agency_id=?`) ensures that an agency can only edit and view cars that belong to them.
* **CORS Handling**: Proper Cross-Origin headers are attached across all PHP endpoints.
* **Relational Database**: Fully normalized SQL schema with `ON DELETE CASCADE` ensuring data integrity if associations are removed.
* **Dynamic Styling**: Clean, modern dark-mode aesthetic with interactive hover micro-animations.
