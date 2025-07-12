import express from 'express';
import routerTest from './routerTest.js';
const app = express()
app.use("/routerTest", routerTest);

export default app;