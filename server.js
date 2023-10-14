const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const maxAge = 1000 * 5;
const sessionObj = {
  secret: 'asdfasff',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: maxAge }),
  cookie: {
    maxAge
  },
};


app.use(session(sessionObj));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/profile', (req, res) => {
    if (req.session.user) {
      const { username } = req.session.user;
      res.send(`환영합니다, ${username}님!`);
    } else {
      res.send('로그인해주세요.');
    }
  });
  

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  fetch('http://0.0.0.0/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id' : username,
      'pwd' : password,
    }),
  })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        req.session.user = {
        username: username,
        // You can include other user-related information here
        };
        // Redirect to /profile on successful login
        res.redirect('/profile');
      })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('err');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
