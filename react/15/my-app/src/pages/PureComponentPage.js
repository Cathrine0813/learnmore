import React, { Component, PureComponent } from 'react';

// PureComponent内置了shouldComponentUpdate
class PureComponentPage extends PureComponent {
// class PureComponentPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            obj: {
                num:0
            }
        }
    }
    setCount = () => {
        this.setState({
            count: 100,
            // 这个时候PureComponent就失效了，会重新渲染，因为PureComponent只比较第一层
            obj: {
                num:1000
            }
        })
    }
    // // 当值一样的时候就不更新组件，性能优化，不用shouldComponentUpdate可以用PureComponent
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.count !== this.state.count
    // }
    render() {
        console.log('render')
        const { count } = this.state; 
        return (
            <div>
                <h3>PureComponentPage</h3>
                <button onClick={this.setCount}>{count}</button>
            </div>
        );
    }
}

export default PureComponentPage;