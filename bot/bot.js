const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json())

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visitPage(url) {
    // Launch browser in sandbox mode for safety
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set a sample cookie - modify as needed for your CTF
        await page.setCookie({
            name: 'secret',
            value: 'redacted',
            domain: '127.0.0.1',
            httpOnly: false,
            path: '/challenge'
        });

        // Navigate to the provided URL
        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Wait briefly to allow for any XSS payload to execute
        await sleep(60000);

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
        await browser.close();
    }
}

// Example usage
const port = 3000;


function isValidURL(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

app.post('/bot/visit', async (req, res)=>{

    const {url} = req.body;
    if (url && typeof url == "string" && isValidURL(url))
    {
        await visitPage(url);
    }
    else
    {
        res.send("Bad Url");
    }

    res.send("Ok");
});

app.listen(port,'0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});