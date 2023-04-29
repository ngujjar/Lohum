const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/price', (req, res) => {
    const url = 'https://www.metal.com/Lithium-ion-Battery/202303240001' ;
    request(url, (error, response, html) => {
        if (error || response.statusCode !== 200) {
            res.status(500).send('Error retrieving webpage content');
            return;
        }
        const $ = cheerio.load(html);

        const price = $('span.strong__1JlBD.priceDown__2TbRQ').text().trim();
        console.log(price);

        if (!price) {
            res.status(500).send('Error retrieving price');
        } else {
            res.send({ price });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
