import app from './app';

app.listen(process.env.PORT);

const time = new Date().toLocaleTimeString();
const address = `http://localhost:${process.env.PORT}`;
process.stdout.write(`started at ${time} at ${address}`);
