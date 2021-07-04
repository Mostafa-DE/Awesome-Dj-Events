import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from 'qs';
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({events}) {
    const router = useRouter();
  return (
    <Layout title="Search Results">
        <Link href="/events"><a className="btn">Go Back To Events</a></Link>
        {events.length > 0 ? (
        <h1>Search Results For "{router.query.term}"</h1>
        ) : (<h1>Sorry, We Couldn't find any results for "{router.query.term}"" </h1>)}
      
      {/* {events.length === 0 && } */}
      { events.map( evnt => (
        <EventItem key={evnt.id} evnt={evnt} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query: {term}}) {
  const query = qs.stringify({
      _where: {
          _or: [
              {name_contains: term},
              {performers_contains: term},
              {description_contains: term},
              {venue_contains: term}
          ]
      }
  })

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();
  return {
    props: {events}
  }
}
