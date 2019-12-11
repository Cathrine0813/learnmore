import React, { Component } from 'react'

// 这个时class组件
export default class ClassCmp extends Component{
    constructor(props) {
        super(props);
        // class组件中所有状态都存到state中
        this.state = {
            date: new Date()
        };
    }
    // -------生命周期
    // 1、组件挂载完执行
    componentDidMount() {
        this.timer = setInterval(() => {
            // this.state.date =  new Date()//不能这样写，因为在源码里面this.state是一个批量执行的异步的事情，我们要使用Component中提供的setState方法去更新
            // this.forceUpdate();//强制更新，在写了this.state.date之后调用这个才会更新，这样写就是同步的
            
            this.setState({
                date:new Date()
            })
        }, 1000)
    }
    // 2、组件卸载前
    componentWillUnmount() {
        // 防止内存泄漏
        clearInterval(this.timer)
    }
    render() {
        const { date } = this.state;
        return (
            <div>
                <h3>ClassCmp</h3>
                {/*因为当前date拿到的是对象，jsx不显示对象，会报错*/}
                {/*<p>{ date }</p>*/}
                <p>{ date.toLocaleTimeString() }</p>
            </div>
        )
    }
}