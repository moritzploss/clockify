import app from './app';

// eslint-disable-next-line no-console
console.log(`Server started on port ${process.env.PORT} at ${new Date().toLocaleTimeString()}`);
app.listen(process.env.PORT);
