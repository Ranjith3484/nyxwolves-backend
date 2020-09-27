const express = require('express')
const Course = require('../models/courses')

const router = new express.Router()

//add
router.post('/faculty/add/new/course', (req, res) => {
    const course = new Course(req.body)

    course.save().then(() => {
        res.status(200).json({
            message: "Course Added"
          })
    }).catch((e) => {
        res.status(400).json({
            message:"courseId"
        })
    })
})

//get
router.get('/faculty/get/all/course', (req,res) => {
    const id = req.headers['id']
    Course.find ({"createdBy" : id}).then((courses) =>{
        res.status(201).send(courses)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})

//get
router.get('/get/all/course', (req,res) => {
    Course.find ({}).then((courses) =>{
        res.status(201).send(courses)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})


module.exports = router



