const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT= process.env.PORT || 3000;

app.use(cors());
cors({ credentials: true, origin: '*' });

app.get('/', (req, res) => {
    res.send('API Running');
}); 

// Define your API route
app.get('/api/news', async (req, res) => {
    const { country, category, apiKey, page, pageSize } = req.query;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});