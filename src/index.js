
import {createRoot} from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import store from './store';


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
  <Provider store={store}>
    <App/>
  </Provider>
  </BrowserRouter>
);



