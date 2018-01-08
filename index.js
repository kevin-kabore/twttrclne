require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var authRoutes = require('./routes/auth');
var messagesRoutes = require('./routes/messages');
var auth = require('./middleware/auth');
var db = require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.json({ message: 'Make a POST requst to /api/auth/signup to signup' });
});

app.use(
  '/api/users/:id/messages',
  auth.loginRequired,
  auth.ensureCorrectUser,
  messagesRoutes
);
app.use('/api/auth', authRoutes);
app.get('/api/messages', function(req, res, next) {
  db.Message
    .find()
    .sort({ createAt: 'desc' })
    .populate('userId', { username: true, profileImageUrl: true })
    .then(function(messages) {
      res.json(messages);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

////////////////////////////////////
// Client Routing in production ////
////////////////////////////////////
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js or main.css file in client build
  app.use(express.static('warbler-client/build'));

  // Express will serve up the index.html
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'warbler-client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
  console.log(`Server is listening on port ${PORT}...`);
});
