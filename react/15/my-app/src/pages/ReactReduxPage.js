import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReactReduxPage extends Component {
    render() {
        // 使用了connect之后不用调mapDispatchToProps，props就已经有dispatch了
        console.log(this.props)
        const { num, dispatch, add } = this.props
        return (
            <div>
                <h3>ReactReduxPage</h3>
                <p>{num}</p>
                {/* <button onClick={() => dispatch({type:'ADD'})}>add</button> */}
                <button onClick={add}>add</button>
                <button>minus</button>
            </div>
        );
    }
}

// connect是一个高阶组件，接收两个参数，第二个参数就是当前的页面组件
export default connect(
    // mapStateToProps 把state映射到props 【就是之前getState】
    state => ({num:state}),
    // mapDispatchToProps 把dispatch映射到props 【就是之前dispatch】
    // 可以自定义方法
    {
        add: () => ({type:'ADD'})
    }
)(ReactReduxPage);