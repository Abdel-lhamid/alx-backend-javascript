const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const database = process.argv[2];
  if (!database) {
    res.send('This is the list of our students\n');
    return;
  }

  fs.readFile(database, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Cannot load the database');
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));
    const csStudents = students.filter((student) => student[3] === 'CS');
    const sweStudents = students.filter((student) => student[3] === 'SWE');

    let response = 'This is the list of our students\n';
    response += `Number of students: ${students.length}\n`;
    response += `Number of students in CS: ${csStudents.length}. List: ${csStudents.map(student => student[0]).join(', ')}\n`;
    response += `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map(student => student[0]).join(', ')}`;

    res.send(response);
  });
});

app.listen(port, () => {
});

module.exports = app;
