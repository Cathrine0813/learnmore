// rcc
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom"

class RouterPage extends Component {
    render() {
        return (
            <div>
                <h3>RouterPage</h3>
                {/* BrowserRouter的基本使用 */}
                <Router>
                    {/* Link跳转，相当于a标签 */}
                    <Link to="/">首页</Link>
                    <br/>
                    <Link to="/user">用户中心</Link>
                    
                    {/* Switch只渲染一个 */}
                    <Switch>
                        {/* 用route渲染组件,根路由要添加exact，实现精确匹配 */}
                        {/* <Route exact path="/" component={HomePage}/> */}
                        <Route exact path="/"
                            // component={HomePage}
                            // children={() => {
                            //     return <div>children</div>
                            // }}
                            render={()=><div>render</div>}
                        />
                        {/* children、component、render是互斥的，
                            且children优先级最高，其次是component，最后是render
                            children和当前的location是没有关系的，都会渲染，
                            children和render都是函数
                            component和render都和当前都location匹配的 */}
                        <Route path="/user" component={UserPage} />
                        {/* 404，不写path */}
                        <Route component={EmptyPage}/>
                    </Switch>
                    
                </Router>
            </div>
        );
    }
}
// ccs
class HomePage extends Component {
    render() {
        return (
            <div>
                <h3>HomePage</h3>
            </div>
        )
    }
}
class UserPage extends Component {
    render() {
        return (
            <div>
                <h3>UserPage</h3>
            </div>
        )
    }
}
class EmptyPage extends Component {
    render() {
        return (
            <div>
                <h3>EmptyPage-404</h3>
            </div>
        )
    }
}

export default RouterPage;