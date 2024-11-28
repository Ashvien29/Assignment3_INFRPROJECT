//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let healthModel = mongoose.Schema({
    Day: String,
    HeartRate: String,
    BloodPressure: String,
    BloodSugar: String
},
{
    collection:"Tracker"
});
module.exports =mongoose.model('Health',healthModel);
