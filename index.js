const express=require("express");
const { connectToMongoDB}=require("./connect");
const URL=require("./models/url");
const staticRoute=require("./routes/staticRouter");
const path=require("path");


const urlRoute=require("./routes/url");

const app=express();
app.set("view engine","ejs");
app.set("views","./views");
const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/urlShortnerDB')
.then(()=>console.log("Connected to MongoDB"))


app.use(express.json());
app.use(express.urlencoded({extended:false}));
 



app.use("/url",urlRoute);
app.use("/",staticRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({shortId},{
        $push:{
  visitHistory: { timestamp: Date.now() }
}

    })
    res.redirect(entry.redirectUrl);

})

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));