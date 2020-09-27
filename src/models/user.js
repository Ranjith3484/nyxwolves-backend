const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            unique:true,
            required:true,
        },
        phone: {
            type: String,
            default:null,
        },
        type:{
            type:String,
            required:true,
        },
        password: {
            type: String,
            required:true,
        },
        profileImg: {
            type: Array,  
            default:null, 
        },
        about: {
            type: String,  
            default:null, 
        },
        city: {
            type: String,
            default:null,   
        },
        country: {
            type: String, 
            default:null,  
        },
        company: {
            type: String,
            default:null,
        },
        school: {
            type: String,  
            default:null, 
        },
        hometown: {
            type: String, 
            default:null,  
        },
        languages: {
            type: String, 
            default:null,  
        },
        gender: {
            type: String, 
            default:null,  
        },
        token:{
            type:String
        }
    })


const User = mongoose.model('User', userSchema )




module.exports = User