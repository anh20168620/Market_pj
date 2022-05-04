const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/user')


mongoose.connect('mongodb://localhost:27017/market', async (error) => {
    if (error) {
        throw error;
    } else {
        console.log('Connect to mongodb success...');
        const app = express();
        app.use(express.static('public'));

        // middleware
        await app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }))
        app.use(express.urlencoded({
            limit: '50mb',
            extended: true
        }));
        app.use(express.json({ limit: '50mb' }));

        // routers
        app.use('/user', userRouter);


        // start server
        app.listen(process.env.PORT || 3001, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Server listen on port ${process.env.PORT || 3001} ...`);
            }
        });
    }
});
