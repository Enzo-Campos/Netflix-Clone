import './app.css'
import React from "react";
import tmdb from "./tmdb.js";
import { useEffect } from "react";
import { useState } from "react";
import MovieRow from "./components/movieRow";
import FeaturedMovie from './components/featuredMovie';
import Header from "./components/header"

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() =>{
    const loadAll = async () => {
      //Pegando a lista inteira
      let list = await tmdb.getHomeList();
      setMovieList(list)

      //Pegando o fetured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);
    }

    loadAll()
  }, []);

  useEffect(() =>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener);

    return() => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])


  return (
    <div className="page">

      <Header black={blackHeader} />

    {featuredData &&
    <FeaturedMovie item={featuredData}/>}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Feito com <span role='img' aria-label='coração'>💖</span> por Enzo Campos<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos da API de Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
         <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt='loading'/>
      </div>}
    </div>
  )
}