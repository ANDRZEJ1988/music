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
        const {artist: {bio: {content}, name, tags: {tag}, image: [, img]}} = answer;
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
        <div>
            <div>
                <Link to='/search'>Search page</Link>
            </div>
            <div className="box">
                {
                    list.map((value, index) => {
                        return (
                            <div key={value.artist.mbid + index} className="box-one">
                                <div className="cardss">
                                    <div>
                                        <img className="cardss-img" src={value.image[0]['#text']}
                                             alt="poster"/>
                                    </div>
                                    <div className="cardss-title">
                                        <h3>{value.name}</h3>
                                    </div>
                                    <ul className="cardss-movie-gen">
                                        <li onClick={() => showArtist(value.artist)}>{value.artist.name}</li>
                                        <a href={value.artist.url} target='_blank' rel="noreferrer">link to
                                            the {value.artist.name}</a>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
