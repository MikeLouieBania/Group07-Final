const express = require('express');
const router = express.Router();
const session = require('express-session');
const app = express();
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000 // 24 hours
    }
  })
);

/* GET users listing. */
router.get('/user', async function(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/user');
  }
  const users = await prisma.user.findMany();
  res.render('user', { title: 'Users', users: users });
});

module.exports = router;
