
### ✅ `README.md` — For Backend Repo [`backend_matchkin`](https://github.com/Suvanshhh/backend_matchkin)

* ✅ Node.js + Express backend
* ✅ Redis for OTP with TTL
* ✅ JWT for authentication
* ✅ MongoDB for message/user storage
* ✅ WebSocket/Socket.IO for real-time messaging
* ✅ Deployed (Railway assumed)

---

```markdown
# 🧠 Matchkin Chat – Backend

This repository contains the **Node.js + Express** backend for the Matchkin real-time chat application.  
It features OTP-based login, secure JWT authentication, real-time messaging via WebSocket, and data persistence using MongoDB.

---

## ⚙️ Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Backend      | Express.js (Node.js)        |
| Authentication | JWT                        |
| OTP Cache    | Redis (with TTL support)    |
| Database     | MongoDB Atlas               |
| Real-time    | WebSocket via Socket.IO     |
| Deployment   | Railway                     |

---

## 🧩 Features

- ✅ OTP-based email login (Redis TTL for expiry)
- ✅ JWT-based secure authentication
- ✅ Real-time chat (Socket.IO WebSocket integration)
- ✅ MongoDB-based message and user storage
- ✅ Easily extensible to support groups, media, and more

---

## 📁 Project Structure

```

backend\_matchkin/
├── controllers/        # OTP, Auth, Message logic
├── models/             # MongoDB schemas
├── routes/             # API routes (auth, messages)
├── utils/              # JWT, Redis utils
├── socket/             # Real-time logic
├── .env                # Environment configuration
├── server.js           # Express app entry point
└── package.json

````

---

## 🧪 API Reference

### 🔹 `POST /send-otp`

**Description:** Sends an OTP to the provided email (simulated via console)

```json
{
  "email": "test@example.com"
}
````

Response:

```json
{ "msg": "OTP sent to email (console)" }
```

---

### 🔹 `POST /verify-otp`

**Description:** Verifies OTP and returns JWT token on success.

```json
{
  "email": "test@example.com",
  "otp": "123456"
}
```

Response:

```json
{
  "access_token": "<JWT_TOKEN>"
}
```

Use this `JWT` in the `Authorization: Bearer <token>` header.

---

### 🔹 `WebSocket`

**Endpoint:**

```
ws://your-domain/ws/chat?token=JWT_TOKEN
```

After verification, the server establishes a real-time Socket.IO connection and allows sending/receiving messages.

---

## 🔧 Environment Variables

Create a `.env` file in the root:

```env
MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
JWT_SECRET=your_jwt_secret
```

---

## ▶️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Suvanshhh/backend_matchkin.git
cd backend_matchkin
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Redis Locally (if not using cloud)

```bash
redis-server
```

Or use [Redis UI](https://redis.io/docs/ui/) / Railway-hosted Redis and update `.env`.

### 4. Run the Server

```bash
node server.js
```

Server runs at:
`http://localhost:5000` or your specified port.

---

## 📬 Postman Collection

You can test the OTP and Auth flow using Postman.
👉 (Include link here if uploaded to GitHub or exported JSON)

---

## 🌐 Deployment

The app is ready to be deployed on **Railway**.

Make sure:

* Redis and MongoDB URIs are updated in `.env`
* Railway variables are properly configured

---

## ✅ Status

* [x] OTP Login (via Redis)
* [x] JWT Auth Middleware
* [x] Real-time Chat via WebSocket
* [x] MongoDB Storage
* [ ] Group Chat Support *(coming soon)*

