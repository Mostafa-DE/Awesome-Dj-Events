import Head from 'next/head';
import styles from '@/styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

export default function Layout({title, keywords, description, children}) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Header />
            { router.pathname === "/" && <Showcase />}
            <div className={styles.container}>
                {children}
            </div>
            <Footer />

        </div>
    )
}

Layout.defaultProps = {
    title: "~Awesome DJ-Events",
    description: "Now you can find the latest DJ & other musical events",
    keywords: "music, dj, edm, events"
}


{/* <Head>
<title> ~Awesome DJ-Events </title>
<meta name="description" content="Welcome everyone to Awesome Dj-Events" ></meta>
</Head> */}