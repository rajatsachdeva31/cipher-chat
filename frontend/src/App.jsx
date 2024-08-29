import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Socket from './Connection/Socket';

function App() {

  return (
    <div className="App h-screen">
      <Socket />
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;