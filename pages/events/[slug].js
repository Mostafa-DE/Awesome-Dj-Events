import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from '@/styles/Event.module.css';
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa"


export default function EventPage({evnt}) {
    const deleteEvent = (evnt) => {
        console.log("Delete Event");
    }
    console.log(evnt);
    return (
        <Layout>
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${evnt.id}`}>
                        <a>
                           <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a 
                        href="#" 
                        className={styles.delete} 
                        onClick={deleteEvent}
                    >
                        <FaTimes /> Delete Event!!
                    </a>
                </div>
                <span>
                    {evnt.date} at {evnt.time}
                </span>
                <h1>{evnt.name}</h1>
                { evnt.image && (
                    <div className={styles.image}>
                        <Image src={evnt.image} width={960} height={600} />
                    </div>
                )}
                <h3>Performers:-</h3>
                <p>{evnt.performers}</p>
                <h3>Description:-</h3>
                <p>{evnt.description}</p>
                <h3>Venue: {evnt.venue}</h3>
                <h3>Address: {evnt.address}</h3>

            </div>
            <div style={{marginTop: "2rem"}}>
                <Link href="/events">
                    <a className="btn">Back To Events</a>
                </Link>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({query: {slug}}) {
    const res = await fetch(`${API_URL}/api/events/${slug}`);
    const events = await res.json();

    return {
        props: {
            evnt: events[0]
        }
    }
}

