const express = require('express');
// const uuid = require('uuid');
const app = express();
const fs = require('fs')
// const inquirer = require ('requirer')

const PORT = process.env.PORT || 8088

// will share any static html files with the browser
app.use(express.static('public'));
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/api/notes', (req, res) => {
    console.log('API REQUEST: save a new note', req.body);
    let dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    dbData.push({ id: dbData.length, title: req.body.title, text: req.body.text });
    fs.writeFileSync('./db/db.json', JSON.stringify(dbData));
    res.end();
});

app.get('/api/notes', (req, res) => {
    console.log('API REQUEST: fetch existing notes data');
    const dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    res.send(dbData);
});

app.delete('/api/notes/:id', (req, res) => {
    console.log('API REQUEST: delete note \#', req.params.id);
    console.log(req.params);
    let dbData = JSON.parse(fs.readFileSync('./db/db.json'));
    dbData = dbData.filter(entry => !(entry.id == req.params.id));
    fs.writeFileSync('./db/db.json', JSON.stringify(dbData));
    res.end();
});

app.get('/:page', (req, res) => {
    console.log('PAGE REQUEST: access page', req.params.page);
  res.sendFile(__dirname + '/public/notes.html')
  
});

// open server
app.listen(PORT, () => {
    console.log(`Opened server at localhost:${PORT}`);
});