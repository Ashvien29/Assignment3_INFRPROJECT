var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Book = require('../model/health');
//const book = require('../model/health');
let healthController = require('../controllers/health.js')
/* Get route for the book list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the books list */
router.get('/',async(req,res,next)=>{
try{
    const HealthList = await Book.find();
    res.render('Health/list',{
        title:'Health Tracker',
        HealthList:HealthList
    })}
    catch(err){
        console.error(err);
        res.render('Health/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Health/add',{
            title: 'Add Record'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Health/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Book({
            "Day":req.body.Day,
            "HeartRate":req.body.HeartRate,
            "BloodPressure":req.body.BloodPressure,
            "BloodSugar":req.body.BloodSugar
        });
        Book.create(newBook).then(()=>{
            res.redirect('/healthlist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Health/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const bookToEdit= await Book.findById(id);
        res.render('Health/edit',
            {
                title:'Edit health',
                Book:bookToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedBook = Book({
            "_id":id,
            "Day":req.body.Day,
            "HeartRate":req.body.HeartRate,
            "BloodPressure":req.body.BloodPressure,
            "BloodSugar":req.body.BloodSugar
        });
        Book.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/healthlist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Health/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Book.deleteOne({_id:id}).then(()=>{
            res.redirect('/healthlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('Health/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;