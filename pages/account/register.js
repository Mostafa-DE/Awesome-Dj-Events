import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from '@/styles/AuthForm.module.css';
import useRegister from "Hooks/useRegister";
import AuthContext from "@/context/AuthContext";

export default function loginPage() {
    const [username, setUsername, handleUsername] = useRegister("");
    const [email, setEmail, handleEmail] = useRegister("");
    const [password, setPassword, handlePassword] = useRegister("");
    const [passwordConfirm, setPasswordConfirm, handlePasswordConfirm] = useRegister("");

    const { register, error} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== passwordConfirm) {
            return toast.error("Password & Confirm Password must be match!!");
        }
        register({username,email, password});
        setEmail("");
        setPassword("");
        setUsername("");
        setPasswordConfirm("");
    }

    return (
        <Layout title="User Register">
            <div className={styles.auth}>
                <h1><FaUser /> Register</h1>
                <ToastContainer position="top-center" style={{marginTop: "2rem"}} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleUsername}
                />
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
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    value={passwordConfirm}
                    onChange={handlePasswordConfirm}
                />
                <input
                    type="submit"
                    value="Login"
                    className={styles.btn}
                    onSubmit={handleSubmit}
                />
            </form>
            <p>Do you have an account?? <Link href="/account/login"><a>Login</a></Link></p>
            </div>

        </Layout>
    )
}
