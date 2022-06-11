const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require('./routes/userRouter')
const passwordResetRouter = require('./routes/passwordResetRouter')
const avatarRouter = require('./routes/avatarRouter')
const categoryRouter = require('./routes/categoryRouter')
const subCategoryRouter = require('./routes/subCategoryRouter')
const productRouter = require('./routes/productRouter')
const chatRouter = require('./routes/chatRouter')
const messageRouter = require('./routes/messageRouter')
const reportRouter = require('./routes/reportRouter')
const adminRouter = require('./routes/adminRouter')

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
        app.use('/password-reset', passwordResetRouter);
        app.use('/avatar', avatarRouter);
        app.use('/category', categoryRouter)
        app.use('/sub-category', subCategoryRouter)
        app.use('/product', productRouter)
        app.use('/chat', chatRouter)
        app.use('/message', messageRouter)
        app.use('/report', reportRouter)

        app.use('/admin', adminRouter)


        // start server
        const server = app.listen(process.env.PORT || 3001, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Server listen on port ${process.env.PORT || 3001} ...`);
            }
        })

        const io = require('socket.io')(server, {
            cors: {
                origin: "https://localhost:3000/",
                credentials: true,
                methods: ["GET", "POST"],
            }
        })

        let users = []

        const addUser = (userId, socketId) => {
            !users.some(user => user.userId === userId) &&
                users.push({ userId, socketId })
        }

        const removeUser = (socketId) => {
            users = users.filter(user => user.socketId !== socketId)
        }

        const getUser = (userId) => {
            return users.find(user => user.userId === userId)
        }

        io.on("connection", (socket) => {
            // when connect
            console.log("a user connected");
            // take userId and socketId from user
            socket.on('addUser', userId => {
                addUser(userId, socket.id)
                io.emit("getUsers", users)
            })

            // send and get message
            socket.on("sendMessage", ({ senderId, receiverId, content, senderName, senderAvatar, productId }) => {
                const user = getUser(receiverId)
                io.to(user?.socketId).emit("getMessage", {
                    senderId,
                    content,
                    senderName,
                    senderAvatar,
                    productId
                })

                io.to(user?.socketId).emit("notification", {
                    message: "have message",
                    productId
                })
            })

            // send report to admin
            socket.on("sendReport", (data) => {
                console.log(data);
                const user = getUser(process.env.ADMINID)
                io.to(user?.socketId).emit("getReport", data)
            }
            )

            // when disconect
            socket.on("disconnect", () => {
                console.log('a user disconnected!');
                removeUser(socket.id)
                io.emit("getUsers", users)
            })
        })
    }
});
