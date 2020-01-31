import React from 'react';
import ReactDOM from 'react-dom';


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

/**
 * 1. 在函数主体中，不能写具有副作用(订阅、定时器、修改dom)的逻辑。
 * 2. useEffect 给函数组件添加了操作副作用的能力。
 * 3. 类组件 didmount didupdate willunmount
 */
function useEffect(cb, dependencies){
    if(!dependencies){
        index++; // ?????
        return cb();
    };

    // 判断是否需要刷新(1. 第一次渲染需要刷新 2.数组中，每一个索引处，只要存在当前依赖项 !== 上一份依赖项， 就刷新页面
    let lastDependencies = memoizedStates[index];
    let changed = lastDependencies? !dependencies.every((item, index) => item === lastDependencies[index]) : true;
    // console.log("changed", changed); true
    // console.log("当前", dependencies); [1]
    // console.log("上一份依赖项", lastDependencies); [0]
    if(changed){
        cb();
        memoizedStates[index] = dependencies;
    };
    index++;
}

function Counter(){
    /**
     * useState就是一个hooks
     * 第一个是当前的状态
     * 第二个是改变状态的函数
     */
    const [name, setName] = useState("计数器"); // 参数是初始状态
    const [num, setNum] = useState(0); // 参数是初始状态

    // (每刷新一次)每点击一次按钮，就会执行一次
    useEffect(() => {
        console.log("num1:" , num);
    }, [num]);
    useEffect(() => {
        console.log("num2:" , num);
    }, [num]);

    return (<>
        <p>{name} : {num}</p>
        <button onClick={() => setName("计数器" + Date.now())}>换个名称</button>
        <button onClick={() => setNum(num + 1)}>+</button>
    </>)
};


function render() {
    index = 0;
    ReactDOM.render(<Counter />, document.getElementById('root'));
};
render();
