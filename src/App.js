import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonInfo, setPokemonInfo] = useState(null);
  const [error, setError] = useState('');

  const fetchPokemonData = () => {
    setError('');
    setPokemonInfo(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then(data => {
        setPokemonInfo({
          name: capitalizeFirstLetter(data.name),
          image: data.sprites.front_default,
          types: data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', '),
          height: data.height / 10,
          weight: data.weight / 10,
        });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container">
      <video autoPlay muted loop style={{ width: '100%', position: 'fixed', zIndex: '-1' }}>
        <source src="/Purple and Red Neon Game Youtube Intro.mp4" type="video/mp4" />
      </video>

      <h1>Pokémon Fetcher</h1>
      <input
        type="text"
        id="pokemonName"
        placeholder="Enter Pokémon name"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={fetchPokemonData}>Let's Go!!!</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemonInfo && (
        <div className="pokemon-info">
          <img src={pokemonInfo.image} alt={pokemonInfo.name} />
          <h2>{pokemonInfo.name}</h2>
          <p><strong>Type:</strong> {pokemonInfo.types}</p>
          <p><strong>Height:</strong> {pokemonInfo.height} m</p>
          <p><strong>Weight:</strong> {pokemonInfo.weight} kg</p>
        </div>
      )}
    </div>
  );
};

export default App;
