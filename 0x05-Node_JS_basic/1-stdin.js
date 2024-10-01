process.stdout.write('Welcome to Holberton School, what is your name?\n');

if (process.argv.length > 2) {
  const name = process.argv[2];
  process.stdout.write(`Your name is: ${name}\n`);
  process.stdout.write('This important software is now closing\n');
  process.exit();
} else {
  process.stdin.on('data', (data) => {
    const name = data.toString().trim();
    process.stdout.write(`Your name is: ${name}\n`);
    process.stdout.write('This important software is now closing\n');
    process.exit();
  });
}
