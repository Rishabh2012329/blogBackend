const BlogService = require('../../services/BlogService')

module.exports = async function updateBlog(req, res){
    try{
        const blogData = await BlogService.update(req)
        res.status(blogData.status).json(blogData)
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}