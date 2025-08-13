# 📚 LIBRARY MANAGEMENT API — B5A3 ASSIGNMENT

This is an API for managing a Library System, built using **Express.js**, **TypeScript**, **MongoDB**, and **Mongoose**.  
It supports managing books, borrowing operations, validations, filtering, and more — according to specific assignment guidelines.



## 📦 Tech Stack
- Node.js + Express.js
- TypeScript
- MongoDB with Mongoose
- Zod
- RESTful API principles



## 🔧 Installation & Setup

git clone https://github.com/Apollo-Level2-Web-Dev/B5A3.git
cd B5A3
npm install
npm run dev
Make sure you have a .env file with:

MONGODB_URI=your-mongodb-uri
PORT=5000
📘 API Features
📗 Book Schema Fields
title (string) — required

author (string) — required

genre (string) — required; must be one of: Fiction, Non-fiction, Science, History, Biography

isbn (string) — required; must be unique

copies (number) — required; must be a non-negative integer

available (boolean) — optional; defaults to true

Mongoose Features:

Schema validation

Custom static/instance methods

Middleware (pre or post) logic

📘 Borrow Schema Fields
book (ObjectId) — references Book

quantity (number) — required

dueDate (date) — required

Logic:

Ensures that borrowing a book reduces available copies

Prevents borrowing more than available

🚀 API Endpoints
Books
Method	Endpoint	Description
POST	/api/books	Create a new book
GET	/api/books	Get all books
GET	/api/books/:id	Get single book by ID
PATCH	/api/books/:id	Update book by ID
DELETE	/api/books/:id	Delete book by ID

✅ Supports filtering (by genre, author, etc.), pagination, and sorting.

Borrowing
Method	Endpoint	Description
POST	/api/borrow	Borrow a book
GET	/api/borrow	List all borrow records

⚙️ Functional Requirements
✅ Mongoose schema-level validation

✅ Custom static/instance method

✅ Mongoose middleware (pre, post)

✅ Error handling and proper response format

✅ Aggregation pipeline for advanced querying

✅ Filtering and search by genre/author/etc.

❗ Error Response Format

{
  "success": false,
  "message": "Validation Error",
  "error": {
    "issues": [
      { "field": "title", "message": "Title is required" }
    ]
  }
}

📄 License
This project is for academic use only under the Apollo Level 2 Web Development course.
All rights reserved.

👨‍🏫 Assignment Guidelines Followed
Field validations (Zod/Mongoose)

Business logic for copies and borrowing

Middleware + methods in Mongoose

Filtering & aggregation pipeline

RESTful endpoints and response structure

🤝 Contributing
This is an educational project. Pull requests are not expected unless collaborating for learning purposes.

