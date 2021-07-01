import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p> Copyright &copy; Awesom DJ Events</p>
            <p>Created By <span><a href="https://github.com/Mostafa-DE">Mostafa Fayyad</a></span></p>
            <p>
                <Link href="/about">
                    <a>About This Project</a>
                </Link>
            </p>
        </footer>
    )
}
