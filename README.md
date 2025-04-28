# Travel Assistant

A full-stack travel planning web application built with **React**, **Node.js**, **Express**, **Sequelize ORM**, and **PostgreSQL**. This app allows users to register, login, create trips, add transports, and manage their travel plans efficiently.

---

## Project Structure

```
Travel-Assistant/
├── client/                  # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── TripList.tsx
│   │   │   ├── TripForm.tsx
│   │   │   └── TransportForm.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── setupProxy.js
│   └── package.json
├── server/                   # Backend (Node.js + Express)
│   └── src/
│       └── controllers/
│           └── authController.ts
│           └── tripController.ts
│       └── models/
│           └── User.ts
│           └── Trip.ts
│           └── Transport.ts
│       └── routes/
│           └── authRoutes.ts
│           └── tripRoutes.ts
│       └── middleware/
│           └── authMiddleware.ts
│       └── database.ts
│       └── app.ts
│   └── package.json
├── README.md
└── .env (for environment variables)
```

---

## Component Hierarchy (Frontend)

```
<App>
 └── <AuthPage /> (for login/register)
 └── <TripList /> (list of trips)
     └── <TripForm /> (form to add a new trip)
         └── <TransportForm /> (nested transport details)
```

---

## API Routes (Backend)

| Route | Method | Description |
| :--- | :--- | :--- |
| /api/auth/register | POST | Register a new user |
| /api/auth/login | POST | User login |
| /api/auth/logout | POST | Logout user |
| /api/trips/latest | GET | Get the latest trip for a user |
| /api/trips/ | POST | Create a new trip |

---

## Challenges Faced

### 1. Proxy Configuration Issue
- Initially, the frontend React app failed to forward `/api` calls to the backend Express server, causing 404 errors.
- **Solution**: Properly created a `setupProxy.js` using `http-proxy-middleware` to solve cross-origin API routing.

### 2. Sequelize Validation Errors
- While saving transport details, invalid `time` fields (empty strings) caused `SequelizeDatabaseError: invalid input syntax for type time`.
- **Solution**: Added backend validation to ensure time fields are properly formatted before inserting into the database.

### 3. Session Management
- Managing JWT tokens securely in `httpOnly` cookies required careful cookie configuration.
- **Solution**: Used `secure` and `sameSite` settings appropriately based on environment.

### 4. Database Syncing
- Sequelize `.sync()` needed to be handled carefully to avoid accidentally resetting production data.
- **Solution**: Only enable `{ force: true }` in dev environment carefully.

### 5. TypeScript Type Safety
- Ensuring strong typing in Express request handlers (`req: Request, res: Response`) added extra complexity.
- **Solution**: Defined clear models and interfaces for requests/responses to minimize type errors.

---

## Setup Instructions

1. Clone the repository:
```bash
 git clone https://github.com/Dhairuu/Travel-Assistant.git
```
2. Install server dependencies:
```bash
 cd server
 npm install
```
3. Install client dependencies:
```bash
 cd client
 npm install
```
4. Create a `.env` file in `server/`:
```bash
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```
5. Run servers:
```bash
# In server/
npm run dev

# In client/
npm start
```

---

## Future Improvements
- Add Google OAuth login.
- Allow trip collaborators (multi-user trip planning).
- Better UI with Tailwind CSS or Material UI.
- Add unit & integration tests (Jest, Supertest).

---


