import React, { useState } from 'react';
import { storage, db, ref, uploadBytesResumable, getDownloadURL, collection, addDoc } from '../config/Config';

const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg'];

    const productImgHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('');
        } else {
            setProductImg(null);
            setError('Please select a valid image type (PNG or JPEG)');
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();
        
        try {
            const storageRef = ref(storage, `product-images/${productImg.name}`);
            const uploadTask = uploadBytesResumable(storageRef, productImg);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload progress: ${progress}%`);
                },
                (err) => {
                    setError(err.message);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'Products'), {
                        productName,
                        productPrice: Number(productPrice),
                        productImg: downloadUrl
                    });
                    setProductName('');
                    setProductPrice(0);
                    setProductImg(null);
                    setError('');
                    document.getElementById('file').value = '';
                }
            );
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">ADD PRODUCTS</h2>
            <hr className="mb-6" />
            <form onSubmit={addProduct} className="flex flex-col max-w-md mx-auto">
                <label htmlFor="product-name" className="mb-2 font-semibold">Product Name</label>
                <input type="text" required onChange={(e) => setProductName(e.target.value)} value={productName} className="border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500" />
                
                <label htmlFor="product-price" className="mb-2 font-semibold">Product Price</label>
                <input type="number" required onChange={(e) => setProductPrice(e.target.value)} value={productPrice} className="border border-gray-300 px-3 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500" />
                
                <label htmlFor="product-img" className="mb-2 font-semibold">Product Images</label>
                <input type="file" id="file" required onChange={productImgHandler} className="mb-4" />
                
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300">Add Product</button>
            </form>
            {error && <span className="text-red-500 mt-4">{error}</span>}
        </div>
    );
};

export default AddProducts;
