import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import jsonData from './characters.json';
import Header from './header';
import Body from './body';
import Details from './details';

class App extends Component {
  state = {
    allFilms: [],
    characters: jsonData['characters'] || [],
    selectedCharacter: {},
    showDetails: false
  };
  getFilms = () => {
    fetch('https://swapi.co/api/films/')
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        toast.warn("No films found", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    })
    .then(data => {
      if(data){
        const films = data.results || [];
        const formatData = {};
        for(let i = 0; i < films.length; i++){
          formatData[films[i].episode_id] = films[i];
        }
        this.setState({
          allFilms: formatData
        });
      }
      else{
        this.setState({
          allFilms: {}
        });
      }
    });
  };
  getDetails = character => {
    fetch(character.url) 
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{        
        toast.warn("No films found", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      }
    })
    .then(data => {
      if(data){
        (data.films || []).sort();
        this.setState({
          showDetails: true,
          selectedCharacter: data
        });
      }
      else{
        this.setState({
          showDetails: false,
          selectedCharacter: {}
        });
      }
    })
  };
  selectCharacter = index => {
    const { characters } = this.state;
    this.getDetails(characters[index]);    
  };
  closeCharacter = () => {
    this.setState({
      showDetails: false,
      selectedCharacter: {}
    });
  };
  componentDidMount = () => {
    this.getFilms();
  };
  render() {
    const { characters, selectedCharacter, showDetails, allFilms } = this.state;
    return (
        <div className="container">
        <Header/>
        { showDetails ? <Details character={selectedCharacter} closeCharacter={this.closeCharacter} 
                                allFilms={allFilms}/> :  
        <Body characters={characters} selectCharacter = {this.selectCharacter} /> }
        <ToastContainer autoClose={3000} />
        </div>
    );
  }
}

export default App;
