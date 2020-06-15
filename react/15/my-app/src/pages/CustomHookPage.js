import React, { useState, useEffect } from 'react';

function CustomHookPage(props) {
    // 初始化值，更改函数
    const [count, setCount] = useState(0);

    

    useEffect(() => {
        console.log('111effect')
        document.title = `点击了${count}次`
    }, [count])
    
    
    
    return (
        <div>
            <h3>CustomHookPage</h3>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <p>{useClock().toLocaleTimeString()}</p>
        </div>
    );
}


// 抽取hook，就要自定义Hook，命名要use开头
// 别的页面要引入，只需要导出就好了
function useClock() {
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        console.log('222effect')

        const timer = setInterval(() => {
           setDate(new Date()) 
        }, 1000)
        return ()=>clearInterval(timer)
    }, [])
    return date;
}


export default CustomHookPage;

