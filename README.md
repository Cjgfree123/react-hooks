# react-hooks

react 16.7新特性（react 16.8可以使用）

优点:

（1）典型react组件里，组件被providers, consumers, 高阶组件, render ,props, 和其他抽象层包裹。  不方便复用。 解决：通过react hooks,将含有state的逻辑从组件中抽象出来，方便复用。


## api

1. useState是一个钩子。

useState返回值：当前的状态（state value）和一个可以更新状态的函数。

特点：类似于setState,但是不能进行新旧状态的合并(也就是说多次setstate函数调用产生的效果会合并)。

唯一参数：初始状态。初始状态参数只在第一次渲染中被使用。（它不必是一个对象）

2.useEffect : 进行异步请求


## 原理 [详细见doc目录]

#### useState

使用:

```
let [state, setState] = useState(initialState);
```

原理:

（一）见1.useState.js

```
/**
 * 实现useState
 */
let memoizedState;
function useState(initialState){
    // 1. 初始状态读取initialState, 之后读取memoizedState。
    memoizedState = memoizedState || initialState;
    function setState(newState){
        memoizedState = newState;
        render();
    };
    return [memoizedState, setState];
}
```

（二）见3.useState.js [基于useReducer实现]

```
function useState(initialState){
    return useReducer((oldState, newState) => newState , initialState);
}
```

存在问题：只能管理单个（一个）状态。

（三）见4.useState.js

解决了3.useState.js问题，只能管理单个状态。

(四) 见6.useState(链表).js

使用链表数据结构，实现了useState.(源码也是采用链表实现的)

#### useReducer

见2.useReducer.js

reducer跟redux里边的reducer是一致的。

使用:

```
useReducer(reducer, initialArgs, init);
```

原理:

```
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
```

#### useEffect

见5.effect.js

## 收获

1. 为何建议使用函数组件，而非类组件？

* 类组件性能差
* 高阶组件复用性差
* 生命周期就像黑盒子，管理起来比较麻烦 componentWillMount