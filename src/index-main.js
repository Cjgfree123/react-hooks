import React from 'react';
import ReactDOM from 'react-dom';

// 指向链表的头节点(指针)
let firstWorkInProcessHook = { memoizedState: null, next: null };

// 指向链表的当前节点(指针)
let workInProgressHook = firstWorkInProcessHook;

function useState(initialState){
    // 当下节点
    let currentHook = workInProgressHook.next?  
        workInProgressHook.next : 
        { memoizedState: initialState, next: null };

    function setState(newState){
        currentHook.memoizedState = newState;
        render();
    };

    if(workInProgressHook.next){
        workInProgressHook = workInProgressHook.next;
    }else{
        workInProgressHook.next = currentHook;
        workInProgressHook = currentHook;
    };

    return [currentHook.memoizedState, setState];
}

function Counter(){
    const [name, setName] = useState("计数器"); // 参数是初始状态
    const [num, setNum] = useState(0); // 参数是初始状态

    return (<>
        <p>{name} : {num}</p>
        <button onClick={() => setName("计数器" + Date.now())}>换个名称</button>
        <button onClick={() => setNum(num + 1)}>+</button>
    </>)
};


function render() {
    workInProgressHook = firstWorkInProcessHook;
    ReactDOM.render(<Counter />, document.getElementById('root'));
};
render();
