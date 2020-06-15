import React, { useState, useEffect } from 'react';

function HookPage(props) {
    // 初始化值，更改函数
    const [count, setCount] = useState(0);
    const [date, setDate] = useState(new Date())
    /**
     * 副作用
     *   参数一是回调函数callback，
     *   参数二是依赖项（不写的话只要副作用里面有值更新都会一直执行副作用，写了空数组默认更新值也不再执行副作用，写上了某个值就某个值变化时就执行副作用）
     * 
     * 相当于class组件的componentDidMount（参数一）、componentDidUpdate（参数二依赖项）、componentWillUnmount（参数一里的return）
     * 
     * 可以也几个useEffect
     * 
     */
    useEffect(() => {
        console.log('111effect')
        document.title = `点击了${count}次`

        // const timer = setInterval(() => {
        //    setDate(new Date()) 
        // }, 1000)
        
        // // 通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。
        // // 要实现这⼀点， useEffect函数需返回⼀个清除函数，以防⽌内存泄漏，清除函数会在组件卸载前执⾏。
        // return ()=>clearInterval(timer)
    }, [count])
    // 只有当 useEffect第⼆个参数数组⾥的数值 改变后才会重新创建订阅。
    
    useEffect(() => {
        console.log('222effect')

        const timer = setInterval(() => {
           setDate(new Date()) 
        }, 1000)
        return ()=>clearInterval(timer)
    },[])
    return (
        <div>
            <h3>HookPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    );
}


export default HookPage;

