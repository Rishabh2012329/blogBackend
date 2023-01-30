const BlogService = require('../../services/BlogService')

module.exports = async function createBlog(req, res){
    try{
        const blogData = await BlogService.create(req)
        res.status(blogData.status).json({message:blogData.message, data:blogData.data})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Some Error Occurred!"})
    }
}