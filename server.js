//imports and dependencies
const express = require('express');
const actionRouter = require('./Actions');
const projectRouter = require('./Projects');

//server
const server = express();

//middleware
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

module.exports = server
