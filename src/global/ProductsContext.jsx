import React, { createContext, useState, useEffect } from 'react';
import { db, collection, onSnapshot } from '../config/Config';

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsCollection = collection(db, 'Products');
        const unsubscribe = onSnapshot(productsCollection, snapshot => {
            const productsList = snapshot.docs.map(doc => ({
                ProductID: doc.id,
                ...doc.data()
            }));
            setProducts(productsList);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <ProductsContext.Provider value={{ products }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContextProvider;
