import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const AuthProtected = ({ children }) => {
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    useEffect(() => {
        if (!state?.user?.name) {
            router('/login')
        }
    }, [state])

    return state?.user?.name ? children : null;
}

export default AuthProtected