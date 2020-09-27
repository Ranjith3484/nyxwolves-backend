const express = require('express')
const Registered = require('../models/registered')

const router = new express.Router()



//add
router.post('/stuent/add/new/course', (req, res) => {
    const registered = new Registered(req.body)

    registered.save().then(() => {
        res.status(200).json({
            message: "Course Registered"
          })
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//get
router.get('/student/get/all/courses', (req,res) => {
    const id = req.headers['id']
    Registered.find ({"studentId" : id}).then((registereds) =>{
        res.status(201).send(registereds)
    }).catch((e) => {
        res.status(401).json({
            message: "no data"+e
          });
    })
})




module.exports = router



