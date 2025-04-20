import { useState, useEffect, useCallback  } from 'react'
import MoonLogo from '/free-animated-icon-night-17102940.gif'
import SunLogo from '/free-animated-icon-sun-11779621.gif'
import WorldLogo from '/free-animated-icon-global-15747338.gif'
import './App.css'
import Button from './components/button'; // Импортируем кнопку
import Navbar from './components/navbar'; // Импортируем навигацию
import Header from './components/header'; // Импортируем Header
import Footer from './components/footer'; // Импортируем Footer
import Menu from './components/menu'; // Импортируем Menu
import Counter from './components/Counter';
import Content from './components/content'; // Импортируем Content
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { store } from './components/store';
import { Provider } from 'react-redux';
import AuthForm from './components/AuthForm';
import { useDispatch } from 'react-redux';
import { login, checkAuth } from './components/authSlice';
import { useLoginState } from './hooks/useLoginState';
import ProfileButton from './components/ProfileButton';
import Feedback from './components/FeedbackForm';
const App = () => {

  //const [selectedLab, setSelectedLab] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useLoginState();
  const [theme, setTheme] = useState('light');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const labs = [
    { id: '1', title: 'Lab 1', content: 'Content Lab 1' },
    { id: '2', title: 'Lab 2', content: 'Content Lab 2' },
    { id: '3', title: 'Lab 3', content: 'Content Lab 3' },
  ];

  const loginUser = useCallback((data) => {
    dispatch(login());
  }, [dispatch]);

  const toggleAuthForm = useCallback(() => {
    setIsLoginForm(prev => !prev);
  }, []);

  if (!isLoggedIn) {
    return (
      <>
      <img src = {WorldLogo} className="logo" alt="logo" />
        <AuthForm 
          onSubmit={loginUser} 
          isLoginForm={isLoginForm} 
        />
        <Button 
          label={isLoginForm ? 'Нужна регистрация?' : 'Уже есть аккаунт?'} 
          onClick={toggleAuthForm} 
          theme={theme} 
        />
      </>
    );
  }
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
        <ProfileButton />
    <div>
      <img src={theme === 'light' ? SunLogo : MoonLogo} className="logo" alt="logo" />
    </div>
    <div className="container">
      <div className="container1">
        <h1>Hello World!</h1>
        <Button label="Click Me" onClick={handleClick} theme={theme} />
        <Button label={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme} theme={theme} />
        <Counter theme={theme} />
        <Feedback />
      </div>
      <div className="container2">
        <Navbar />
        <Header />
        <Menu labs={labs} />
        <Routes>
  <Route path="/" element={<Navigate to="/lab1" replace />} />
  {labs.map(lab => (
    <Route 
      key={lab.id}
      path={`/lab${lab.id}`} 
      element={<Content title={lab.title} content={lab.content} />} 
    />
  ))}
  <Route path="/profile" element={<div>Profile Page</div>} />
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