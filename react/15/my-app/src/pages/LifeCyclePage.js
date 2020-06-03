import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LifeCyclePage extends Component{
    static defaultProps = {
        msg: 'omg' // propTypes加了isRequired就一定要写，不写就会报错，如果没有加isRequired那就可以不写
    }
    static propTypes = {
        msg: PropTypes.string
        // msg: PropTypes.string.isRequired //加了isRequired就是一定要传
    }
    constructor(props) {
        super(props)
        this.state = {
            count:0
        }
        console.log('constructor');
    }
    // ----------生命周期
    // 即将废弃的生命周期componentWillMount、componentWillReceiveProps、componentWillUpdate，
    // 用getDerivedStateFromProps、getSnapshotBeforeUpdate替代
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps', props, state)
        // return null  //返回一个对象则更新state，返回null则不更新任何内容

        const { count } = state
        return count > 5 ? { count:0 }: null
    }

    // // 挂载前
    // componentWillMount() {
    //     console.log('componentWillMount')
    // }
    // 挂载后
    componentDidMount() {
        console.log('componentDidMount')
    }
    // 是否更新，适合做性能优化，不需要重新渲染的就return false
    shouldComponentUpdate(nextProps, nextState) {
        const { count } = nextState
        console.log('shouldComponentUpdate',nextProps,'---',nextState,this.state)

        // return true // true:可更新 false:不更新
        return count !== 3
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate', prevProps, prevState);
        // return null
        // getSnapshotBeforeUpdate() 在最近⼀次渲染输出（提交到 DOM 节点）之前调⽤。它使得组件能
        // 在发⽣更改之前从 DOM 中捕获⼀些信息（例如，滚动位置）。此⽣命周期的任何返回值将作为参数传
        // 递给 componentDidUpdate(prevProps, prevState, snapshot) 的snapshot
        return {
            msg:'我是getSnapshotBeforeUpdate'
        }
    }
    // // 更新前
    // componentWillUpdate() {
    //     console.log('componentWillUpdate')
    // }
    // 更新后
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', prevProps, '-----', prevState, '-----', snapshot)
    }
    // 卸载前
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    // ----------方法
    setCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        console.log('render:',this.props)
        const { count } = this.state;

        return (
            <div>
                <h3>LifeCyclePage</h3>
                <p>{count}</p>
                <button onClick={this.setCount}>改变count</button>
                {/* {count % 2 && <Child count={count} />} */}
                <Child count={count} />
            </div>
        )
    }
    /**
     * Q：constructor和render调用了两次？
     *  最近的react v16.3.1版本,dev模式下render使用的是strict mode,
     *  strict mode的通过两次调用constructor和render函数来更好的检测不符合预期的side effects
     * 
     * 
     */
}

// 子组件
class Child extends Component{
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Child getSnapshotBeforeUpdate', prevProps, prevState);
        return null
    }
    // 挂载前
    // componentWillMount() {
    //     console.log('Child componentWillMount')
    // }
    // 挂载后
    componentDidMount() {
        console.log('Child componentDidMount')
    }
    // // 接收props前
    // componentWillReceiveProps(nextProps) {
    //     console.log('Child componentWillReceiveProps',nextProps)
    // }
    // // 更新前
    // componentWillUpdate() {
    //     console.log('Child componentWillUpdate')
    // }
    // 更新后
    componentDidUpdate() {
        console.log('Child componentDidUpdate')
    }
    // 卸载前
    componentWillUnmount() {
        console.log('Child componentWillUnmount')
    }
    render() {
        console.log('Child render')
        const { count } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <p>{count}</p>
            </div>
        )
    }
}