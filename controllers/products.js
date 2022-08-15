const express = require('express')
const Product = require('../models/Product')

const getProducts = async( req, res = response ) => {

    const products = await Product.find()
    res.json({
        ok: true,
        products
    })
}

const createProduct = async( req, res = response ) => {
    const product = new Product( req.body )
    try {

       const saveProduct =  await product.save()
        res.json({
            ok: true,
            product: saveProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en la comunicación de la base de datos'
        })
    }
}

const updateProduct = async( req, res = response ) => {

    const ProductId = req.params.id

    try {

        const product = await Product.findById(ProductId)
        if(!product) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el producto'
            })
        }
        const newProduct = {
            ...req.body
        }
        const productUpdate = await Product.findByIdAndUpdate( ProductId, newProduct, { new: true } )

        res.json({
            ok: true,
            product: productUpdate
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en la comunicación de la base de datos'
        })
    }
}

const deleteProduct = async( req, res = response ) => {
    const ProductId = req.params.id
    try {
        const product = await Product.findById(ProductId)
        if(!product) {
            res.status(404).json({
                ok: false,
                msg: 'No existe el producto'
            })
        }
       
        const productDelete = await Product.findByIdAndDelete(ProductId)

        res.json({ ok: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en la comunicación de la base de datos'
        })
        
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct }