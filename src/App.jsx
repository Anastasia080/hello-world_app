import { useState } from 'react'
import reactLogo from './assets/react.svg'
import worldLogo from '/free-animated-icon-global-15747338.gif'
import './App.css'
import Button from './components/button'; // Импортируем кнопку
import Container from './components/container'; // Импортируем контейнер
import Navbar from './components/navbar'; // Импортируем навигацию

const App = () => {
  const handleClick = () => {
      alert('Hello World!');
  };

  return (
    <>
    <div>
    <img src={worldLogo} className="logo" alt="World logo" />
    </div>
        <Navbar />
        <Container>
            <h1>Hello World!</h1>
            <Button label="Click Me" onClick={handleClick} />
        </Container>
    </>
);
};

export default App
