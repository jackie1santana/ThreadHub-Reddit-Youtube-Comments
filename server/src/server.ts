import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';


// eslint-disable-next-line import/no-extraneous-dependencies
const debug = require('debug')('app');



const app: Application = express();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const PORT = env === 'development' ? 4000 : 5000;
// const publicDirectory = path.join(__dirname, '../../client/build');
// app.use(express.static(publicDirectory));

// app.get('*', (req, res) => {
//   res.sendFile(publicDirectory);
// });

console.log(process.env.NODE_ENV);
debugger;

const name: string = 'john';

debug(name);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  debug(req.headers)
  res.send('Hello World!!!!');
});



app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
