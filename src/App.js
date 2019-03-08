import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器API更新文档标题
    document.title = `You clicked ${count} times`;

    axios("https://www.easy-mock.com/mock/5c6ace85d8bc8b31033c36a5/getTableList")
      .then(data => console.log("数据", data))
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

/**
 * 1.通过useState()设置状态
 * 2.通过useEffect进行异步操作
 */

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// };

class App extends Component {
  render() {
    return (
      <div className="App">
        <Example />
      </div>
    );
  }
}

export default App;
