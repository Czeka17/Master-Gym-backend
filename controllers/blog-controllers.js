const Post = require('../models/post')
const HttpError = require('../models/http-error')

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
const getPostById = async(req,res,next) => {
    const postId = req.params.pid;
    let post;
    try{
        post = await Post.findById(postId);
    }catch(err){
        const error = new HttpError('Cos poszlo nie tak, nie udalo sie znalezc postu', 500)
        return next(error)
    }
    res.status(200).json({post})
}

exports.getPosts = getPosts
exports.getPostById = getPostById