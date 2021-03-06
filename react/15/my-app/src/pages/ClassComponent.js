import React, { Component } from 'react';

// ES6,class类   原型继承extends
export default class ClassComponent extends Component{
    //constructor是一个构造方法，用来接收参数
    constructor(props) {
        super(props) //继承类中的构造函数必须调用 super（...），(!)并且在使用 this 之前执行它。
        this.state = {
            date:new Date()
        }
    }
    // ---------生命周期
    // 组件挂载完成后
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                date: new Date()
            })
        },1000)
    }
    // 组件更新
    componentDidUpdate() {
        
    }
    // 组件卸载之前
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    // 渲染函数
    render() {
        const { date } = this.state;

        return (
            <div>
                <h3>ClassComponent</h3>
                <p>{date.toLocaleTimeString()}</p>
            </div>
        )
    }
}