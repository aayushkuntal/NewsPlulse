import './App.css';
import Sidenav from '../components/Sidenav.jsx';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const pageSize = 12;

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Sidenav apiKey={apiKey} key="general" pageSize={pageSize} category="general" />} />
                    <Route exact path="/technology" element={<Sidenav apiKey={apiKey} key="technology" pageSize={pageSize} category="technology" />} />
                    <Route exact path="/business" element={<Sidenav apiKey={apiKey} key="business" pageSize={pageSize} category="business" />} />
                    <Route exact path="/sports" element={<Sidenav apiKey={apiKey} key="sports" pageSize={pageSize} category="sports" />} />
                    <Route exact path="/entertainment" element={<Sidenav apiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" />} />
                    <Route exact path="/science" element={<Sidenav apiKey={apiKey} key="science" pageSize={pageSize} category="science" />} />
                    <Route exact path="/health" element={<Sidenav apiKey={apiKey} key="health" pageSize={pageSize} category="health" />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
