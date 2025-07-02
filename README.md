# Price Tracker System

## Project Overview
The **Price Tracker System** is a full-stack web application that allows users to **track product prices, store historical price changes, and receive email alerts when a price drops**. The system **automatically updates prices every 10 minutes** using web scraping and Node-Cron.

---

## Features
 **User Authentication** – Secure login & signup with JWT authentication.  
 **Track Product Prices** – Add and monitor products with live price updates.  
**Price Drop Alerts** – Email notifications when a product’s price drops.  
 **Automatic Price Updates** – Web scraping every 10 minutes using Node-Cron.  
 **RESTful API** – Secure API endpoints for managing users & products.  
 **Responsive UI** – Built with React.js for a seamless experience.  

---

## Tech Stack
### **Frontend**  
- React.js (Hooks & Context API)  
- Axios (for API requests)  
- React Router (for navigation)  
- Tailwind CSS / Material UI (for styling)  

### **Backend**  
- Node.js (runtime environment)  
- Express.js (backend framework)  
- MongoDB & Mongoose (database & ODM)  
- JWT Authentication (secure user login)  

### **Other Technologies**  
- Cheerio & Axios (for web scraping)  
- Node-Cron (for automatic price updates)  
- Nodemailer (for email notifications)  

---

##  Installation & Setup
###  1. Clone the Repository
```sh
git clone https://github.com/shriram-8teen/price-tracker.git
cd price-tracker
