import React from 'react';
import {useSelector} from "react-redux";
import {infoSelector} from "../../store/selectors";
import "./Artist.scss";
import {Link} from "react-router-dom";

export const Artist = () => {
    const info = useSelector(infoSelector);
    return (
        <div className="container">
            <div className='navigate'>
                <Link className='link' to="/">Mane page</Link>
                <Link className='link' to="/search">Search page</Link>
            </div>
            <div className="cards">
                <div className='divimage'>
                    <img className="divimage-img" src={info.img['#text']}
                        alt="poster"/>
                </div>
                <div className="cards-title">
                    <h2>{info.name}</h2>
                    <ul>{
                        info.tag.map((value, index) => {
                            return (
                                <li key={index}>{value.name}</li>
                            )
                        })
                    }</ul>
                    <p className="description">{info.content}</p>
                </div>
            </div>
        </div>
    );
}
