"use client"
import { authTypes } from "@/utils/constant"
import Login from "@/components/template/login-register/login"
import Register from "@/components/template/login-register/register"
import { useState } from "react"

const Login_register = () => {
    const [authType, setAuthType] = useState(authTypes.LOGIN)

    const showRegisterForm = () => setAuthType(authTypes.REGISTER);
    const showloginForm = () => setAuthType(authTypes.LOGIN);

    return (
        <>
            {authType === authTypes.LOGIN ? (
                <Login
                    showRegisterForm={showRegisterForm} />)
                :
                (<Register
                    showloginForm={showloginForm} />)
            }
        </>
    )

}


export default Login_register;
