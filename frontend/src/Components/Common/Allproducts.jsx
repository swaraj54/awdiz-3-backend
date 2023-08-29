import React, { useEffect, useState } from 'react'
import api from '../ApiConfig';
import { toast } from 'react-hot-toast';

const Allproducts = () => {
    const [products, setProducts] = useState();
    console.log(products, "products")
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get("/all-products");
                if (response.data.success) {
                    setProducts(response.data.products)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getProducts();
    }, [])
    return (
        <div>Allproducts</div>
    )
}

export default Allproducts