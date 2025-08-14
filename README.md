# 📚 Library Management API — B5A3 Assignment

An API for managing a **Library System** built using **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**.  
Supports **books management**, **borrowing system**, validations, filtering, and more — according to assignment requirements.

---

## 🛠 Tech Stack
- **Backend Framework:** Node.js + Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose
- **Validation:** Zod
- **Architecture:** RESTful API

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Mahedi-5g/L2Assignment_3
cd L2Assignment_3
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the project root:
```
MONGODB_URI=your-mongodb-uri
PORT=5000
```

### 4️⃣ Run in Development Mode
```bash
npm run dev
```

### 5️⃣ Build for Production
```bash
npm run build
npm start
```

---

## 📘 API Documentation

### 📗 **Book Schema Fields**
| Field       | Type     | Required | Notes |
|-------------|----------|----------|-------|
| title       | string   | ✅       | Book title |
| author      | string   | ✅       | Author name |
| genre       | string   | ✅       | One of: Fiction, Non-fiction, Science, History, Biography |
| isbn        | string   | ✅       | Unique |
| copies      | number   | ✅       | Must be ≥ 0 |
| available   | boolean  | ❌       | Defaults to `true` |

---

### 📘 **Borrow Schema Fields**
| Field       | Type     | Required | Notes |
|-------------|----------|----------|-------|
| book        | ObjectId | ✅       | References Book |
| quantity    | number   | ✅       | Must be ≤ available copies |
| dueDate     | date     | ✅       | Borrow return date |

**Logic:**
- Borrowing decreases available copies.
- Prevents borrowing more than available stock.

---

## 🚀 API Endpoints

### 📚 **Books**
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/api/books`     | Create a new book |
| GET    | `/api/books`     | Get all books |
| GET    | `/api/books/:id` | Get book by ID |
| PATCH  | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

✅ Supports **filtering**, **pagination**, and **sorting**.

---

### 📖 **Borrowing**
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST   | `/api/borrow`  | Borrow a book |
| GET    | `/api/borrow`  | List all borrow records |

---

## ❗ Error Response Format
```json
{
  "success": false,
  "message": "Validation Error",
  "error": {
    "issues": [
      { "field": "title", "message": "Title is required" }
    ]
  }
}
```

---

## 👨‍🏫 Assignment Requirements Covered
- ✅ Field validations (Zod + Mongoose)
- ✅ Business logic for copies & borrowing
- ✅ Mongoose middleware (pre, post)
- ✅ Custom static/instance methods
- ✅ Filtering & aggregation pipeline
- ✅ Proper REST API structure & error handling

---

## 📜 License
This project is for **academic purposes** under the Apollo Level 2 Web Development course.  
All rights reserved.
