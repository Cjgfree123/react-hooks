import React from 'react';
import ReactDOM from 'react-dom';

/**
 * hooks中useState不能写在嵌套、判断、循环中, 原因是:
 * 
 * 比如: if(Math.random() > 0.5) const [num, setNum] = useState(0);
 * 假设第一次>0.5, 则会在memoizedStates: ["计数器", 0]
 * 假设第二次<0.5, render函数将index=0,则会在memoizedStates: [1]。 
 * 导致: 则会在memoizedStates长度不一致。
*/


 /*
 * 第一轮 memoizedStates: ["计数器", 0]
 * 第二轮 memoizedStates: ["计数器", 1]
 */
let memoizedStates = [];
let index = 0;
function useState(initialState){
    memoizedStates[index] = memoizedStates[index] || initialState;
    let currentIndex = index;
    function setState(newState){
        memoizedStates[currentIndex] = newState;
        render();
    };
    return [memoizedStates[index++], setState];
}

function Counter(){
    /**
     * useState就是一个hooks
     * 第一个是当前的状态
     * 第二个是改变状态的函数
     */
    const [name, setName] = useState("计数器"); // 参数是初始状态
    const [num, setNum] = useState(0); // 参数是初始状态
    return (<>
        <p>{name} : {num}</p>
        <button onClick={() => setName("计数器" + Date.now())}>换个名称</button>
        <button onClick={() => setNum(num + 1)}>+</button>
    </>)
};

function render() {
    // 防止每次setState时, index++.导致取不到老的state.
    index = 0;
    ReactDOM.render(<Counter />, document.getElementById('root'));
};
render();
