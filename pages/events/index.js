import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";



export default function EventsPage({events, page, total}) {
  return (
    <Layout>
      <h1>Events List!!</h1>
      {events.length === 0 && <h1>Sorry, No events to show now!!</h1>}
      { events.map( evnt => (
        <EventItem key={evnt.id} evnt={evnt} />
      ))}
        <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({query: {page = 1}}) {
  /* ---------------Calculate start page-------------- */
    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
  /* -----------------------X------------------------- */

  /* ----------------Fetch Total/Count---------------- */
    const TotalRes = await fetch(`${API_URL}/events/count`);
    const total = await TotalRes.json();
  /* -----------------------X------------------------- */

  /* --------------------Fetch Events----------------- */
    const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
    const events = await res.json();
    return {
      props: {events, page: +page, total}
    }
  /* -----------------------X------------------------- */

}
