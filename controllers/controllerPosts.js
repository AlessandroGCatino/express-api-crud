const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        const data = req.body;
        data.slug = data.slug.toLowerCase();
        // let newSlug = data.slug;
        // newSlug = newSlug.toLowerCase();
        // data.slug = newSlug;
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
    res.send()

}

const destroy = async (req, res, next) => {
    res.send()

}

module.exports = { create, show, index, update, destroy };