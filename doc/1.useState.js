import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 实现useState
 * 原理: 利用闭包+函数劫持思想, 用useState传入变量作为初始状态;  返回值是数组，第一个元素是更新后的值, 第二个元素是更新状态函数。 每当调用更新状态函数, 会更新state, 并手动触发render函数。
 * 注意: useState传入了数组，更新状态函数是计算，会把数组转换成字符串。
 */
let memoizedState;
function useState(initialState){
    memoizedState = memoizedState || initialState;
    function setState(newState){
        memoizedState = newState;
        render();
    };
    return [memoizedState, setState]; // [[333,666], (newState)=>{memoizedState = newState; render();}]
}

function Counter(){
    /**
     * useState就是一个hooks
     * 第一个是当前的状态
     * 第二个是改变状态的函数
     */
    const [num, setNum] = useState(0); // 参数是初始状态
    return (<>
        <p>{num}</p>
        <button onClick={() => setNum(num + 1)}>+</button>
    </>)
};

function render() {
    ReactDOM.render(<Counter />, document.getElementById('root'));
};
render();
