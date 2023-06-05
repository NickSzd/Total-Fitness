const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");

const params = {
    api_key: process.env.NUTRITION_APP_KEY,
    query: 'cheddar',
    dataType: ["Branded"],
    pagesize: 10
}
const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pageSize=${encodeURIComponent(params.pagesize)}`

function getData() {

    return fetch(api_url).then(response => response.json())
}


getData().then(data => console.log(data.foods[0].foodNutrients));


// data.foods is your array 



// const [foods, setFoods] =  React.useState([]);

// setFoods(data.foods);

// console.log(data.foods);

//iterate array 
// const [foods, setFoods] =  useState([]);

// const Something = () => {

// }

// return (
//     <FlatList
//      data = {foods}
//      renderItem = {({ item }) => (
//         <Text> "test" </Text>
//      )}
//      />
// )
