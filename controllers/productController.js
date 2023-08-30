import slugify from 'slugify';
import productModel from '../models/productModel';
import fs from 'fs'


export const createProductController = async(req,res) => {
        try{
            const {name,slug,description,price,category,quantity,shipping} = req.fields
            const {photo} = req.fields

            //validation
            switch(true){
                case !name:
                    return res.status(500).send({error: 'Name is Required'})
                case !description:
                    return res.status(500).send({error: 'Description is Required'})
                case !price:
                    return res.status(500).send({error: 'Price is Required'})
                case !category:
                    return res.status(500).send({error: 'Category is Required'})
                case !quantity:
                    return res.status(500).send({error: 'quantity is Required'})
                case photo && photo.size > 100000:
                    return res.status(500).send({error: 'Photo should be required and less than 1MB'})

            }
            const products = new productModel({...req.fields, slug:slugify(name)})
            if(photo){
                products.photo.data = fs.readFileSync(photo.path)
                products.photo.contentType = photo.type
            }
            await products.save()
            res.status(500).send({
                success:true,
                message:'Product Created successfully',
                products,
            })
        }
        catch(error){
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:'Error in Creating Product',
            });
        }
};

//get all products
export const getProductController = async(req,res) => {
    try{
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message:'AllProducts',
            products,
            counTotal: products.length

        });

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in getting products',
            error: error.message,
        });

    }
};
//get single Product
export const getSingleProductController = async(req,res) => {
        try{
                const product = await productModel
                    .findOne({slug:req.params.slug})
                    .select("-photo")
                    .populate("category");

                res.status(200).send({
                    success:true,
                    message:"Single Product Fetched",
                    product
                })
        }
        catch(error){
            console.log(error)
            res.status(500).send({
                success: false,
                message: 'Error while getting single product',
                error,
            })
        }
};

//get photo
export const productPhotoController = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting photo',
            error
        })
    }
};