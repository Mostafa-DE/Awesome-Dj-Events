import { useContext } from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';

export default function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Awesome DJ Events</a>
                </Link>
            </div>
            <Search />

            <nav>
                <ul>
                    <li>
                        <Link href='/events' >Events</Link>
                    </li>
                    {
                        user ?
                        ( // if user logged in
                        <>
                        
                            <li>
                                <Link href="/events/add">
                                    <a>Add Event</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/dashboard">
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/login/">
                                    <a className="btn-login-logout" > <FaSignOutAlt /> Logout</a>
                                </Link>
                            </li>
                        </>
                        ) :
                        ( // if user logged out
                        <>
                            <li>
                                <Link href="/account/login/">
                                    <a className="btn-login-logout"><FaSignInAlt /> Login</a>
                                </Link>
                            </li>
                        </>
                        )
                    }



                </ul>
            </nav>

        </header>
    )
}
