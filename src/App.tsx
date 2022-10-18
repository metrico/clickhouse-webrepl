import { ReactReplView } from 'awesome-react-repl';
import { useRef, useState } from 'react';
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || window.location.origin;

const query = (input: string) => {
    var URL = REACT_APP_API_URL+'/?';
    /// CORS + Safety Limits
    URL += 'add_http_cors_header=1' +
    '&default_format=JSONCompact' +
    '&max_result_rows=1000&max_result_bytes=10000000&result_overflow_mode=break';
    URL += '&query='+input;
    
    const request = new XMLHttpRequest();
    request.open('GET', URL, false);  // `false` makes the request synchronous
    request.setRequestHeader("custom-header", "test")
    request.send(null);
    return request.responseText;
}

function App() {
  const [lines, setLines] = useState<any[]>([]);

  function handleSubmit(input: string) {
    setLines(lines => lines.concat({ type: 'input', value: input }));
    if (!input || input === "") return;
    try {
      const output = query(input);
      setLines(lines => lines.concat({ type: 'output', value: output }));
    } catch (e: any) {
      setLines(lines => lines.concat({ type: 'error', value: e.toString() }));
    }
  }

  return (
    <ReactReplView
      title="ClickHouse CLI"
      lines={lines}
      onSubmit={handleSubmit}
      height={window.innerHeight}
    />
  );
}

export default App;
