import Layout from "@/components/Layout";
import Link from "next/link";
import styles from '@/styles/404.module.css';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function PageNotFound() {
    return (
        <Layout title="Page Not Found">
            <div className={styles.error}>
                <h1>404 <span><FaExclamationTriangle /></span></h1>
                <h2>oops, we can't find that page!!</h2>
                <h5>Either something went wrong Or page doesn't exist anymore</h5>
                <button className={styles.link}>
                    <Link href="/" > Go Back Home </Link>
                </button>

            </div>
                       
        </Layout>
    )
}
