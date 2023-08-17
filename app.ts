import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Routes from './routes'

const app: express.Application = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Routes(app);

//configure mongoose
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
