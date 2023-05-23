const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { async } = require('@firebase/util')

require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    res.json('hi')
})

/*
app.get('/news', (req, res) => {
    const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

    try {
      const response = fetch(apiUrl, {
        headers: {
          'X-Api-Key': process.env.WORKOUT_APP_API_KEY,
        },
      });

     axios.request(reponse).then((response) => {
        res.json(response.data)
     })
    } catch (error) {
        console.log("Error");
    }
})
*/
app.listen(8000, () => console.log(`Server running on port ${PORT}`))