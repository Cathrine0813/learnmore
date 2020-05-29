import React, { Component } from 'react';

// ES6,class类   原型继承extends
export default class SetStatePage extends Component{
    //constructor是一个构造方法，用来接收参数
    constructor(props) {
        super(props) //继承类中的构造函数必须调用 super（...），(!)并且在使用 this 之前执行它。
        this.state = {
            counter:0
        }
    }
    componentDidMount() {
        // this.changeValue(1)

        // 绑定事件
        document.getElementById('test').addEventListener('click',this.setCounter)
    }
    changeValue = (v) => {
        // setState在合成事件和生命周期中是异步的，这里说的异步其实的批量更新，达到优化性能的目的
        this.setState({
            counter: this.state.counter + v
        })
        console.log('counter :>> ', this.state.counter);
    }
    setCounter = () => {
        this.changeValue(1)   
    }
    setCounter2 = () => {
        // setState在setTimeout和原生事件中是同步执行
        this.changeValue(1)   

        // setTimeout(() => {
        //     this.changeValue(1)  
        // }, 0);
    }
    render() {
        const { counter } = this.state;

        return (
            <div>
                <h3>SetStatePage</h3>
                <button onClick={this.setCounter}>{counter}</button>
                <button id='test'>原生事件：{counter}</button>
            </div>
        )
    }
}