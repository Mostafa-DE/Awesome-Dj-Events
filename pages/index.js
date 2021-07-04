import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function Home({events}) {
  // console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events!!</h1>
      {events.length === 0 && <h1>Sorry, No events to show now!!</h1>}
      { events.map( evnt => (
        <EventItem key={evnt.id} evnt={evnt} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  return {
    props: {events: events.slice(0 , 3)}
  }
}
