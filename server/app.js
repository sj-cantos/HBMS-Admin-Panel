const express = require('express');

const app = express();
const port = 3003;

app.get('/', (req,res)=>{
    res.send("hello");
})

app.listen(port, ()=>{

    console.log("app is listening at ", port)
})