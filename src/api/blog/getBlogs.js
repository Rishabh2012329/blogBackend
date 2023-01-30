const BlogService = require('../../services/BlogService')

module.exports = async function getBlogs(req, res){
    try{
        const blogData = await BlogService.getBlogs(req)
        res.status(blogData.status).json({data:blogData.data, message:blogData.message})
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}