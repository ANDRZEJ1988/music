import React from 'react';
import {getRequest} from "../../functions/function";
import {key} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {setTrackAction} from "../actions/actions";
import {trackSelector} from "../../store/selectors";
import {Link} from "react-router-dom";

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
        <div>
            <Link to="/">Mane page</Link>
            <div>
                <input type="text" className='searchContact' placeholder='Search track' onInput={search}/>
            </div>
            <div>{
                track.map((value, index) => {
                    return (
                        <div key={index + value.mbid}>
                            <h3>{value.artist}</h3>
                            <div>{value.name}</div>
                        </div>
                    )
                })}</div>
            <div>{
                track.length === 0 && <div>There are not any tracks.</div>
            }</div>
        </div>
    );
}

