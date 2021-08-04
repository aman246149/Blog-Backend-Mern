const express = require("express");
const router = express.Router();
const verify = require("../verifyToken");
const Post = require("../../model/Post");
const { postFormValidation } = require("../../validation");

router.post("/postformData", verify, async (req, res, next) => {
  //lets validate the data before saving to db

  const { error } = postFormValidation(req.body);

  if (error) {
    console.log(error);
    const errmsg = error.details[0].message;
    return res.status(400).send(errmsg);
  }

  //saving data in database;

  console.log(req.body);

  const postData = new Post({
    title: req.body.title,
    shortDesc: req.body.shortDesc,
    markdown: req.body.markdown,
    postType: req.body.postType,
  });

  try {
    const savedPost = await postData.save();
    res.send({ savedpost: savedPost });
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

router.get("/getdata", (req, res, next) => {
  Post.find()
    .then((response) => {
      console.log(response);
      res.send({ success: response });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

router.get("/getweb", (req, res, next) => {
  Post.find({postType:"Web"})
    .then((response) => {
      console.log(response);
      res.send({ success: response });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

router.get("/gettech", (req, res, next) => {
  Post.find({postType:"Tech"})
    .then((response) => {
      console.log(response);
      res.send({ success: response });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});


router.get("/getdsa", (req, res, next) => {
  Post.find({postType:"Dsa"})
    .then((response) => {
      console.log(response);
      res.send({ success: response });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});

router.get("/getcheatsheet", (req, res, next) => {
  Post.find({postType:"CheatSheet"})
    .then((response) => {
      console.log(response);
      res.send({ success: response });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
});



module.exports = router;
