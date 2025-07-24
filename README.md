# 🛍️ Price Comparison Web App

This is a full-stack price comparison web application built using **React**, **Node.js (Express)**, and **Multer**. It allows users to compare product prices manually entered by the admin across various platforms, including Amazon, Flipkart, and Croma. Admins can upload product images, add multiple purchase links, and input current prices.

---

## 🚀 Features

### 🧑‍💼 User Side:
- Browse products in a **responsive grid layout**.
- Compare prices across Amazon, Flipkart, and Croma (manually entered by admin).
- Click "Buy" links to go directly to the seller's page.
- **Authentication system** with Login/Register functionality.
- View **profile page** with editable profile picture and account info.

### 🛠️ Admin Side:
- Secure **Admin Dashboard** (`admin` / `admin123`) with:
  - Product image upload
  - Name and description entry
  - Add multiple platforms (Amazon, Flipkart, etc.)
  - Manually enter links and prices
- Products are stored in localStorage and displayed in real-time.
- Uploads are saved on the backend and referenced via URLs.

---

## 🧑‍💻 Tech Stack

| Technology | Usage |
|------------|-------|
| React | Frontend UI |
| Express | Backend server |
| Multer | Image uploads |
| Node.js | Runtime |
| LocalStorage | Temporary product storage |
| React Router | Routing |
| CSS | Styling (no Tailwind used) |

---

## 🔐 Admin Access

Use these credentials to access the Admin Dashboard:
Username: admin
Password: admin123

Only the admin can add/edit products.

---

## 📂 Project Structure

├── backend/
│ ├── index.js # Express server
│ ├── uploads/ # Product images uploaded by admin
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── App.jsx
│ └── public/


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/roger-tech-oss/Price-Compare-System.git
cd Price-Compare-System


### 2. Setup Backend
cd backend
npm install
node index.js
The backend will run on http://localhost:5000.

###3. Setup Frontend
cd frontend
npm install
npm start

The React app will run on http://localhost:3000.


👨‍🎓 About
This project was created as a college final-year project to showcase:
Admin vs. user interface separation
Manual multi-platform price comparison
Image upload handling
React and Express integration

📜 License
MIT License. You are free to fork, contribute, and learn from it!


---

Let me know if you'd like help writing the `LICENSE` file, pushing the `README.md` to your GitHub repo, or generating screenshots to go with it!
