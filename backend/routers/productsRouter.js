import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getProducts, updateProduct } from '../data.js';

const productsRouter = express.Router();

productsRouter.get('/', expressAsyncHandler(async (req, res) => {
  const products = getProducts();
  return res.status(200).send({ products });
}));

productsRouter.put('/:productId', expressAsyncHandler(async (req, res) => {
  let updatedProducts = updateProduct(req.body);

  return res.status(200).send({ products: updatedProducts });
}));


export default productsRouter;
