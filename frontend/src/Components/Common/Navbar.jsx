import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { state, dispatch } = useContext(AuthContext);
    const router = useNavigate()


    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: "50%", display: 'flex', justifyContent: 'space-around' }}>
                <h4>Logo</h4>

                {state?.user?.role != "Seller" && <h4>Mens</h4>}
                {state?.user?.role != "Seller" && <h4>Women</h4>}
                {state?.user?.role != "Seller" && <h4>Kids</h4>}
                {/* seller */}
                {state?.user?.role == "Seller" && <h4 onClick={() => router("/add-product")}>Add Product</h4>}
                {state?.user?.role == "Seller" && <h4 onClick={() => router("/your-products")}>Your Products</h4>}


            </div>
            <div style={{ width: "20%", display: 'flex', justifyContent: 'space-around' }}>
                {state?.user?.name ? <>
                    {state?.user?.role == "Buyer" && <h4>Cart</h4>}
                    <h4>Profile</h4>
                    <h4 onClick={() => dispatch({ type: "LOGOUT" })}>Logout</h4>
                </> : <h4 onClick={() => router('/login')}>Login/Register</h4>}
            </div>
        </div>
    )
}

export default Navbar