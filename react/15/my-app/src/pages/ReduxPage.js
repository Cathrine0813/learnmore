import React, { Component } from 'react';
import store from '../store/index'

class ReduxPage extends Component {
    componentDidMount() {
        // 订阅store
        store.subscribe(() => {
            console.log('state变化了')
            // 强制更新渲染
            this.forceUpdate()
        })
    }
    render() {
        console.log('store :>> ', store);
        return (
            <div>
                <h3>ReduxPage</h3>
                <p>{store.getState()}</p>
                <button onClick={()=>{store.dispatch({type:'ADD'})}}>ADD</button>
            </div>
        );
    }
}

export default ReduxPage;