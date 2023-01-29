const BlogModel = require("../models/blog")

class BlogService {

    constructor(){
        this.blogPerpage = 10;
    }

    async getBlogs(req){
        let {prevPage} = req.body;

        if(!prevPage)
            prevPage = 0;
            
        const blogs = await (await BlogModel.find({})).skip(prevPage*this.blogPerpage).limit(this.blogPerpage)
        return {blogs}
    }

    async create(req){
        const {title, content, userData} = req.body

        const blog = BlogModel({
            title: title,
            content: content,
            userId: userData.id
        })

        await blog.save()

        return blog
    }

    async delete(req){
        const {id} = req.body
        
        let result = await BlogModel.findByIdAndDelete(id)

        console.log(result)
        return result
    }

    async update(){
        const {id, title, content} = req.body

        let result = await BlogModel.findByIdAndUpdate(id,{
            title: title,
            content: content
        })

        return result
    }
}

module.exports = new BlogService()