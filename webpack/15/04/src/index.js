// js tree shaking
import { add } from "./expo.js";
add(1, 2);

// 代码分割
import _ from "lodash";
console.log(_.join(['a','b','c','****']))

import React, {
    Component
} from "react";
import ReactDom from "react-dom";
import css from './index.less'

class App extends Component {
    render() {
        return <div > hello world </div>;
    }
}

ReactDom.render( <App /> , document.getElementById("root"));


