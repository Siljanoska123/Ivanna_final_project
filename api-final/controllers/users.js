const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


require('dotenv').config();

module.exports = {

  register: async (req, res) => {
    try {

      let user = await User.findOne({ email: req.body.email.toLowerCase() })
      if (user) {
        throw new Error('This email is already taken!');
      };

      if (!req.body.password || req.body.password != req.body.confirmPassword) {
        return res.send({
          err: true,
          message: 'The password does not match'
        });
      }
      req.body.confirmPassword = bcrypt.hashSync(req.body.confirmPassword);

      // tuka pravime enkripcija na password-ot so koristenje na bcrypt module-ot
      req.body.password = bcrypt.hashSync(req.body.password);
      user = await User.create(req.body);

      res.send({
        err: false,
        message: 'New user record created!',
        user: user
      });
    } catch (err) {
      res.send({
        err: true,
        message: err.message
      });
    }
  },


  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid credentials');
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        throw new Error('Invalid credentials');
      }
      const payload = {
        id: user._id,
        email: user.email
      }
      // payload ---enkripcija---> jwt token ----dekripcija---> payload
      const token = jwt.sign(payload, process.env.AUTH_SECRET, {
        expiresIn: '1200m'
      },
      );

      res.send({
        error: false,
        message: 'User logged in',
        token: token,
        user: user
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },


  logout: (req, res) => {
    try {
      const payload = {
        id: req.user.id,
        email: req.user.email
      }
      const token = jwt.sign(payload, 'Invalid secret key', {
        expiresIn: '1s'
      });
      res.send({
        error: false,
        message: 'User logged out',
        token: token
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },

  myProfile: async (req, res) => {

    // console.log(req.file);
    try {

      const user = await User.findById(req.user.id, req.body);
      res.send({
        err: false,
        message: 'My profile',
        user: user
    })
}
     catch (error) {
      res.send({
        error: true,
        message: error.message
      });
    }
  },


  editMyProfile: async (req, res) => {

    try {

      const user = await User.findByIdAndUpdate(req.user.id, req.body);
      req.body.email=req.body.email.toLowerCase();
      res.send({
        error: false,
        message: `User has just updated his/her profile!`,
        user: user
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message,
      });
      console.log(error);
    }
  },


  editImage: async (req, res) => {
    // console.log('proveri');
    console.log(req.file);
    // console.log(req.body);
    try {
    
      req.body.image = `images/users/${req.file.filename}`;
      req.body.user = req.user.id;
      const user = await User.findByIdAndUpdate(req.user.id, req.body);
      res.send({
        error: false,
        message: `User has just updated his/her profile!`,
        user: user
      });
    } catch (error) {
      res.send({
        error: true,
        message: error.message,
      });
      console.log(error);
    }
  }
}





// req.user.id, req.user








// Recipe.find({ category: 'breakfast' })
