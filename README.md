# 🏫 School Management System (Backend)

A complete backend system for managing school operations including students, classes, attendance, fees, and analytics. Built using Node.js and MongoDB with secure authentication and role-based access.

---

## 🚀 Features

* 🔐 Authentication (JWT + Cookies)
* 👥 Role-Based Access (Admin / Student)
* 🎓 Student Management (CRUD)
* 🏫 Class Management (Create & Manage Classes)
* 📊 Attendance System (Daily Tracking)
* 💰 Fees Management (Payment Tracking)
* 📈 Dashboard Analytics (Real-time Stats)

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Cookie Parser

---

## 📂 API Endpoints

---

### 🔐 Auth APIs

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user

---

### 🏫 Class APIs

* `POST /api/class/create` → Create class (Admin)
* `GET /api/class/all` → Get all classes
* `GET /api/class/:id` → Get single class
* `PUT /api/class/:id` → Update class
* `DELETE /api/class/:id` → Delete class

---

### 🎓 Student APIs

* `POST /api/student/create` → Create student (Admin)
* `GET /api/student/all` → Get all students
* `GET /api/student/:id` → Get single student
* `PUT /api/student/:id` → Update student
* `DELETE /api/student/:id` → Delete student

---

### 📊 Attendance APIs

* `POST /api/attendance` → Mark attendance (Admin)
* `GET /api/attendance/:studentId` → Get student attendance
* `GET /api/attendance/date?date=YYYY-MM-DD` → Get attendance by date

---

### 💰 Fees APIs

* `POST /api/fees` → Create fees (Admin)
* `GET /api/fees/:studentId` → Get student fees
* `PUT /api/fees/pay/:id` → Pay fees
* `GET /api/fees` → Get all fees (Admin)

---

### 📈 Dashboard API

* `GET /api/dashboard` → Get system stats (Admin)

---

## ⚙️ Installation & Setup

```bash
git clone <your-repo-link>
cd school-management-system
npm install
npm run dev
```


## 🧪 Testing

Use Postman or any API client to test endpoints.

Flow:

1. Register Admin
2. Login
3. Create Class
4. Create Student
5. Mark Attendance
6. Create Fees
7. Pay Fees
8. View Dashboard

---



---

## 👨‍💻 Author

**Amir Hassan**
Backend Developer (Node.js)

---
