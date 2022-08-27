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
    const avatar = users.find(user => user.username === req.body.username).avatar;
    const { username, tweet } = req.body;

    if (!username || !tweet) {
        res.status(400).send({
            message: 'Todos os campos são obrigatórios!'
        });
        return;
    }

    tweets.push({
        username,
        tweet,
        avatar
    });

    res.status(201).send('OK');
});

app.get('/tweets', (req, res) => {
    let lastTenTweets;

    if (tweets.length <= 10) {
        lastTenTweets = tweets;
    } else {
        lastTenTweets = tweets.splice(tweets.length - 10);
    }

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