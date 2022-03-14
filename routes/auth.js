var express = require("express");
var router = express.Router();
const auths = require("../models/auth");
const joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const schema = {
    name:joi.string()
        .min(6)
        .required(),
    email:joi.string()
        .min(6)
        .required()
        .email(),
    password: joi.string()
        .min(6)
        .required()
};

router.post('/register',async (req,res)=>{

    // const {error} = joi.validate(req.body,schema);
    // if(error) 
    //     return res.status(400).send(error.details[0].message);
    
    const emailExist = await auths.findOne({email: req.body.email});

    if(emailExist)
        return res.status(400).send("Email already exist");
    
    const auth = new auths ({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
    });
    try{
        const savedAuth=await auth.save();
        res.send(savedAuth);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{

    // const {error} = joi.validate(req.body,schema);
    // if(error) 
    //     return res.status(400).send(error.details[0].message);

        const user = await auths.findOne({email: req.body.email});
        if(!user)
        return res.status(400).send("Email does  not exist");

        if(user.password === req.body.password)
        {
            const token = jwt.sign({_id: user._id}, "fdRGEGREG" )
            res.header('auth-token',token).send(token);
        }
        else
            res.send("invalid password");
});

module.exports = router;