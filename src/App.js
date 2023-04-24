import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import {useState} from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    const [fullName, setFullName] = useState('')

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <Main
                            isDarkMode={isDarkMode}
                            setIsDarkMode={setIsDarkMode}
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
                            token={token}
                            setToken={setToken}
                            fullName={fullName}
                            setFullName={setFullName}
                        />}
                    />
                    <Route path="/login" element={
                        <Login
                            token={token}
                            setToken={setToken}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                    }/>
                    <Route path="/registration" element={
                        <Registration
                            token={token}
                            setToken={setToken}
                            setIsLoggedIn={setIsLoggedIn}
                        />
                    }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
