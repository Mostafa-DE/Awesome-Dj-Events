import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

export default function Search() {
    const [term, setTerm] = useState("");
    const router = useRouter();
    const handleChange = (evnt) => {
        setTerm(evnt.target.value);
    }

    const handleSubmit = (evnt) => {
        evnt.preventDefault();
        router.push(`/events/search?term=${term}`);
        setTerm("");
    }
    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={term} 
                    onChange={handleChange} 
                    placeholder="Search..." 
                />
            </form>
        </div>
    )
}
