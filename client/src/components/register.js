import {useState} from "react";
import {Form} from "./auth-form";
import axios from "axios";

export const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", { username, password });
            alert("You registered successfully.")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={onSubmit}
        />
    )
}