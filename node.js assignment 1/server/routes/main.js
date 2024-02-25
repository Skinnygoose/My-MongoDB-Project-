const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const adminLayout = '../views/layouts/admin';

/**
 * GET /
 * HOME
 */

router.get("", async (req, res) => {
  // we can also render ejs data and this example shows us how
  //Here we are setting up a very basic title and description for the wepage
  const locals = {
    title: "Node.js Blog",
    description: "Simple Blog created with nodeJs,Express and MongoDb",
  };
  try {
    const data = await Post.find();
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
  //we can pass this local object in res.render inside curly bracket because its an object

  //this tell us which page we want to render
});
/**
 * GET /
 * Post :id
 */
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Nodejs Assignment",
    };

    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Post - searchTerm
 */
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      // currentRoute: '/'
    });
  } catch (error) {
    console.log(error);
  }
});

//similarly we can create more routes for multiple pages as well
router.get("/about", (req, res) => {
  //here the /about is setting up the route to a certain page
  res.render("about"); //this tell us here  page we want to render is about page
});
router.get("/contact", (req, res) => {
  //here the /about is setting up the route to a certain page
  res.render("contact"); //this tell us here  page we want to render is contact page
});


// <------------------------------------------------------------------------------------------------------------->









module.exports = router;
