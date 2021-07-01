import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function EventsPage({events}) {
//   console.log(events);
  return (
    <Layout>
      <h1>Events List!!</h1>
      {events.length === 0 && <h1>Sorry, No events to show now!!</h1>}
      { events.map( evnt => (
        <EventItem key={evnt.id} evnt={evnt} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();
  return {
    props: {events}
  }
}
