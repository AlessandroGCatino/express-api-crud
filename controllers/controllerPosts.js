const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        data = req.body;
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
            res.status(200).send(post);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
}

const index = async (req, res, next) => {
    res.send()

}

const update = async (req, res, next) => {
    res.send()

}

const destroy = async (req, res, next) => {
    res.send()

}

module.exports = { create, show, index, update, destroy };