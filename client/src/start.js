import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return <App />;
}
