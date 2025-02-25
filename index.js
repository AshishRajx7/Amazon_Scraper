const express = require('express');
const request = require('request-promise');

const PORT = process.env.PORT || 5000;
const app = express();




const generateScraperUrl = (apiKey) =>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());


// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

// Get product reviews
// app.get('/products/:productId/reviews', async (req, res) => {
//     const { productId } = req.params;
    
//     try {
//         const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`);
        
//         res.json(JSON.parse(response));
//     } catch (error) {
//         res.json(error);
//     }
// });


app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));