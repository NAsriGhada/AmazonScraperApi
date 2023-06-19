const express = require('express')
const request = require('request-promise')


const app = express()
const PORT = process.env.PORT || 5000

// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
const generateScrappeeUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json())


app.get('/', (req, res) => {
    res.send('welcome to amazon scraper api')
})

// get product details
app.get('/product/:productId', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query
    try {
        const response = await request(
          `${generateScrappeeUrl(
            api_key
          )}&url=https://www.amazon.com/dp/${productId}`
        );
        console.log(response)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})
// get product reviews
app.get('/product/:productId/reviews', async (req, res) => {
    const { productId } = req.params
        const { api_key } = req.query;

    try {
        const response = await request(
          `${generateScrappeeUrl(
            api_key
          )}&url=https://www.amazon.com/product-reviews/${productId}`
        );
        console.log(response)
        res.json(JSON.parse(response))
        // res.json(response)
    } catch (error) {
        res.json(error)
    }
})
// get product offers
app.get('/product/:productId/offers', async (req, res) => {
    const { productId } = req.params
        const { api_key } = req.query;

    try {
        const response = await request(
          `${generateScrappeeUrl(
            api_key
          )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
        );
        console.log(response)
        res.json(JSON.parse(response))
        // res.json(response)
    } catch (error) {
        res.json(error)
    }
})
// get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
        const { api_key } = req.query;

    try {
        const response = await request(
          `${generateScrappeeUrl(
            api_key
          )}&url=https://www.amazon.com/s?k=/${searchQuery}`
        );
        console.log(response)
        res.json(JSON.parse(response))
        // res.json(response)
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))