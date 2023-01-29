const BlogService = require('../../services/BlogService')

module.exports = async function deleteBlog(req, res){
    try{
        const blogData = await BlogService.delete(req)
        res.json(blogData)
    }catch(err){
        res.status(500).json({message:"Some Error Occurred!"})
    }
}