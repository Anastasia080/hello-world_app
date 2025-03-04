import { useState } from 'react'
import reactLogo from './assets/react.svg'
import worldLogo from '/free-animated-icon-global-15747338.gif'
import './App.css'
import Button from './components/button'; // Импортируем кнопку
import Navbar from './components/navbar'; // Импортируем навигацию
import Header from './components/header'; // Импортируем Header
import Footer from './components/footer'; // Импортируем Footer
import Menu from './components/menu'; // Импортируем Menu
import Content from './components/content'; // Импортируем Content

const App = () => {

  const [selectedLab, setSelectedLab] = useState(null);

    const labs = [
        { title: 'Lab 1', content: 'Content Lab 1' },
        { title: 'Lab 2', content: 'Content Lab 2' },
        { title: 'Lab 3', content: 'Content Lab 3' },
    ];

  const handleClick = () => {
      alert('Hello World!');
  };

  return (
    <>
    <div>
    <img src={worldLogo} className="logo" alt="World logo" />
    </div>
    <div className="container">
            <div className="container1">
                <h1>Hello World!</h1>
                <Button label="Click Me" onClick={handleClick} />
            </div>
            <div className="container2">
                <Navbar />
                <Header />
                <Menu labs={labs} onSelectLab={setSelectedLab} />
                {selectedLab && <Content lab={selectedLab} />}
            </div>
        </div>
        <Footer />
    </>
);
};

export default App
