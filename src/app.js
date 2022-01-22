const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path=require("path");
const hbs=require("hbs");
require("./db/conn");

const app=express();
const port=process.env.PORT||3001;

const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));

app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);

app.get("/contact",(req,res)=>{
    res.render("index");
})
app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/contact", async (req, res) => {
    try {
      const registerEmployee = new Register({
        name: req.body.name,
        
        email: req.body.email,
        password: req.body.password,
        message:req.body.text,
      })
  
      const registered = await registerEmployee.save();
      res.status(201).render("index");
  
    } catch (error) {
      res.status(400).send(error);
    }
  });

app.listen(port,()=>{
    console.log(`server running at ${port}`);
})