import React, { useState, useEffect } from 'react';

export function FunctionComponent(props) {
    // [ 定义的值， 修改值(约定是这样的格式set+定义的值) ]
    const [date2, setDate2] = useState(new Date());
    // const [time2, setTime2] = useState(1);

    /**
     * 副作用
     *   参数一是回调函数callback，
     *   参数二是依赖项（不写的话只要副作用里面有值更新都会一直执行副作用，写了空数组默认更新值也不再执行副作用，写上了某个值就某个值变化时就执行副作用）
     * 
     * 相当于class组件的componentDidMount（参数一）、componentDidUpdate（参数二依赖项）、componentWillUnmount（参数一里的return）
     * 
     */
    useEffect(() => {
        console.log('useEffect :>> '); 
        const timer2 = setInterval(() => {
            setDate2(new Date());
            // setTime2(time2+1);
        }, 1000)
        
        // 组件卸载前执行return
        return ()=>clearInterval(timer2)
    },[])

    return (
        <div>
            <h3>FunctionComponent</h3>
            <p>{date2.toLocaleTimeString()}</p>
            {/* <p>{time2}</p> */}
        </div>
    )
}