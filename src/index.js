import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    users.push(req.body);
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const avatar = users.find(user => user.username === req.body.username).avatar;
    tweets.push({
        ...req.body,
        avatar
    });
    res.send('OK');
});

app.listen(5000, () => {
    console.log('Listening on port 5000');
});