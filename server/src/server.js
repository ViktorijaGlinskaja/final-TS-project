import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';
import imageRouter from './routes/image-router.js';
import contentRouter from './routes/content-router.js';
import businessRouter from './routes/business-router.js';

const server = express();
const { 
  SERVER_PORT,
  DB_CONNECTION,
  SERVER_DOMAIN,
  PUBLIC_PATH,
 } = process.env;

 const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(morgan('tiny'));
server.use(express.static(PUBLIC_PATH));
server.use(cors(corsOptions));
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);
server.use('/api/images', imageRouter);
server.use('/api/contents', contentRouter);
server.use('/api/business', businessRouter);

server.listen(SERVER_PORT, () => {

  mongoose.connect(DB_CONNECTION);
  console.log(`puslapis veikia ant ${SERVER_DOMAIN}:${SERVER_PORT}/`);
  (async () =>{
    try {
      await mongoose.connect(DB_CONNECTION);
      console.log('Prisijungta prie duomenų bazės');
    } catch (error) {
      console.error('Nepavyko prisijungti prie duomenų bazės');
    }
  })();
})


