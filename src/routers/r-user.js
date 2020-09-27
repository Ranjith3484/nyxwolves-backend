const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const uuid = require('uuidv4');

const router = new express.Router()

//users insert
router.post('/user/register', (req, res) => {

  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    email: req.body.email,
    name:req.body.name,
    password: hashedPassword,
    type:req.body.type
  })


  user.save().then(() => {
    res.status(200).json({
      message: "Registered successfully",
      email:user.email
    })
  }).catch((e) => {
    res.status(400).json({
      message: user.email+" is already taken"
    })
    console.log(e)
  })
})

//login

router.post("/login", async(req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
       return res.status(401).json({
          message: "invalid Email"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
        if (err) {
       return  res.status(401).json({
            message: "Incorrect Password"
          });
        }
        if (result) {

        const token = jwt.sign({ email: user[0].email }, 'email');
//updating the token in user profile
        let security = await User.findOneAndUpdate(
          { _id: user[0].id },
          {
            $set: {
              token:token
            }
          },
          { upsert: true }
        );

        return  res.status(200).json({
            message: "Login successful",
            token: token,
            userid: user[0]._id,
            name: user[0].name,
            email:user[0].email,
            type:user[0].type
          });
        }
        res.status(401).json({
          message: "Incorrect Password"
        });
      });
    })
    .catch(err => {
      console.log(err);
    return  res.status(500).json({
        error: err
      });
    });
});

//setting profile
/////ADD the images::::
const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const dummy = Math.floor(100000 + Math.random() * 900000)
    cb(null,dummy+"-"+file.originalname)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

//update profile
router.put("/update/profile", upload.array("profileImg", 1),async (req, res) => {
  const reqFiles = [];
    const url = "https://" + req.get("host");
    //const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + "/public/" + req.files[i].filename);
    }
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          profileImg:reqFiles,
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      message: "Profile Updated"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
    console.log(err)
  }
});

//update profile
router.put("/update/profile/details",async (req, res) => {
  try {
    let user = await User.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          phone:req.body.phone,
          name:req.body.name,
          email:req.body.email,
          about:req.body.about,
          city:req.body.city,
          country:req.body.country,
          company:req.body.company,
          school:req.body.school,
          hometown:req.body.hometown,
          languages:req.body.languages,
          gender:req.body.gender
        }
      },
      { upsert: true }
    );
    res.status(200).json({
      message: "Profile Updated"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
    console.log(err)
  }
});

//authenticate user
router.post("/user/authenticate", (req, res, next) => {

  var token = req.body.token;
  var Id = req.body.id;

  User.find({ _id: Id})
  .exec()
  .then(user => {
    if (user.length < 1) {
     return res.status(401).json({
         authenticate: "false"
      });
    }
    else{
      if(user[0].token === token){
              jwt.verify(token, 'email', function (err, decoded) {
                  if (err) {
                      res.status(404).send({
                          authenticate: "false"
                      });
                  } else {
                      res.status(200).send({
                          authenticate: "true",
                          name: decoded.email,
                          type:user[0].type
                      })
                  }
              });
      }else{
        res.status(500).json({
          authenticate: "false"
        });
      }
    }
  })
  .catch(err => {
    console.log(err);
  return  res.status(500).json({
      authenticate: "false"
    });
  });

})

//get
router.get('/get/an/user', (req,res) => {
  const id = req.headers['id']
  User.find ({"_id" : id}).then((users) =>{
      res.status(201).send(users)
  }).catch((e) => {
      res.status(401).json({
          message: "no data"+e
        });
  })
})

module.exports = router



