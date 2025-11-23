const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
    try {
        // Convert query parameters from GET request to POST body
        const postData = req.query;

        const response = await axios.post(
            'https://cmi.us.com/wp-admin/admin-ajax.php', // Keep POST
            qs.stringify(postData),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Origin': 'https://cmi.us.com',
                    'Referer': 'https://cmi.us.com/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                    'Sec-Ch-Ua': '"Chromium";v="137", "Not=A?Brand";v="24"',
                    'Sec-Ch-Ua-Mobile': '?1',
                    'Sec-Ch-Ua-Platform': '"Android"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Cookie': 'burst_uid=c669a3224b802f1cbd197d3e6065a915; pll_language=en; ga-GA1.1.1570017671.1763877161; TDD71LWDKT-GS2.1.s1763877160501890$11763877163$/57$1; PHPSESSID=dis3kkispvjof408n3nmhhgor2'
                },
                timeout: 15000
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to POST to cmi.us.com',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`CMI AJAX GET-to-POST API running on port ${PORT}`);
});
