
# 🟩 Backend README (`backend/README.md`)

```markdown
# Matchkin Chat – Backend

A secure, real-time chat backend using **Node.js, Express, Socket.IO, and MongoDB Atlas**.  
Handles OTP authentication, JWT session management, and real-time chat broadcasting.

---

## 🚀 Features

- OTP-based authentication (email-only, no passwords)
- JWT-based session management
- Real-time chat with Socket.IO
- MongoDB Atlas for persistent message storage
- CORS and security best practices

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://github.com/motdotla/dotenv) for config

---

## 🔧 Setup & Run Locally

1. **Clone the repo:**
   ```
   git clone https://github.com/yourusername/matchkin-chat-backend.git
   cd matchkin-chat-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   ```
   PORT=8000
   MONGO_URI=mongodb+srv://:@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt
   OTP_TTL=300
   ```

4. **Start the server:**
   ```
   npm run dev
   ```
   or
   ```
   node src/app.js
   ```

---

## 🌐 API Endpoints

- `POST /api/auth/send-otp`  
  `{ email }` → sends OTP to email (console log in dev)
- `POST /api/auth/verify-otp`  
  `{ email, otp }` → returns `{ token }` (JWT)

---

## ⚡ WebSocket Events

- `chat_message` (send/receive messages)
- `chat_history` (receive chat history on connect)

---

## 📁 Folder Structure

```
src/
  models/      # Mongoose models (User, Message)
  routes/      # Express routes (auth)
  utils/       # OTP, JWT helpers
  socket.js    # Socket.IO logic
  app.js       # Main server entry
  config.js    # Env/config loader
```
