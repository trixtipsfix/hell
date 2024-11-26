const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const qs = require('querystring');

const app = express();
const PORT = 3002;
const db = new sqlite3.Database('./database.db');

// Middleware to parse URL-encoded form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up SQLite table for logging requests, with a unique log_id for each entry
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS requests (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    method TEXT,
    file_path TEXT,
    params TEXT,
    useragent TEXT
  )`);
});

// Serve HTML form for input
app.get('/webhook', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Handle form submission and log POST request
app.post('/webhook/submit', (req, res) => {
  const htmlContent = req.body.htmlContent;
  const fileId = uuidv4();
  const filePath = `/app/webhooks/${fileId}.html`;

  // Format POST parameters as a query string
  const params = Object.keys(req.body).length
    ? `?${qs.stringify(req.body)}`
    : '';

  // Save HTML content to a file
  fs.writeFile(filePath, htmlContent, (err) => {
    if (err) {
      return res.status(500).send('Error saving file');
    }

    // Log the POST request
    db.run(`INSERT INTO requests (id, method, file_path, params) VALUES (?, 'POST', ?, ?)`, [fileId, filePath, params], (err) => {
      if (err) {
        return res.status(500).send('Error logging request');
      }

      // Redirect to the saved HTML file
      res.redirect(`/webhook/view/${fileId}`);
    });
  });
});

// Serve the saved HTML file and log GET request parameters
app.get('/webhook/view/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = `/app/webhooks/${fileId}.html`;

  // Format GET parameters as a query string
  const params = Object.keys(req.query).length
    ? `?${qs.stringify(req.query)}`
    : '';

  if (fs.existsSync(filePath)) {
    // Log the GET request with unique log_id
    db.run(`INSERT INTO requests (id, method, file_path, params,useragent) VALUES (?, 'GET', ?, ?,?)`, [fileId, filePath, params,req.headers['user-agent']], (err) => {
      if (err) {
        console.error('Error logging view request');
      }
    });

    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.post('/webhook/view/:id', (req, res) => {
    const fileId = req.params.id;
    const filePath = `/app/webhooks/${fileId}.html`;
  
    // Format GET parameters as a query string
    const params = Object.keys(req.body).length
      ? `?${qs.stringify(req.body)}`
      : '';
    console.log(params);
    if (fs.existsSync(filePath)) {
      // Log the GET request with unique log_id
      db.run(`INSERT INTO requests (id, method, file_path, params,useragent) VALUES (?, 'POST', ?, ?,?)`, [fileId, filePath, params,req.headers['user-agent']], (err) => {
        if (err) {
          console.error('Error logging view request');
        }
      });
  
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });


// Display request logs with formatted HTTP parameters
app.get('/webhook/logs', (req, res) => {
  db.all(`SELECT * FROM requests ORDER BY timestamp DESC`, (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving logs');
    }

    res.send(`<h2>Request Logs</h2><ul>` +
      rows.map(row => `
        <li>
          ${row.timestamp} (${row.method}): 
          <a href="/webhook/logs/${row.log_id}">${row.file_path}${row.params}</a>
        </li>`).join('') +
      `</ul><a href="/webhook">Back to Form</a>`);
  });
});

// Display detailed information about a specific request
app.get('/webhook/logs/:log_id', (req, res) => {
  const logId = req.params.log_id;
  
  db.get(`SELECT * FROM requests WHERE log_id = ?`, [logId], (err, row) => {
    if (err) {
      return res.status(500).send('Error retrieving log details');
    }

    if (row) {
      res.send(`<h2>Request Details</h2>
        <p><strong>Timestamp:</strong> ${row.timestamp}</p>
        <p><strong>Method:</strong> ${row.method}</p>
        <p><strong>File Path:</strong> ${row.file_path}</p>
        <p><strong>Parameters:</strong> ${row.params}</p>
        <p><strong>User Agent:</strong> ${row.useragent}</p>
        <a href="/webhook/logs">Back to Logs</a>`);
    } else {
      res.status(404).send('Log not found');
    }
  });
});

// Start server on port 3002 and bind to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
