import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from '@/styles/Add.module.css';
// import { object } from "prop-types";

export default function add() {
    const [values, setValues] = useState({
        name: "",
        performers: "",
        venue: "",
        address: "",
        date: "",
        time: "",
        description: ""
    })
    const router = useRouter();
    const handleSubmit = async (evnt) => {
        evnt.preventDefault();
        
        /* ------------------ validation Fields ----------------------- */
        const hasEmptyFields = Object.values(values).some(
            (element) => element === "" );
        if(hasEmptyFields) {
            toast.error("Please Fill All The Fields!!")
        }
        /* ---------------------------X---------------------------------*/
        
        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        if(!res.ok) {
            toast.error("OOPS, SOMTHING WENT WRONG!!");
        } else {
            const evnt = await res.json();
            router.push(`/events/${evnt.slug}`);
        }

    }

    const handleInputChange = (evnt) => {
        const { name, value } = evnt.target;
        setValues({...values, [name]: value});
    }

    return (
        <Layout title="Add New Event">
            <Link href="/"><a className="btn">Home Page</a></Link>
            <h1>Add New Events!!</h1>
            <ToastContainer position="top-left" closeOnClick draggable pauseOnHover />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={values.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="performers">Performers:</label>
                        <input 
                            type="text"
                            id="performers"
                            name="performers"
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="venue">Venue:</label>
                        <input 
                            type="text"
                            id="venue"
                            name="venue"
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input 
                            type="text"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input 
                            type="date"
                            id="date"
                            name="date"
                            value={values.date}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="time">Time:</label>
                        <input 
                            type="time"
                            id="time"
                            name="time"
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                    

                </div>
                <div>
                    <label htmlFor="description">Event Description:</label>
                    <textarea 
                        type="text" 
                        name="description" 
                        id="description" 
                        value={values.description}
                        onChange={handleInputChange}
                    >
                    </textarea>
                </div>
                <input type="submit" value="Add Event" className={styles.btn}></input>

            </form>
        </Layout>
    )
}
