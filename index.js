const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: 'Missing url parameter' });

        // Create form-data like browser would
        const form = new FormData();
        form.append('url', url);

        const response = await axios.post(
            'https://tools.xrespond.com/api/social/all/downloader',
            form,
            {
                headers: {
                    ...form.getHeaders(),
                    'Accept': 'application/json',
                    'Origin': 'https://downsocial.io',
                    'Referer': 'https://downsocial.io/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                    'Sec-Ch-Ua': '"Chromium";v="137", "Not=A?Brand";v="24"',
                    'Sec-Ch-Ua-Mobile': '?1',
                    'Sec-Ch-Ua-Platform': '"Android"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site'
                },
                timeout: 15000
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch Instagram data',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Instagram downloader API running on port ${PORT}`);
});
