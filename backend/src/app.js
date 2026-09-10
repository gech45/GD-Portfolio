const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { pool } = require('./db');

const app = express();

const sessions = new Set();
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';
const isProduction = process.env.NODE_ENV === 'production';
const uploadsDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDirectory, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDirectory,
    filename: (req, file, callback) => {
      const extension = path.extname(file.originalname).toLowerCase();
      callback(null, `${crypto.randomUUID()}${extension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    callback(null, file.mimetype.startsWith('image/'));
  },
});

function getSessionToken(req) {
  const cookie = req.headers.cookie || '';
  return cookie.split(';').map((item) => item.trim())
    .find((item) => item.startsWith('portfolio_session='))?.split('=')[1];
}

function requireAuth(req, res, next) {
  if (!sessions.has(getSessionToken(req))) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
}

app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(uploadsDirectory));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.add(token);
  const cookiePolicy = isProduction ? 'SameSite=None; Secure' : 'SameSite=Lax';
  res.setHeader('Set-Cookie', `portfolio_session=${token}; HttpOnly; ${cookiePolicy}; Path=/`);
  res.json({ message: 'Logged in' });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  sessions.delete(getSessionToken(req));
  res.setHeader('Set-Cookie', 'portfolio_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
  res.json({ message: 'Logged out' });
});

app.get('/api/projects', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT id, project_number AS number, name, type, description, color, image,
      app_link AS appLink, github_link AS githubLink
    FROM projects ORDER BY project_number
  `);
  res.json(rows);
});

app.post('/api/projects', requireAuth, upload.single('image'), async (req, res) => {
  const { number = '', name, type, description, color = 'blue', appLink = '', githubLink = '' } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  const project = { id: crypto.randomUUID(), number, name, type, description, color, image, appLink, githubLink };
  await pool.execute(
    `INSERT INTO projects (id, project_number, name, type, description, color, image, app_link, github_link)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [project.id, project.number, project.name, project.type, project.description, project.color, project.image, project.appLink, project.githubLink],
  );
  res.status(201).json(project);
});

app.put('/api/projects/:id', requireAuth, upload.single('image'), async (req, res) => {
  const { number = '', name, type, description, color = 'blue', appLink = '', githubLink = '' } = req.body;
  const [existingProjects] = await pool.execute('SELECT image FROM projects WHERE id = ?', [req.params.id]);
  if (!existingProjects.length) return res.status(404).json({ message: 'Project not found' });
  const image = req.file ? `/uploads/${req.file.filename}` : existingProjects[0].image || '';
  const [result] = await pool.execute(
    `UPDATE projects SET project_number = ?, name = ?, type = ?, description = ?, color = ?, image = ?, app_link = ?, github_link = ? WHERE id = ?`,
    [number, name, type, description, color, image, appLink, githubLink, req.params.id],
  );
  if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' });
  res.json({ id: req.params.id, number, name, type, description, color, image, appLink, githubLink });
});

app.delete('/api/projects/:id', requireAuth, async (req, res) => {
  const [result] = await pool.execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' });
  res.status(204).send();
});

module.exports = app;