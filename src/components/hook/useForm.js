import {useState} from "react";

const useForm = (initValue) => {
    const [values,setValues] = useState(initValue);
    return[
        values,
        e => {
            setValues({
                ...values,
                [e.target.name] : e.target.value
            })
        }
    ]
}

export default useForm;