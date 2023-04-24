const { registerUser, loginUser, getUserInfo, getConnectionInfo, checkUser } = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../config/passport");
const multer  = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Chat_App',
      format: async (req, file) => {
        if (file.mimetype === 'image/png') {
          return 'png';
        }
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
          return 'jpeg';
        }
        return null; // reject the file
      }, 
      public_id: (req, file) => `image-sam-${Date.now()}` // set a unique public ID for the file
    }
  });
  
  const upload = multer({ storage });



router.post("/register", upload.single('avatar'), registerUser);
router.post("/login", loginUser);
router.get("/info", passport.authenticate('jwt', { session: false }), getUserInfo);
router.get("/connectionInfo/:id", getConnectionInfo);

module.exports = router;