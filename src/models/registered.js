const mongoose = require('mongoose')

const registeredSchema = new mongoose.Schema({
    courseId: {
        type: String,
        unique:true,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    courseDept:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    courseRoom:{
        type:String,
        required: true
    },
    waitlistCapacity:{
        type:String,
        required: true
    },
    courseTeam:{
        type:String,
        required: true
    },
    createdBy:{
        type:String,
        required: true
    },
    studentName:{
        type:String,
        required: true
    },
    studentId:{
        type:String,
        required: true
    },
    studentCourseId:{
        type:String,
        required: true
    },

})

const Registered= mongoose.model('Registered', registeredSchema)




module.exports = Registered