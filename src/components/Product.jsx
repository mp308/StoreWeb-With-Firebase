import React, { useContext } from 'react';
import { ProductsContext } from '../global/ProductsContext';
import { CartContext } from '../global/CartContext';

export const Product = () => {
    const { products } = useContext(ProductsContext);
    console.log(products);

    const data = useContext(CartContext);
    console.log(data);

    const { dispatch } = useContext(CartContext);

    return (
        <>
            {products.length !== 0 && <h1 className="py-6 border-b border-gray-300">Products</h1>}
            <div className="products-container flex justify-center items-center p-7 flex-wrap">
                {products.length === 0 && <div>Slow internet... no products to display</div>}
                {products.map(product => (
                    <div className="product-card w-72 h-auto m-5 flex flex-col justify-start items-start text-sm font-semibold text-center shadow-md relative" key={product.ProductID}>
                        <div className="product-img w-full h-48">
                            <img className="w-full h-full" src={product.productImg} alt="not found" />
                        </div>
                        <div className="product-name block w-full text-orange-500 mt-1">
                            {product.productName}
                        </div>
                        <div className="product-price w-full mt-1 mb-1">
                            Rs {product.productPrice}.00
                        </div>
                        <button className="addcart-btn bg-orange-500 text-white border-none cursor-pointer w-full py-2.5 mt-1 mb-0.5 outline-none" onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>
                            ADD TO CART
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
