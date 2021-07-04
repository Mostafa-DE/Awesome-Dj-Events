import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from '@/styles/AuthForm.module.css';
import useLogin from "Hooks/useLogin";
import AuthContext from "@/context/AuthContext";

export default function loginPage() {
    const [email, setEmail ,handleEmail] = useLogin("");
    const [password, setPassword ,handlePassword] = useLogin("");
    
    const { login, error } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({email, password});
        login({email, password});
        setEmail("");
        setPassword("");

    }

    return (
        <Layout title="User Login">
            <div className={styles.auth}>
                <h1><FaUser /> Log In</h1>
                <ToastContainer />
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address:</label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmail}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                />
                <input
                    type="submit"
                    value="Login"
                    className={styles.btn}
                    onSubmit={handleSubmit}
                />
            </form>
            <p>Don't have an account?? <Link href="/account/register"><a>Register</a></Link></p>
            </div>

        </Layout>
    )
}
