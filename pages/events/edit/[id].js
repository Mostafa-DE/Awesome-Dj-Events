import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from '@/styles/Add.module.css';
import moment from 'moment';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import Model from '@/components/Model';
import ImageUpload from '@/components/ImageUpload';

export default function EditEventPage({evnt}) {
    const [values, setValues] = useState({
        name: evnt.name,
        performers: evnt.performers,
        venue: evnt.venue,
        address: evnt.address,
        date: evnt.date,
        time: evnt.time,
        description: evnt.description
    });
    const [imagePreview, setImagePreview] = 
        useState(evnt.image ? evnt.image.formats.thumbnail.url : null
    );
    const [showModel, setShowModel] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        /* ------------------ validation Fields ----------------------- */
        const hasEmptyFields = Object.values(values).some(
            (element) => element === "" );
        if(hasEmptyFields) {
            toast.error("Please Fill All The Fields!!")
        }
        /* ---------------------------X---------------------------------*/
        
        const res = await fetch(`${API_URL}/events/${evnt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        // const evnt = await res.json();
        // console.log(evnt.id);
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

    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/events/${evnt.id}`);
        const data = await res.json();
        setImagePreview(data.image.formats.thumbnail.url);
        setShowModel(false);
    }

    return (
        <Layout title="Edit Event">
            <Link href="/"><a className="btn">Home Page</a></Link>
            <h1>Edit Events!!</h1>
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
                            value={moment(values.date).format('yyyy-MM-DD')}
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
                <input type="submit" value="Edit Event" className={styles.btn} />
            </form>
            <h2>Event Image:</h2>
            {imagePreview ? (<Image src={imagePreview} height={100} width={170} />) : 
                <div>
                    <p>No image uploaded</p>
                </div>
            }
            <div>
                <button className="btn" onClick={() => setShowModel(true)}>
                    <FaImage /> Set Image
                </button>
            </div>

            <Model show={showModel} onClose={() => setShowModel(false)}>
                <ImageUpload evntId={evnt.id} imageUploaded={imageUploaded} />
            </Model>
        </Layout>
    )
}



export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`);
    const evnt = await res.json();
    return {
        props: {
            evnt
        }
    }
}
