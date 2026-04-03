const axios = require('axios');
const express = require('express');
const app = express();
const port = 8081;

const TSX_URL = 'https://app-money.tmx.com/graphql';
const GET_NEWS_AND_EVENTS_QUERY = `query getNewsAndEvents($symbol: String!, $page: Int!, $limit: Int!, $locale: String!, $companyInNews: Boolean) {  news: getNewsForSymbol(    symbol: $symbol    page: $page    limit: $limit    locale: $locale    companyInNews: $companyInNews  ) {    headline    datetime    source    newsid    summary    __typename  }  events: getUpComingEventsForSymbol(symbol: $symbol, locale: $locale) {    title    date    status    type    __typename  }}`;



//graphql query: query getNewsAndEvents
//host: app-money.tmx.com
//query: query getNewsAndEvents($symbol: String!, $page: Int!, $limit: Int!, $locale: String!, $companyInNews: Boolean) {  news: getNewsForSymbol(    symbol: $symbol    page: $page    limit: $limit    locale: $locale    companyInNews: $companyInNews  ) {    headline    datetime    source    newsid    summary    __typename  }  events: getUpComingEventsForSymbol(symbol: $symbol, locale: $locale) {    title    date    status    type    __typename  }}
// vars = {companyInNews: false, limit: 10, locale: "en", page: 1, symbol: "QIMC"}

app.post('/:symbol', (req, res) => {
  const symbol = req.params.symbol;
  console.log(`Received request for symbol: ${symbol}`);
  axios({
    method: 'post',
    allowAbsoluteUrls: false,
    url: TSX_URL,
    headers: {
                'Content-Type': 'application/json'
    },
    data: {
        query: GET_NEWS_AND_EVENTS_QUERY,
        variables: {
            companyInNews: false,
            limit: 10,
            locale: "en",
            page: 1,
            symbol: symbol
        }
    }  
})
.then((response) => {
    console.log(`${axios.defaults.baseURL}`); // Logs the full URL of the request
    res.send(response.data);//fetch the data 
})
.catch((err) => {
    console.error("Axios error:", err.message);
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});