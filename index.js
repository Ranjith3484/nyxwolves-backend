const express = require('express');

const userrouter = require('./src/routers/r-user');
const coursesrouter = require('./src/routers/r-courses');
const registeredrouter = require('./src/routers/r-registered');

const morgan = require('morgan');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.9gbbl.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('DB Connected')
})

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(userrouter);
app.use(coursesrouter);
app.use(registeredrouter);




const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})