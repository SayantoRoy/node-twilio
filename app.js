const app = require('express')();



const auth = require('./src/routes/authRoute');

app.get('/' , (req , res)=>{
    res.send("Hello there!!");
})

app.get('/doki' , (req, res)=>
{
    res.send("Hello Doki Doki");
})

app.use('/auth' , auth);


app.listen(3000 , ()=> {
    console.log("Listening");
})
