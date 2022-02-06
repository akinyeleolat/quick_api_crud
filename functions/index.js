const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: true}));

const {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./controller');

app.get('/', (req, res) =>{
  return res.status(200).send('Hello World!');
});

app.get('/api/getuser', getAllUser);
app.get('/api/getuser/:user_id', getUser);
// create
app.post('/api/create', createUser);
// update
app.patch('/api/update/:user_id', updateUser);
// delete
app.delete('/api/delete/:user_id', deleteUser);

exports.app = functions.https.onRequest(app);
