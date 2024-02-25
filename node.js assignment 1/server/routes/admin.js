const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require('../models/User');



const adminLayout = '../views/layouts/admin';


/**
 * GET /
 * Admin - Login Page
*/
router.get('/admin', async (req, res) => {
    try {
      const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  });


/**
 * POST /
 * Admin -Check Login
 * 
 * here i have hard coded username and password 
 * USERNAME = admin
 * PASSWORD =
*/

  router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if(req.body.username === 'admin' && req.body.password === 'password') {
      res.redirect('/dashboard')
    } else {
      res.send('Wrong username or password');
    }

  } catch (error) {
    console.log(error);
  }
});



/**
 * GET /
 * Admin Dashboard
*/




router.get('/dashboard', async (req, res) => {
  
    try {
        const locals = {
          title: 'Dashboard',
          description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }
    
        const data = await Post.find();
        res.render('admin/dashboard', {
          locals,
          data,
          layout: adminLayout
        });
    
      } catch (error) {
        console.log(error);
      }
    });


/**
 * GET /
 * Admin - Create New Post
*/
router.get('/add-post',  async (req, res) => {
    try {
      const locals = {
        title: 'Add Post',
        description: 'Simple Blog created with NodeJs, Express & MongoDb.'
      }
  
      const data = await Post.find();
      res.render('admin/add-post', {
        locals,
        layout: adminLayout
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });


/**
 * POST /
 * Admin - Create New Post
*/
router.post('/add-post', async (req, res) => {
    try {
      try {
        const newPost = new Post({
          title: req.body.title,
          body: req.body.body
        });
  
        await Post.create(newPost);
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  });

  /**
 * GET /
 * Admin - Edit Post
*/
router.get('/edit-post/:id', async (req, res) => {
    try {
  
      const locals = {
        title: "Edit Post",
        description: "Free NodeJs User Management System",
      };
  
      const data = await Post.findOne({ _id: req.params.id });
  
      res.render('admin/edit-post', {
        locals,
        data,
        layout: adminLayout
      })
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * PUT /
 * Admin - Create New Post
*/
router.put('/edit-post/:id', async (req, res) => {
    try {
  
      await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      });
  
      res.redirect(`/edit-post/${req.params.id}`);
    
    } catch (error) {
      console.log(error);
    }
  
  });


  /**
 * DELETE /
 * Admin - Delete Post
*/
router.delete('/delete-post/:id', async (req, res) => {

    try {
      await Post.deleteOne( { _id: req.params.id } );
      res.redirect('/dashboard');
    } catch (error) {
      console.log(error);
    }
  
  });



  /**
 * GET /
 * Admin Logout
*/
router.get('/logout', (req, res) => {

  
  res.redirect('/');
});











  module.exports =router;