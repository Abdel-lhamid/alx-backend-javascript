const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const database = process.argv[2];
    if (!database) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Database file not provided');
      return;
    }

    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Cannot load the database');
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1).map((line) => line.split(','));
      const csStudents = students.filter((student) => student[3] === 'CS');
      const sweStudents = students.filter((student) => student[3] === 'SWE');

      let responseText = 'This is the list of our students\n';
      responseText += `Number of students: ${students.length}\n`;
      responseText += `Number of students in CS: ${csStudents.length}. List: ${csStudents.map((student) => student[0]).join(', ')}\n`;
      responseText += `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((student) => student[0]).join(', ')}`;

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(responseText);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, '127.0.0.1', () => {
});

module.exports = app;
