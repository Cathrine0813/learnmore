// 快捷键 rcc
import React, { Component } from 'react';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';

class Layout extends Component {
    componentDidMount() {
        const { title="商城" } = this.props
        document.title = title
    }
    render() {
        const { children, showTopBar, showBottomBar } = this.props; //父组件传进来的参数
        console.log('children :>> ', children);

        return (
            <div>
                {showTopBar && <TopBar />}
                
                {/* <h3>Layout</h3> */}
                {/* {children} */}
                {children.content}
                {children.tex}
                <button onClick={children.btnClick}>btnClick</button>

                {showBottomBar && <BottomBar />}
            </div>
        );
    }
}

export default Layout;