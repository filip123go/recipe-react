import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import './App.css';

const App = () => {

    const APP_ID = "b9819886";
    const APP_KEY = "8f19ef083314ab1c2d87b506ed3c7d7b";

    const [recipes, setRecipes] = useState([]) ; //empty array of obj
    const [search, setSearch] = useState(('')) ;
    const [query, setQuery] = useState('chicken');

    useEffect(() => {                   //runs every time something changes
        getRecipes();
    }, [query]);                             // specify inside [] what changes , leave it empty to run only once

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data =await response.json();
        setRecipes(data.hits);
        console.log(data.hits);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search);
    };

    const getSearch = e =>{
        e.preventDefault();
        setQuery(search);
        setSearch(''); // set search text to empty after search

    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input
                    className="search-bar"
                    type="text"
                    value={search}
                    onChange={updateSearch}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (
                <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}
                />
            ))}
            </div>
        </div>
    )
};

export default App;
