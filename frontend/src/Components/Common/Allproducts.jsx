import React, { useEffect, useState } from 'react'
import api from '../ApiConfig';
import { toast } from 'react-hot-toast';

const Allproducts = () => {
    const [products, setProducts] = useState();
    console.log(products, "products here")
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get("/all/all-products");
                if (response.data.success) {
                    setProducts(response.data.products)
                }
            } catch (error) {
                console.log(error, "error in all prdouctd")
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