import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {Main} from "../main/Main";
import {Search} from "../search/Search";
import {Artist} from "../artist/Artist";

export const Navigation = () => {
    return (
        <Switch>
            <Route path="/" exact
                   render={(routerProps) => {
                       return <Main {...routerProps} />
                   }}
            />
            <Route path="/search" exact
                   render={(routerProps) => {
                       return <Search {...routerProps} />
                   }}
            />
            <Route path="/artist/:name" exact
                   render={(routerProps) => {
                       return <Artist {...routerProps} />
                   }}
            />
            <Redirect from="*" to="/" exact/>
        </Switch>
    );
}


