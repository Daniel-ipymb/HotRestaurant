const express = require('express');
const path = require('path');
const fs = require('fs')
// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)


// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'./index.html')));

app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

// Displays all characters
app.post('/api/reservations', async (req, res) => {
  console.log('route hit')
  const allReservations = await JSON.parse(fs.readFileSync('./reservation.json', 'utf-8'))
  console.log(allReservations)
  allReservations.push(req.body)
  console.log(allReservations)
  fs.writeFile('./reservation.json', JSON.stringify(allReservations), (err) => {
    if (err) throw err
    console.log('success')
  })
  res.json(allReservations)
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
