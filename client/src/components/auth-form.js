import {Input, Button} from "@nextui-org/react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

export const Form = ({ label, onSubmit }) => {
    const schema = yup.object().shape({
        username: yup.string().required('Введите имя пользователя').min(2),
        password: yup.string().required('Введите пароль').min(5),
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    })

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <h2 className="text-white text-2xl mb-1 pt-3">{label}</h2>
                {errors.username && <p className="error-message">{errors.username.message}</p>}
                {errors.password && <div className="error-message">{errors.password.message}</div>}
                <Input
                    isRequired
                    type="text"
                    {...register("username")}
                    label="Имя пользователя"
                    className="max-w-xs form-item"
                />
            
                <Input
                    isRequired
                    label="Пароль"
                    type="password"
                    className="max-w-xs form-item"
                    {...register("password")}
                />
                
                <Button color="primary" className="max-w-xs self-center" type="submit">Submit</Button>
            </form>
        </div>
    )
}