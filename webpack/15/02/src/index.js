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