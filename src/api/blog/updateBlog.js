const BlogService = require('../../services/BlogService')

module.exports = async function updateBlog(req, res){
    try{
        const blogData = await BlogService.update(req)
        res.status(blogData.status).json({message: blogData.message, data:blogData.data})
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}