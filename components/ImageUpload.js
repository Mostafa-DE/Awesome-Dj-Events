import { useState } from "react";
import { API_URL } from "../config/index";
import styles from '@/styles/Add.module.css';

export default function ImageUpload({evntId, imageUploaded}) {
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'events');
        formData.append('refId', evntId);
        formData.append('field', 'image');
        
        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        if(res.ok) {
            imageUploaded();
        }
    }
    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    

    return (
        <div className={styles.form}>
            <h1>upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className={styles.btn} />
            </form>
        </div>
    )
}
