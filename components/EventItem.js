import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

export default function EventItem({evnt}) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image src={evnt.image ? evnt.image : null} width={180} height={100} />

            </div>
            <div className={styles.info}>
                <span>{evnt.date}</span>
                <h3>{evnt.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${evnt.slug}`}><a className={styles.btn}>Details</a></Link>
            </div>
        </div>
    )
}
