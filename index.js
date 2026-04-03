const axios = require('axios');
const express = require('express');
require('dotenv').config()
const app = express();
const port = 8081;



//graphql query: query getNewsAndEvents
//host: app-money.tmx.com
//query: query getNewsAndEvents($symbol: String!, $page: Int!, $limit: Int!, $locale: String!, $companyInNews: Boolean) {  news: getNewsForSymbol(    symbol: $symbol    page: $page    limit: $limit    locale: $locale    companyInNews: $companyInNews  ) {    headline    datetime    source    newsid    summary    __typename  }  events: getUpComingEventsForSymbol(symbol: $symbol, locale: $locale) {    title    date    status    type    __typename  }}
// vars = {companyInNews: false, limit: 10, locale: "en", page: 1, symbol: "QIMC"}

app.post('/:symbol', (req, res) => {
  const userInput = req.params.symbol;
  console.log(`Received request for symbol: ${userInput}`);
  axios({
    method: 'post',
    allowAbsoluteUrls: false,
    url: process.env.TSX_URL,
    headers: {
                'Content-Type': 'application/json'
    },
    data: {
        query: process.env.GET_NEWS_AND_EVENTS_QUERY,
        variables: {
            companyInNews: false,
            limit: 10,
            locale: "en",
            page: 1,
            symbol: userInput
        }
    }  
})
.then((response) => {
    console.log(`${axios.defaults.baseURL}`); 
    res.send(response.data);
})
.catch((err) => {
    console.error("Axios error:", err.message);
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});