const BlogService = require('../../services/BlogService')

module.exports = async function createBlog(req, res){
    try{
        const blogData = await BlogService.create(req)
        res.send(blogData)
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}