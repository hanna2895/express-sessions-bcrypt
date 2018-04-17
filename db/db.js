const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/express-sessions';

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
	console.log("mongoose connected to db");
});

mongoose.connection.on('error', () => {
	console.log('mongoose error');
});

mongoose.connection.on('disconnected', () => {
	console.log("mongoose disconnected");
});