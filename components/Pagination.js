
/* This component manage all the page we have and display the current content in the page  */

import Link from "next/link";
import { PER_PAGE } from "@/config/index";


export default function Pagination({page, total}) {
    const lastPage = Math.ceil(total / PER_PAGE)
    return (
        <>
            {page > 1 && (
                <Link href={`/events?page=${page - 1}`} >
                    <a className="btn">Prev Page</a>
                </Link>
            )}
            {page < lastPage && (
                <Link href={`/events?page=${page + 1}`} >
                    <a className="btn">Next Page</a>
                </Link>
            )}
        </>
    )
}

/* ------------------------------------------X---------------------------------------------*/




