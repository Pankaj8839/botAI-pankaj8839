import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import Home from './Page/Home';
import PastChat from './Page/PastChat';



function App() {
  return (
    <div className="App">
     
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pastchat" element={<PastChat />} />
          </Routes>
        </Layout>
      </Router>
   
    </div>
  );
}

export default App;
