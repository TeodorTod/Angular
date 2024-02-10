const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('hello world')
  })


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})