import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'
import Allproducts from './Common/Allproducts';

const Home = () => {
    const { state } = useContext(AuthContext);
    // console.log(state?.user, "- user")
    return (
        <div>
            <h1>Home User name - {state?.user?.name}</h1>
            <Allproducts />
        </div>
    )
}

export default Home