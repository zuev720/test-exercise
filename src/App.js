import {MainTable} from "./components/Table/MainTable";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Filter} from "./components/Filter/Filter";

function App() {
    return (
        <div className="App container">
            <Filter />
            <MainTable/>
        </div>
);
}

export default App;
