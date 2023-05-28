// import required modules/packages
const express = require("express");
const User = require("../models/userModel");
const logger = require("../middlewares/logger");

// router instance
const router = express.Router();

// app endpoints
router.get("/test",logger, function(request, response){
    response.status(200).send("Test route working");
});

router.get("/",logger, (req, res)=>{
    res.status(200).send("Welcome home, Dev");
});

router.get("/users",logger, async (req, res)=>{
    // retrieve all users from the database
    const users = await User.find({});
    if(!users){
        return res.status(500).send("Something broke, Failed to get users");
    };
    if(users.length === 0){
        return res.status(200).send("No users available");
    };
    res.status(200).json({ users });
});

router.get("/user/:userId",logger, async (req, res)=>{
    // get requested userId
    const userId = req.params.userId;

    // retrieve user based on userId
    const user = await User.findById(userId);
    if(!user){
        return res.status(500).send("Failed to get user");
    };
    res.status(200).json({ user });
});

router.post("/new-user",logger, async (req, res)=>{
    // perform object destructuring to obtain values in variables submitted by user
    const { username, email, age } = req.body;

    // data validations
    if(!username || username.length ===0 || username ===""){
        return res.status(400).send("Username is required");
    };
    if(!email || email.length === 0 || email ===""){
        return res.status(400).send("Email is required");
    };
    if(!age || age.length === 0 || age ===""){
        return res.status(400).send("Age is required");
    };

    // check for user existence before creating new user
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(403).send("User with same email already exists");
    };

    // create new user
    const newUser = new User({
        username,
        email,
        age
    });

    // to check user before submitting comment me out
    // console.log(newUser);

    // save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).send("New user saved");
});

router.put("/user/:userId",logger, async (req, res)=>{
    // get requested userId
    const userId = req.params.userId;

    // perform object destructuring to get user submitted values in variables
    const { username, email, age } = req.body;

    // user update object
    const userUpdates = {
        username, email, age
    };

    // check user existence before updating
    const existingUser = await User.findById(userId);
    if(!existingUser){
        return res.status(404).send("User not found");
    };

    // update user if exists
    const updatedUser = await User.findByIdAndUpdate(userId, userUpdates);

    res.status(201).send("User has been updated");
});

router.delete("/user/:userId",logger, async (req, res)=>{
    // get requested user id
    const userId = req.params.userId;

    // check for user existence
    const existingUser = await User.findById(userId);
    if(!existingUser){
        return res.status(404).send("Can not perform this action, User not found");
    };

    // delete user if exists
    const deletedUser = await User.findByIdAndDelete(userId);
});

// export router instance
module.exports = router;