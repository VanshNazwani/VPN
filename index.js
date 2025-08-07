// app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes    from './routes/login.routes.js';
import registerRoutes from './routes/register.routes.js'; // Assuming you have a register route
import emailRoutes   from './routes/emailTemplate.routes.js';
import lectureRoutes from './routes/lecture.routes.js';
import { authenticate } from './middleweare/auth.middleware.js';
import mailServerRoutes from './routes/mail.server.routes.js';


const app = express();

// ── Global Middlewares ────────────────────────────────────────────────────────
// Enable CORS for all origins
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded bodies (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', emailRoutes);       // Email template management

// ── Public Routes (no auth required) ─────────────────────────────────────────
app.use('/', registerRoutes);       // Mount register route

// ── Public Routes (no auth required) ─────────────────────────────────────────
app.use('/', authRoutes);   // mounts /login, /forgot-password, /reset-password

// ── Protect all routes below this line ────────────────────────────────────────
app.use(authenticate);     // Any subsequent route requires a valid JWT

// ── Protected Routes ─────────────────────────────────────────────────────────

app.use('/', lectureRoutes);   // Lecture CRUD
app.use('/',mailServerRoutes);

export default app;
