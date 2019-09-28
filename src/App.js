import React, { Component } from 'react';
import './App.css';
import Form from "./components/form";
import Recipe from "./components/Recipes"

const API_KEY = "7e5755dfb0a5b6d5d99cb489c2570b9c";

class App extends Component {
  state ={
    recipes: []
  }
  getRecipe = async (e) => {
    const recipeName =e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);

    const data = await api_call.json();
    this.setState({ recipes: data.recipes});
    console.log(this.state.recipes);
  }

  componentDiMount = () =>{
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes});
  }

  componentDidUpdate = () =>{
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe ={this.getRecipe} />
        <Recipe recipes = {this.state.recipes} />
        
      </div>
    );
  }
}
export default App;