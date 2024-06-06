const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        const data = req.body;
        data.slug = data.slug.toLowerCase();
        const newPost = await prisma.Post.create({data})
        res.status(200).send(newPost);
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    try {
        const searchedSlug = req.params.slug;
        const post = await prisma.Post.findUnique({
            where: { slug: searchedSlug }
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } catch (e) {
        next(e);
    }
}

const index = async (req, res, next) => {
    try{
        let {published, content} = req.query;
        if (published){
            if (published === "true") {
                published = true;
            } else if (published === "false") {
                published = false;
            }
        }
        const posts = await prisma.Post.findMany({
            where:{
                published,
                content: {
                    contains: content
                }
            }
        });
        res.status(200).send(posts);
    } catch(e){
        next(e);
    }
}

const update = async (req, res, next) => {
    try{
        const data = req.body
        console.log(data);
        if (!req.params.slug){
            res.status(400).send({ error: "Slug is required" });
        }
        if (data.slug){
            data.slug = data.slug.toLowerCase();
        }
        const checkExist = await prisma.Post.findUnique({ where: { slug: req.params.slug } });
        if (!checkExist) {
            res.status(404).send({ error: "Post not found, can't update" });
        }
        const updatedPost = await prisma.Post.update({
            where: { slug: req.params.slug },
            data: data
        })
        res.status(200).send({
            message: `Campo/i ${Object.keys(data).map(param => param).join(", ")} modificati`,
            post: updatedPost});
    } catch (e) {
        next(e);
    }

}

const destroy = async (req, res, next) => {
    try{
        const checkExist = await prisma.Post.findUnique({ where: {slug: req.params.slug}});
        if(!checkExist){
            res.status(404).send({ error: "Post not found, can't delete" });
        }
        const deletedPost = await prisma.Post.delete({
            where: { slug: req.params.slug }
        });
        res.status(200).send({
            message: `Il Post "${deletedPost.slug}" eliminato`,
        });
    } catch (e) {
        next(e);
    }
}

module.exports = { create, show, index, update, destroy };