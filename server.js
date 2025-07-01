const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/tasktracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
