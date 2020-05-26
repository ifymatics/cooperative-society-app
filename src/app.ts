import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { signinRouter } from './routes/user/signin';
import { signupRouter } from './routes/user/signup';
import { signoutRouter } from './routes/user/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { isAuthorizedRouter } from './routes/user/is-authorized';
import { enterpriseCreateRouter } from './routes/user/enterprise-create';


const app = express();
app.use(json());
app.use(cors())
app.use(isAuthorizedRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(enterpriseCreateRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});


app.use(errorHandler);
export { app };