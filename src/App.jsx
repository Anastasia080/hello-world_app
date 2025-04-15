import { useState, useEffect } from 'react'
import MoonLogo from '/free-animated-icon-night-17102940.gif'
import SunLogo from '/free-animated-icon-sun-11779621.gif'
import './App.css'
import Button from './components/button'; // Импортируем кнопку
import Navbar from './components/navbar'; // Импортируем навигацию
import Header from './components/header'; // Импортируем Header
import Footer from './components/footer'; // Импортируем Footer
import Menu from './components/menu'; // Импортируем Menu
import Counter from './components/Counter';
import Content from './components/content'; // Импортируем Content
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './components/store';
import { Provider } from 'react-redux';
const App = () => {

  //const [selectedLab, setSelectedLab] = useState(null);
  const [theme, setTheme] = useState('light'); // Состояние для темы

  const labs = [
    { id: '1', title: 'Lab 1', content: 'Content Lab 1' },
    { id: '2', title: 'Lab 2', content: 'Content Lab 2' },
    { id: '3', title: 'Lab 3', content: 'Content Lab 3' },
  ];

  const handleClick = () => {
      alert('Hello World!');
  };

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
};

 // Эффект для применения класса темы к элементу body
    useEffect(() => {
    document.body.className = theme; // Устанавливаем класс темы на body
    }, [theme]);

  return (
    <div className={theme}>
    <div>
      <img src={theme === 'light' ? SunLogo : MoonLogo} className="logo" alt="logo" />
    </div>
    <div className="container">
      <div className="container1">
        <h1>Hello World!</h1>
        <Button label="Click Me" onClick={handleClick} theme={theme} />
        <Button label={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme} theme={theme} />
        <Counter theme={theme} />
      </div>
      <div className="container2">
        <Navbar />
        <Header />
        <Menu labs={labs} />
        <Routes>
          <Route path="/lab/:id" element={<Content labs={labs} />} />
        </Routes>
      </div>
    </div>
    <Footer />
  </div>
);
};

const Root = () => (
<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>
);

export default Root;