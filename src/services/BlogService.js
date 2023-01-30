const BlogModel = require("../models/blog")

class BlogService {

    constructor(){
        this.blogPerpage = 10;
    }

    async getBlogs(req){
        try{

        let {prevPage} = req.body;

        if(!prevPage)
            prevPage = 0;
            
        const blogs = await BlogModel.find({}).skip(prevPage*this.blogPerpage).limit(this.blogPerpage)

        return {status: 200, message: "Sucessfully Fetched!", data:{blogs}}

        }catch(err){
            return {status: 500, message: err.message}
        }
    }

    async create(req){
        try{
            const {title, content} = req.body
            const {userData} = req

            if(!title || !content){
                return {status: 404, message: "title and content is required!"}
            }

            const blog = await BlogModel.find({title:title})

            if(blog.length>0)
                return {status: 404, message: "blog with this title already exists!"}

            const newBlog = BlogModel({
                title: title,
                content: content,
                userId: userData.userId
            })

            await newBlog.save()

            return {status: 200, message: "Created!", data:{blog:newBlog}}
        }catch(err){
            return {status: 500, message: err.message}
        }
    }

    async delete(req){
        try{

        const {id} = req.body
        const {userData} = req

        if(!id)
            return {status:404,message:"Please Provide Id!"}
        
        let result = await BlogModel.findOneAndDelete({_id:id, userId: userData.userId })

        if(!result)
            return {status:404,message:"Blog with this id does not exists!"}

        return {status:200, message:"successfully deleted!" ,data:{result}}

        }catch(err){
            return {status: 500, message: err.message}
        }
    }

    async update(req){
        try{
            const {id, title, content} = req.body
            const {userData} = req
            if(!id)
                return {status:404,message:"Please Provide Id!"}

            let result = await BlogModel.findOneAndUpdate({
                _id: id,
                userId: userData.userId
            },{
                title: title,
                content: content
            })
            
            return {status: 200, message:"Successfully Updated!"}
        }catch(err){
            return {status: 500, message: err.message}
        }
    }
}

module.exports = new BlogService()