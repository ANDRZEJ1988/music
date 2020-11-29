import React, {useCallback, useEffect} from 'react';
import {key} from "../../constants/constants";
import {useDispatch, useSelector} from "react-redux";
import {listSelector} from "../../store/selectors";
import {getListAction, setInfoAction} from "../actions/actions";
import './Main.scss';
import {Link, useHistory} from 'react-router-dom';
import {getRequest} from "../../functions/function";

export const Main = () => {
    const list = useSelector(listSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    const getList = useCallback(async () => {
        const answer = await getRequest(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&
api_key=${key}&format=json`);
        const {tracks: {track}} = answer;
        dispatch(getListAction(track));
    }, [dispatch])
    const showArtist = async (artist) => {
        const answer = await getRequest(`http://ws.audioscrobbler.com/2.0/?method=artist.
getinfo&artist=${artist.name}&api_key=${key}&format=json`);
        console.log(answer);
        const {artist: {bio: {content}, name, tags: {tag}, image: [,,,, img]}} = answer;
        const info = {
            name: name,
            content: content,
            img: img,
            tag: tag
        };
        dispatch(setInfoAction(info));
        history.push(`/artist/${artist.name}`);
    };
    useEffect(() => {
        getList();
    }, [getList]);
    return (
        <div className='main'>
            <div className='navigate'>
                <Link className='link' to='/search'>Search page</Link>
            </div>
            <div className="box">{
                list.map((value, index) => {
                    return (
                        <div key={value.artist.mbid + index} className="box-one">
                            <div className="cardss">
                                <img className="cardss-img" src={value.image[3]['#text']} alt="poster"/>
                                <div className="cardss-title">
                                    <h4>{value.name}</h4>
                                    <p onClick={() => showArtist(value.artist)}>{value.artist.name}</p>
                                    <a href={value.artist.url} target='_blank' rel="noreferrer">
                                        link to the artist's page
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                })
            }</div>
        </div>
    );
}
