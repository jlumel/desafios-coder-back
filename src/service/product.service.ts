import productModel from '../models/product.model'
import { Request, Response } from 'express'

const productService = {

    getProducts: (req: Request, res: Response) => {
        productModel.find({})
            .then(products => res.send(products))
            .catch(err => {
                res.send({error: 1, descripcion: "No hay productos cargados"})
                console.log(err)
            })
    },

    addProduct: (req: Request, res: Response) => {

        const { timestamp, title, description, code, price, stock, thumbnail } = req.body
        const producto = {
            timestamp,
            title,
            description,
            code,
            price,
            stock,
            thumbnail
        }
        const nuevoProducto = new productModel(producto)
        nuevoProducto.save()
            .then(() => res.sendStatus(201))
            .catch(err => {
                res.send({error: 2, descripcion: "Error al cargar el producto"})
                console.log(err)
            })
    },

    getProductById: (req: Request, res: Response) => {
        const id = req.params.id
        productModel.find({ "_id": id })
            .then(product => res.send(product))
            .catch(err => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                console.log(err)
            })
    },

    getProductByTitle: (req: Request, res: Response)=> {
        const {title} = req.body
        productModel.find({ "title": title })
            .then(product => res.send(product))
            .catch(err => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                console.log(err)
            })
    },

    getProductsByPrice: (req: Request, res: Response)=> {
        const {min, max} = req.body
        productModel.find({ price: {$lte: Number(max), $gte: Number(min)}})
            .then(product => res.send(product))
            .catch(err => {
                res.send({error: 3, descripcion: "Producto no encontrado"})
                console.log(err)
            })
    },

    updateProduct: (req: Request, res: Response) => {
        const id = req.params.id
        const { timestamp, title, description, code, price, stock, thumbnail } = req.body
        const producto = {
            timestamp,
            title,
            description,
            code,
            price,
            stock,
            thumbnail
        }
        productModel.updateOne({ "_id": id },
            {
                $set: { ...producto }
            }
        )
            .then(producto => res.send(producto))
            .catch(err => {
                res.send({error: 4, descripcion: "No se pudo actualizar el producto"})
                console.log(err)
            })
    },

    removeProduct:(req: Request, res: Response) => {
        const id = req.params.id
        productModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch(err => {
                res.send({error: 5, descripcion: "No se pudo eliminar el producto"})
                console.log(err)
            })
    }

}

export default productService