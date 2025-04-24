// app.js
const express = require('express');
const path = require('path');
const app = express();

const { connectToMongo } = require('./db');
const indexRouter = require('./routes/index');
const tournamentsRouter = require('./routes/tournaments');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/tournaments', tournamentsRouter);

connectToMongo().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
