import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TestList from './pages/TestList';
import MultiList from './pages/MultiList';
import TestMCQ from './pages/test/TestMCQ';
import TestVocab from './pages/test/TestVocab';
import MultiVocabGame from "./pages/test/MultiVocab";
import MultiRoom from "./pages/users/MultiRoom";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/testlist" element={<TestList/>}/>
                <Route path="/multilist" element={<MultiList/>}/>
                <Route path="/testmcq" element={<TestMCQ/>}/>
                <Route path="/testvocab" element={<TestVocab/>}/>
                <Route path="/multivocab" element={<MultiVocabGame/>}/>
                <Route path="/multiroom" element={<MultiRoom/>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;
