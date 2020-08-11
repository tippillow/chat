const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = 5000;

const router = require('./router');

const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const io = socketio(server);

let currentId = 4;
const currentDay = new Date();


let messages = {
    flood: [
        {
            id:     1,
            text:   'Hello!',
            author: {
                name:   'Ivan Ivanov',
                avatar: 'https://avatarko.ru/img/kartinka/27/TMNT_Donatello_26726.jpg',
            },
            time:   `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}
                ${currentDay.getHours()}:${currentDay.getMinutes() < 10 ?
                '0' + currentDay.getMinutes() :
                currentDay.getMinutes()}`,
        },
        {
            id:     2,
            text:   'Dudeeee!',
            author: {
                name:   'Petr Petrov',
                avatar: 'https://avatars.mds.yandex.net/get-pdb/2308238/a024cf8c-248c-4779-973e-dfb376019d04/s1200?webp=false',
            },
            time:   `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}
                ${currentDay.getHours()}:${currentDay.getMinutes() < 10 ?
                '0' + currentDay.getMinutes() :
                currentDay.getMinutes()}`,
        }
    ],
    work:  [
        {
            id:     3,
            text:   'Hey, what is your task for today',
            author: {
                name:   'Ivan Ivanov',
                avatar: 'https://avatarko.ru/img/kartinka/27/TMNT_Donatello_26726.jpg',
            },
            time:   `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}
                ${currentDay.getHours()}:${currentDay.getMinutes() < 10 ?
                '0' + currentDay.getMinutes() :
                currentDay.getMinutes()}`,
        },
        {
            id:     4,
            text:   'I am making chat!',
            author: {
                name:   'Petr Petrov',
                avatar: 'https://avatars.mds.yandex.net/get-pdb/2308238/a024cf8c-248c-4779-973e-dfb376019d04/s1200?webp=false',
            },
            time:   `${currentDay.getDate()}/${currentDay.getMonth()}/${currentDay.getFullYear()}
                ${currentDay.getHours()}:${currentDay.getMinutes() < 10 ?
                '0' + currentDay.getMinutes() :
                currentDay.getMinutes()}`,
        }
    ],
};
const USERS = [{
        name:     'user',
        password: 'user',
        avatar:   'https://avatars.mds.yandex.net/get-pdb/471286/b5aaa2f3-7388-480f-adb8-31186dfd6d98/s1200',
    },
    {
        name:     'admin',
        password: 'admin',
        avatar:   'https://avatarko.ru/img/kartinka/1/Splinter.jpg',
    }];

app.use(cors());
app.use(router);

app.post('/login', bodyParser.json(), (req, res) => {
    const user = USERS.find(user => user.name === req.body.name);

    if (user === null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (user.password === req.body.password) {
            res.send({name: user.name, avatar: user.avatar});
        }
    } catch {
        res.status(500).send();
    }
})

io.on('connection', (socket) => {

    socket.on('join', (room) => {
        socket.emit('message', messages[room]);

        socket.broadcast.to(room).emit('message', messages[room]);

        socket.join(room);
    })

    socket.on('message', data => {

        if (messages[data.chat].filter(message => message.id === data.message.id).length === 1) {
            const message = messages[data.chat].find(message => message.id === data.message.id);
            message.text = data.message.text;

            return;
        }

        data.message.id = ++currentId;
        messages[data.chat] = [...messages[data.chat], data.message]

        io.to(data.chat).emit('message', messages[data.chat])
    });

    socket.on('change route', (room) => {

        io.to(room).emit('message', messages[room])
    });

    socket.on('delete', (data) => {
        messages[data.chat] = messages[data.chat].filter(message => message.id !== data.message.id);

        io.to(data.chat).emit('message', messages[data.chat]);
    })
});


server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
