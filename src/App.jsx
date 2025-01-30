import { useState, useEffect } from 'react'
import './App.css'

function CardPokemon({pokemon, onClick}){
  return (
    <article onClick={onClick}>
      <img src={pokemon.image} alt={"portrait de "+pokemon.name} />
      <h2>{pokemon.name}</h2>
    </article>
  )
}

function ProfilPokemon({pokemon}){
  return(
    <article className='profilPokemon'>
      <section className='avatar'>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
      </section>
      <section className='type'>
        <h2>TYPE</h2>
        <div>
          {pokemon.apiTypes.map((type, index)=>(
            <div key={index}>
              <img src={type.image} alt={"Pokemon de type "+type.name} />
              <p>{type.name}</p>
            </div>
          ))}
        </div>
      </section>
      <section className='stats'>
        <div>
          <h2>PV : {pokemon.stats.HP}</h2>
          <h2>Vitesse : {pokemon.stats.speed}</h2>
        </div>
        <div>
          <h2>Attaque : {pokemon.stats.attack}</h2>
          <h2>Défense : {pokemon.stats.defense}</h2>
        </div>
      </section>
    </article>
  )
}

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemon, setPokemon] = useState({})

  useEffect(()=>{
    const abortControler = new AbortController()

    fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/10',{
      signal : abortControler.signal
    })
    .then(response => response.json())
    .then(json => {
      setPokemonList(json)
    })

    return ()=>{
      abortControler.abort()
    }
  },[])

  useEffect(()=>{
    const originaltitle = document.title
    if(pokemon.name){
      document.title = pokemon.name
    }

    return ()=>{
      document.title = originaltitle
    }
  },[pokemon])

  console.log(pokemon)

  return (
    <>
      <h1>POKEDEX</h1>
      <section className='pokemonList'>
        {pokemonList.map((pokemon,index) => (<CardPokemon key={index} pokemon={pokemon} onClick={()=>{setPokemon(pokemon)}}/>))}
      </section>
      {pokemon.name && <ProfilPokemon pokemon={pokemon}/>}
    </>
  )
}

export default App
