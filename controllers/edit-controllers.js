const Post = require('../models/post')
const HttpError = require('../models/http-error')
const fs = require("fs")
const createPost = async(req,res,next) => {
    const {title,description,intro,image} = req.body

    const createdPost = new Post({
        title,
        description,
        image,
        intro
    })

    try{
        await createdPost.save()
    }catch(err){
        console.error(err);
        const error = new HttpError(
            'Tworzenie posta sie nie udalo spróbuj ponownie później.',500
        )
        return next(error);
    }

    res.status(201).json({post:createdPost})
}

const updatePost = async(req,res,next) => {
    const postId = req.params.pid;
    const {title, description,intro} = req.body
    let post;
    try{
        post = await Post.findById(postId);
    }catch(err){
        const error = new HttpError('Cos poszlo nie tak, nie udalo sie zaaktualizowac postu', 500)
        return next(error)
    }
    post.title = title;
    post.description = description;
    post.intro = intro

    try{
        await post.save();
    }catch(err){
        const error = new HttpError('Cos poszlo nie tak, nie udalo sie zapisac posta', 500)
        return next(error)
    }
    res.status(200).json({post: post.toObject({getters:true})})
}
const deletePost = async(req,res,next) => {
    const postId = req.params.pid;

    let post;
    try{
        post = await Post.findById(postId)
    }catch(err){
        const error = new HttpError('Nie udalo sie usunac posta', 500)
        return next(error)
    }
    if(!post){
        const error = new HttpError('Nie udalo sie znalezc posta',404)
        return next(error)
    }
    try{
        await post.deleteOne({ _id: postId });
    }catch(err){
        const error = new HttpError('Nie udalo sie usunac posta',500)
        return next(error)
    }

    res.status(200).json({message: "Post zostal usunięty."})
}
const getPosts = async(req,res,next) => {
    let posts;

    try{
        posts = await Post.find({});
    }catch(err){
        const error = new HttpError('Nie udało się wyszukać postów, spróbuj ponownie później.', 500)
        return next(error)
    }
    res.json({posts})
}

exports.createPost = createPost
exports.updatePost = updatePost
exports.deletePost = deletePost
exports.getPosts = getPosts