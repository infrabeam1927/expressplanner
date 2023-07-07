const express= require('express')
const bodyParser= require('body-parser')
const app = express();
const methodOverride= require('method-override')
const mongoose = require('mongoose')
// set template
app.set('view engine','ejs');


const password = encodeURIComponent("Paris@1234567");
//Routing
// serving static file
app.use(express.static('public'))
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const url=`mongodb+srv://aadi1927:${password}@aadicluster.7j7lsrs.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url,{
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(console.log("MongoDB connected")).catch(err=>console.timeLog(err))
const planner=require('./models/planner')

app.get('/',(req,res)=>{
    res.render('Home');
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/planner',(req,res)=>{
    planner.find().then(data=>{
        res.render('planner',{data:data})        
    }).catch(err=>console.log(err))
    
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.post('/add-to-planner',(req,res)=>{
    const Data= new planner({
        title:req.body.title,
        description:req.body.description,
        date:req.body.date
    })
    Data.save().then(()=>{
        res.redirect('/planner')
    }).catch(err=>console.log(err))
})
app.get('/planner/:id',(req,res)=>{
   planner.findOne({
    _id:req.params.id
   }).then(data=>{
    res.render('Page',{data:data})
   }).catch(err=> console.log(err))
})
app.get('/planner/edit/:id',(req,res)=>{
    planner.findOne({
        _id:req.params.id
    }).then(data=>{
        res.render('edit',{data:data})
    }).catch(err=>console.log(err))   
})
app.put('/planner/edit/:id',(req,res)=>{
    planner.findOne({
        _id:req.params.id
    }).then(data=>{
        data.title = req.body.title
        data.description= req.body.description
        data.date = req.body.date
        
        data.save().then(()=>{
            res.redirect('/planner')
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
    
})
app.delete('/data/delete/:id',(req,res)=>{
    planner.deleteOne({
        _id:req.params.id
    }).then(()=>{
        res.redirect('/planner')
    }).catch(err=>console.log(err))
})
// create server
app.listen(3000,()=>{console.log('serveris running')});

