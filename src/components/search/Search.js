import React from 'react';
import {getRequest} from "../../functions/function";
import {key} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setTrackAction} from "../actions/actions";
import {trackSelector} from "../../store/selectors";
import {Link} from "react-router-dom";
import './Search.scss';
export const Search = () => {
    const dispatch = useDispatch();
    const track = useSelector(trackSelector);
    const search = async (e) => {
        const name = e.target.value;
        if (name) {
            const answer = await getRequest(`http://ws.audioscrobbler.com/2.0/?method=track.search&
track=${name}&api_key=${key}&format=json`);
            const {results: {trackmatches: {track}}} = answer;
            dispatch(setTrackAction(track));
        } else alert('Please type the track')

    };
    return (
        <div className='container'>
            <div className='navigate'>
                <Link className='link'  to="/">Mane page</Link>
            </div>
            <div className='inp'>
                <input type="text" className='searchContact' placeholder='Search track' onInput={search}/>
            </div>
            <div className='box'>{
                track.map((value, index) => {
                    return (
                        <div className='list' key={index + value.mbid}>
                            <ul>
                                <h3>{value.artist}</h3>
                                <li>{value.name}</li>
                            </ul>
                        </div>
                    )
                })}</div>
            <div className="empty">{
                track.length === 0 && <h3>There are not any tracks.</h3>
            }</div>
        </div>
    );
}

