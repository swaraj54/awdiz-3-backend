import React, { useContext } from 'react'
import { AuthContext } from './Context/AuthContext'

const Home = () => {
    const { state } = useContext(AuthContext);
    // console.log(state?.user, "- user")
    return (
        <div>Home User name - {state?.user?.name}</div>
    )
}

export default Home