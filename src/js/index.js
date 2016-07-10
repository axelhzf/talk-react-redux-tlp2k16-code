import "../css/index.less";

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./containers/App";
import store from "./state/store";

const RootComponent = (
    <App/>
);

ReactDOM.render(RootComponent, document.getElementById("container"));
