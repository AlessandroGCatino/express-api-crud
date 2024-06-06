const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res, next) => {
    try{
        data = req.body;
        const newPost = await prisma.Post.create({data})
        res.send(newPost);
        
    } catch (e) {
        next(e);
    }
}

const show = async (req, res, next) => {
    
    res.send()
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