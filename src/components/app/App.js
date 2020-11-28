import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Navigation} from "../navigation/Navigation";

export const App = () => {
  return (
      <BrowserRouter>
        <Navigation/>
      </BrowserRouter>
  );
}
