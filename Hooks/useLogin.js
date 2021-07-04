
import {useState} from 'react'

export default function useLogin() {
    const [state, setstate] = useState("");
    const handleChange = (e) => {
        setstate(e.target.value);
    }
    return [state, setstate ,handleChange];
}
