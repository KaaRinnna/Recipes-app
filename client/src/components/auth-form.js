import {Input, Button} from "@nextui-org/react";

export const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
    return (
        <div className="auth-container">
            <form onSubmit={onSubmit} className="form">
                <h2 className="text-white text-2xl mb-1 pt-3">{label}</h2>
                <Input
                    isRequired
                    type="text"
                    id="username"
                    value={username}
                    label="Имя пользователя"
                    className="max-w-xs form-item"
                    onChange={(e) => setUsername(e.target.value)}/>
            
                <Input
                    isRequired
                    label="Пароль"
                    type="password"
                    id="password"
                    value={password}
                    className="max-w-xs form-item"
                    onChange={(e) => setPassword(e.target.value)}/>
                
                <Button color="primary" className="max-w-xs self-center" type="submit">Submit</Button>
            </form>
        </div>
    )
}