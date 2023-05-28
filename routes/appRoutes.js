// import required modules/packages
const express = require("express");

// router instance
const router = express.Router();

// app endpoints
router.get("/test", function(request, response){
    response.status(200).send("Test route working");
});

router.get("/", (req, res)=>{
    res.status("Welcome home, Dev");
});
// export router instance
module.exports = router;