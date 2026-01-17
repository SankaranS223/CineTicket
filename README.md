# 🎬 Movie Ticket Booking System

A **full-stack Movie Ticket Booking application** developed as an **individual project**, implementing **JWT authentication**, **role-based access control**, and a **clean corporate UI**.

This project demonstrates real-world backend and frontend integration using modern technologies.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- BCrypt password encryption
- Role-based authorization

### 👥 User Roles

#### Admin (`ROLE_ADMIN`)
- Login / Logout
- Add movies
- Update movie details
- Delete movies
- View movie list

#### User (`ROLE_USER`)
- Register & Login
- View movies
- Book tickets
- View personal bookings
- Logout

---

## 🛠 Tech Stack

### Backend
- Java  
- Spring Boot  
- Spring Security  
- JWT (JSON Web Token)  
- Spring Data JPA  
- MySQL  

### Frontend
- React (Vite)
- Axios
- React Router
- CSS (Light Corporate Theme)

---

## 🔁 Application Flow

1. User lands on Login page  
2. New user → Register  
3. After login:
   - Admin → Admin Dashboard
   - User → User Dashboard
4. User selects a movie → books tickets → views booking history  

---

## 🗄 Database Schema

### users
- id
- username (unique)
- password (BCrypt encrypted)
- role

### movies
- id
- title
- genre
- duration
- rating

### bookings
- id
- user_id (FK)
- movie_id (FK)
- tickets
- status

---

## 🔐 Security Details
- Stateless JWT authentication
- Role-based endpoint protection
- No session storage
- Secure password hashing using BCrypt

---

## ⚙️ Setup & Installation

### Backend
1. Create MySQL database (e.g., `movie_booking`)
2. Update `application.properties`
3. Run Spring Boot application
4. Tables are auto-generated using JPA

### Frontend
```bash
npm install
npm run dev
