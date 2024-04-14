const express = require('express')
const {GoogleGenerativeAI} = require('@google/generative-ai');

const app = express();

const genAI = new GoogleGenerativeAI('AIzaSyAIRNUh9_3wKKASbh11dnYEnPvxHoU9Swg');

const model = genAI.getGenerativeModel({model:'gemini-pro'})

const PORT = 8080;

// Router functionalities

const summary_route = require('./routers/resume-summary');


app.use('/summary',summary_route);

app.get('/',(req,res)=>{

    res.send("Hello World!");
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:8080`);
})