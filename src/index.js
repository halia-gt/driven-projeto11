import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({
            message: 'Todos os campos são obrigatórios!'
        });
        return;
    }

    users.push({
        username,
        avatar
    });
    res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
    const { user: username } = req.headers;
    const { tweet } = req.body;
    const avatar = users.find(user => user.username === username).avatar;

    if (!username || !tweet) {
        res.status(400).send({
            message: 'Todos os campos são obrigatórios!'
        });
        return;
    }

    tweets.unshift({
        username,
        tweet,
        avatar
    });

    res.status(201).send('OK');
});

app.get('/tweets', (req, res) => {
    const { page: pageStr = '1' } = req.query;
    const page = Number(pageStr);
    const maxPage = Math.ceil(tweets.length / 10);
    
    if (page < 1 || page > maxPage) {
        res.status(400).send({
            message: 'Informe uma página válida!'
        })
        return;
    }

    const lastTenTweets = [...tweets].splice((page*10 - 10), 10);
    
    res.send(lastTenTweets);
});

app.get('/tweets/:username', (req, res) => {
    const { username } = req.params;

    if (!users.some(user => user.username === username)) {
        res.status(400).send({
            message: 'Usuário não encontrado'
        });
        return;
    }

    const userTweets = tweets.filter(tweet => tweet.username === username);
    res.send(userTweets);
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});