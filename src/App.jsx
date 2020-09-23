import React from "react";
import "./App.css";
import UploadPage from "./view/UploadPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import routerPath from "./routerPath";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Route
                        exact
                        path={routerPath.home.path}
                        component={UploadPage}
                    />
                </Router>
            </div>
        );
    }
}

export default App;
