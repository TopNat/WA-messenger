import './App.css';
import Entry from './components/Entry/Entry';
import Main from './components/Main/Main';
import Notfound from './components/Notfound/Notfound';
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
                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>
    );
}

export default App;
