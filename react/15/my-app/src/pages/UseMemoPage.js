import React, { useState, useEffect, useMemo, useCallback, PureComponent } from 'react';

function UseMemoPage(props) {
    const [count, setCount] = useState(0);

    // 用了useMemo，就可以不会被重复调用了，只有当依赖项的值发生变化时才调用
    // 第一个参数是函数
    const expensive = useMemo(() => {
        console.log("compute");
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        
        return sum;
        //第二个参数：依赖项，只有count变化，这⾥才重新执⾏
    }, [count]);
    
    const addClick = useCallback(() => {
        let sum = 0;
        for (let i = 0; i < count; i++) {
            sum += i;
        }
        return sum;
        //第二个参数：依赖项，只有count变化，这⾥才重新执⾏
    }, [count]);
    
    const [value, setValue] = useState('')
    
    
    return (
        <div>
            <h3>UseMemoPage</h3>
            <p>count:{count}</p>
            {/* <p>expensive:{expensive()}</p> */}
            {/* 用了useMemo之后就变成变量了，不需要用括号调用 */}
            <p>expensive:{expensive}</p>
            <button onClick={() => setCount(count + 1)}>add</button>
            <input value={value} onChange={(event) => setValue(event.target.value)} />
            <Child addClick={addClick} />
        </div>
    );
}

class Child extends PureComponent {
    render() {
        console.log("child render");
        const { addClick } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <button onClick={() => console.log(addClick())}>add</button>
            </div>
        );
    }
}
export default UseMemoPage;

