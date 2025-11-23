const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'Missing url parameter' });

    try {
        // GET request to Fastok converted from POST
        const response = await axios.get('https://api-wh.fastok.app/api/convert', {
            params: { url },
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://fastol.app',
                'Referer': 'https://fastdl.app/',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                'Sec-Ch-Ua': '"Chromium";v="137", "Not=A?Brand";v="24"',
                'Sec-Ch-Ua-Mobile': '?1',
                'Sec-Ch-Ua-Platform': '"Android"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cookie': 'insert-your-cookies-here-if-needed'
            },
            timeout: 15000
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch from Instagram API', 
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Instagram downloader API running on port ${PORT}`);
});
