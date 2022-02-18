import React from "react";
import './MovieRow.css';
import { useState } from "react";

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(-500)
    
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0
        }
        setScrollX(x);
    }

    const handleRightArrow  = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 170;
        if ((window.innerWidth - listW) > x ){
            x = (window.innerWidth - listW) - 60
        }
        setScrollX(x)
    }


    return (
        <div className="movieRow">
             <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M30.83 14.83l-2.83-2.83-12 12 12 12 2.83-2.83-9.17-9.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M20 12l-2.83 2.83 9.17 9.17-9.17 9.17 2.83 2.83 12-12z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div className="movieRow--item" key={key}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt='poster'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}