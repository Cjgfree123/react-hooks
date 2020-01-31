import React from 'react';
import ReactDOM from 'react-dom';

let initialArg = 0;
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function reducer(state, action){
    switch (action.type){
        case INCREMENT:
            return  {num: state.num + 1};
        case DECREMENT:
            return  {num: state.num - 1};
        default:
            return state;
    }
}

// 将init函数返回值，作为initialState。
function init(initialArg){
    return {
        num: initialArg
    }
}

/**
 * 封装useReducer start
 */
let memoizedState;
function useReducer(reducer, initialArg, init){
    let initialState = void 0;
    if(typeof init !== "undefined"){
        initialState = init(initialArg);
    }else{
        initialState = initialArg;
    };
    
    memoizedState = memoizedState || initialState;

    function dispatch(action){
       // 注意:  reducer(memoizedState, action)   
       memoizedState = reducer(memoizedState, action);
       render();
    };

    return [memoizedState, dispatch];
}

/**
 * 封装useReducer end
 */


 /**
  * 使用useReducer封装useState start
  */

// 一、基础写法 
// function r1(state, action){
//     console.log(state, action);
//     let oldState = state;
//     let newState = action;
//     return newState;
// }

// function useState(initialState){
//     return useReducer(r1, initialState);
// }

// 二、简写
function useState(initialState){
    return useReducer((oldState, newState) => newState , initialState);
}
 /**
  * 使用useReducer封装useState end
  */


/**
 * 1. useState内部是使用useReducer实现的。
 * 2. 比如说改变状态逻辑复杂，或者下一个状态依赖于上一个状态时，使用useReducer。
 */
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
