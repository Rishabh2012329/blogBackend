const express = require('express');
const router = express.Router();
const blogRoutes = require('./blog')
const userRoutes = require('./user')

router.use("/blog",blogRoutes)
router.use('/user',userRoutes)

module.exports = router