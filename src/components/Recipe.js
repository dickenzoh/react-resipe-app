import React from 'react';
import {Link } from 'react-router-dom'

const API_KEY = "7e5755dfb0a5b6d5d99cb489c2570b9c";

class Recipe extends React.Component {
    state = {
        activerecipe: []
    }

    componentDidMount = async () =>{
    const title = this.props.location.state.recipe;
    const req = await fetch(`https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${title}`);

    const res = await req.json();
    this.setState({activerecipe: res.recipes[0] });
    console.log(this.state.activerecipe);
    }

    render() { 
        const recipe = this.state.activerecipe;
        return ( 
            <div className="container">
                {this.state.activerecipe.length !==0 && 
                    <div className="active-recipe">
                        <img className="active-recipe__img" src={recipe.img_url} alt={recipe.title}/>
                        <h3 className="active-recipe__title">{recipe.title}</h3>
                        <h4 classNmae="active-recipe__publisher">
                        Publisher: <span>{ recipe.publisher}</span>
                        </h4>
                        <p className="active-recipe__website">Website:
                            <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                        </p>
                        <button className="active-recipe__button">
                            <Link to="/">Go Home</Link>
                            </button>   
                    </div>
                }
                
            </div> 
            ); 
    }
}
 
export default Recipe;