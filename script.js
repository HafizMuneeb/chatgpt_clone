import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8000

const secret_key = process.env.API_KEY


app.post('/completions',async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${secret_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on port' + PORT))