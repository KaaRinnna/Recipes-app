import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styles from "./CreateRecipeForm.module.css";
import {Input, Button, Textarea} from "@nextui-org/react";

export const CreateRecipeForm = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    }

    const deleteItem = (idx) => {
        const ingredients = recipe.ingredients.filter((_, index) => index !== idx);
        setRecipe({...recipe, ingredients})
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe, { headers: { authorization: cookies.access_token } });
            alert("Recipe Created");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className={styles.parent}>
            <div className={styles.innerForm}>
                <h2>Создать рецепт</h2>
                <form onSubmit={onSubmit} className="form">
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <p>Название</p>
                            <Input
                                isRequired
                                type="text"
                                name="name"
                                label="Название рецепта"
                                onChange={handleChange}
                                variant="bordered"
                                className="max-w-[400px]"
                                size="lg"
                            />
                            <p>Время приготовления</p>
                            <Input
                                type="number"
                                name="cookingTime"
                                label="Время приготовления (минуты)"
                                onChange={handleChange}
                                className="max-w-[400px]"
                                variant="bordered"
                                size="lg"
                            />
                        </div>
                        <div className={styles.right}>
                            <p>Ингредиенты</p>
                            {recipe.ingredients.map((ingredient, idx) => (
                                <div key={idx} className={styles.ingrForm}>
                                    <Input 
                                        type="text" 
                                        name="ingredients" 
                                        label="Ингредиент"
                                        value={ingredient}
                                        className="max-w-[360px] max-sm:max-w-[300px]"
                                        size="sm"
                                        variant="bordered"
                                        onChange={(event) => handleIngredientChange(event, idx)} />
    
                                    <button className={styles.deleteBtn} onClick={() => deleteItem(idx)} type="button">✖️</button>
                                </div>
                            ))}
                            <Button onClick={addIngredient} type="button" className={styles.addBtn} >Добавить ингредиенты</Button>
                        </div>
                    </div>
                    
                    <div className={styles.bottom}>
                        <p>Инструкция</p>
                        <Textarea 
                            id="instructions" 
                            name="instructions" 
                            onChange={handleChange}
                            size="lg"
                            variant="bordered" />
                    </div>
    
                    <Button className={styles.submitBtn} type="submit">Создать рецепт</Button>
                </form>
            </div>
        </div>
    )
}