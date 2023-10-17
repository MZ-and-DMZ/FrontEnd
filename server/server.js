const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.json());
const cors = require('cors');
app.use(cors());
const fs = require('fs');
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    }
);

app.get('/api/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'apiList.json'))
  });

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@gmail.com' && password === 'admin') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

    app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
    }
);

