import mongoose from 'mongoose';
import ip from "ip";
import { app } from './app';

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    // mongodb://localhost/cmsShop
    try {
        await mongoose.connect('mongodb://localhost/marketApp', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDb');
    } catch (err) {
        console.error(err);
    }

    const port: number = Number(`${process.env.PORT}`) || 3000;
    const host: string = process.env.IP || ip.address();
    app.listen(port, host, () => {
        console.log(`Server Running on host:http://${host}:${port}`);
    });
};

start();