import React from 'react';
import {useSelector} from "react-redux";
import {infoSelector} from "../../store/selectors";
import "./Artist.scss";
import {Link} from "react-router-dom";

export const Artist = () => {
    const info = useSelector(infoSelector);
    return (
        <div className="container">
            <Link to="/">Mane page</Link>
            <Link to="/search">Search page</Link>
            <div className="movie" >
                <div>
                    <img className="movie-img" src={info.img['#text']}
                         alt="poster"/>
                </div>
                <div className="movie-title">
                    <h3>{info.name}</h3>
                </div>
                <ul className="movie-movie-gen">
                    {
                        info.tag.map((value, index) => {
                            return (
                                <li key={index}>{value.name}</li>
                            )
                        })
                    }
                </ul>
                <p className="movie-description">{info.content}</p>
            </div>
        </div>
    );
}
