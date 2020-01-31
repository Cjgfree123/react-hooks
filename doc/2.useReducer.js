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
    let initialState = void 0; // void是一个随便起的变量
    if(typeof init !== "undefined"){
        initialState = init(initialArg);
    }else{
        initialState = initialArg;
    };
    
    memoizedState = memoizedState || initialState;

    function dispatch(action){
       // 注意:  memoizedState = reducer(memoizedState, action); 而非initialState   
       memoizedState = reducer(memoizedState, action);
       render();
    };

    return [memoizedState, dispatch];
}

/**
 * 封装useReducer end
 */


/**
 * 1. useState内部是使用useReducer实现的。
 * 2. 比如说改变状态逻辑复杂，或者下一个状态依赖于上一个状态时，使用useReducer。
 */
function Counter(){
    // state={num:0}
    const [state, dispatch] = useReducer(reducer, initialArg, init)
    return (<>
        <p>{state.num}</p>
        <button onClick={() => dispatch({
            type: INCREMENT
        })}>+</button>
        <button onClick={() => dispatch({
            type: DECREMENT
        })}>-</button>
    </>)
};

function render() {
    ReactDOM.render(<Counter />, document.getElementById('root'));
};
render();
