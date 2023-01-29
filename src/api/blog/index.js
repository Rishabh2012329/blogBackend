const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');
const createBlog = require('./createBlog');
const deleteBlog = require('./deleteBlog');
const getBlogs = require('./getBlogs');
const updateBlog = require('./updateBlog');

router.post('/getBlogs', getBlogs)
router.post('/createBlog', verifyToken, createBlog)
router.post('/deleteBlog', verifyToken, deleteBlog)
router.post('/updateBlog', verifyToken, updateBlog)

module.exports = router