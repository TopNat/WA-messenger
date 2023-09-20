import './App.css';
import Entry from './components/Entry/Entry';
import Main from './components/Main/Main';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App center">
            <Routes>
                <Route path="/entry" element={<Entry />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Main />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
