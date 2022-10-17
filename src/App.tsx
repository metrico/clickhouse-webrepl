import { ReactReplView } from 'awesome-react-repl';
import { useRef, useState } from 'react';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || window.location.href;

const query = (input: string) => {
    const URL = REACT_APP_API_URL+'/?query='+input;
    const request = new XMLHttpRequest();
    request.open('GET', URL, false);  // `false` makes the request synchronous
    request.setRequestHeader("custom-header", "test")
    request.send(null);
    if (request.status !== 200) {
      // handle an error here
      return
    }
    return request.responseText;
}

function App() {
  const [lines, setLines] = useState<any[]>([]);

  function handleSubmit(input: string) {
    setLines(lines => lines.concat({ type: 'input', value: input }));
    try {
      const output = query(input);
      setLines(lines => lines.concat({ type: 'output', value: output }));
    } catch (e: any) {
      setLines(lines => lines.concat({ type: 'error', value: e.toString() }));
    }
  }

  return (
    <ReactReplView
      title="ClickHouse"
      lines={lines}
      onSubmit={handleSubmit}
      height={window.innerHeight}
    />
  );
}

export default App;
