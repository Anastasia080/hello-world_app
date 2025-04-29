import { useState, useEffect, useCallback } from 'react';
import { 
  Box,
  useMediaQuery
} from '@mui/material';
import MoonLogo from '/free-animated-icon-night-17102940.gif';
import SunLogo from '/free-animated-icon-sun-11779621.gif';
import WorldLogo from '/free-animated-icon-global-15747338.gif';
import './App.css';
import Button from './components/button';
import Header from './components/header';
import Footer from './components/footer';
import Menu from './components/menu';
import Content from './components/content';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate,useLocation  } from 'react-router-dom';
import { store } from './components/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AuthForm from './components/AuthForm';
import ProfilePage from './components/ProfilePage';
import {login} from './components/authSlice';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import QuickActions from './components/QuickActions'
import AdminPanel from './components/AdminPanel';
import ReadOnlyFeedback from './components/ReadOnlyFeedback';
import { useGetUserByIdQuery } from './components/api';

const AuthContent = ({ theme, isLoginForm, toggleAuthForm, loginUser, registerUser }) => {
  return (
    <>
      <img src={WorldLogo} className="logo" alt="logo" />
      <AuthForm
        onSubmit={isLoginForm ? loginUser : registerUser}
        isLoginForm={isLoginForm}
      />
      <Button
        label={isLoginForm ? 'Нужна регистрация?' : 'Уже есть аккаунт?'}
        onClick={toggleAuthForm}
        theme={theme}
      />
    </>
  );
};



const AppContent = ({ theme, toggleTheme }) => {
  const dispatch = useDispatch();
  const feedbackStatus = useSelector(state => state.feedback.status);
  const location = useLocation();
  const authState = useSelector(state => state.auth);
  const isMobile = useMediaQuery('(max-width:600px)'); // Добавлено: проверка мобильного устройства
  const labs = [
    { id: '1', title: 'Lab 1', content: 'Content Lab 1' },
    { id: '2', title: 'Lab 2', content: 'Content Lab 2' },
    { id: '3', title: 'Lab 3', content: 'Content Lab 3' },
  ];

  const handleClick = () => {
    alert('Hello World!');
  };
  
// Эффект для применения класса темы к элементу body
useEffect(() => {
  document.body.className = theme; // Устанавливаем класс темы на body
  }, [theme]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div>
        <img src={theme === 'light' ? SunLogo : MoonLogo} className="logo" alt="logo" />
      </div>
      <div className="container">
        <div className="container1">
          <h1>Hello World!</h1>
          <Button label="Click Me" onClick={handleClick} theme={theme} />
          <ReadOnlyFeedback />
        </div>
        <div className="container2">
          <Header toggleTheme={toggleTheme} />
          <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}> {/* Добавлен margin-top для Header */}
        <Menu labs={labs} />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: isMobile ? 1 : 3, // Адаптивный padding
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {labs.map(lab => (
              <Route
                key={lab.id}
                path={`/lab${lab.id}`}
                element={<Content title={lab.title} content={lab.content} />}
              />
            ))}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={
             authState.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />
                } />
          </Routes>
          </Box>
          </Box>
        </div>
      </div>
      <Footer />
      <QuickActions />
    </Box>
  );
};


const App = () => {
  const [theme, setTheme] = useState('light');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const authState = useSelector(state => state.auth); // Получаем все состояние авторизации
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Проверяем и isLoggedIn и наличие токена
  const isAuthenticated = authState.isLoggedIn && localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user && !authState.isLoggedIn) {
      try {
        const parsedUser = JSON.parse(user);
        const { data: freshUser, isError } = useGetUserByIdQuery(parsedUser.id);
        
        if (isError) {
          localStorage.clear();
          return;
        }
        
        if (freshUser?.isBlocked) {
          alert('Ваш аккаунт заблокирован. Обратитесь к администратору.');
          localStorage.clear();
          dispatch(logout());
          return;
        }
        
        localStorage.setItem('user', JSON.stringify(freshUser));
        dispatch(login({
          user: freshUser,
          token,
          role: freshUser.role || 'user',
          isBlocked: freshUser.isBlocked || false
        }));
      } catch (e) {
        console.error('Failed to parse user data', e);
        localStorage.clear();
      }
    }
  }, [dispatch, authState.isLoggedIn]);

  const loginUser = useCallback(async (data) => {
    try {
      const response = await fetch(`http://localhost:3001/users?email=${data.email}`);
      if (!response.ok) throw new Error('Network error');
      
      const users = await response.json();
      if (users.length === 0) {
        alert('Пользователь не найден');
        return;
      }
    
      
      const user = users[0];

      // Проверка на блокировку пользователя
    if (user.isBlocked) {
      alert('Ваш аккаунт заблокирован. Обратитесь к администратору.');
      // Очищаем localStorage на случай, если там сохранены данные заблокированного пользователя
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      return;
    }
      if (user.password !== data.password) {
        alert('Неверный пароль');
        return;
      }
      
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch(login({
        user,
        token: 'fake-jwt-token',
        role: user.role || 'user',
        isBlocked: user.isBlocked || false
      }));
      
      navigate(user.role === 'admin' ? '/admin' : '/lab1');
    } catch (error) {
      console.error('Login error:', error);
      alert('Ошибка при авторизации');
    }
  }, [dispatch, navigate]);

  const registerUser = useCallback(async (data) => {
    try {

      const userData = {
        ...data,
        role: 'user', // По умолчанию регистрируем как обычного пользователя
        status: 'active'
      };

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const user = await response.json();
      localStorage.setItem('token', 'fake-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login({
        user,
        token: 'fake-jwt-token',
        role: user.role
      }));
      navigate('/lab1');
    } catch (error) {
      console.error('Registration error:', error);
    }
  }, [dispatch, navigate]);

  const toggleAuthForm = useCallback(() => {
    setIsLoginForm(prev => !prev);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <div className={theme}>
      {isAuthenticated ? (
        <AppContent theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <AuthContent
          theme={theme}
          isLoginForm={isLoginForm}
          toggleAuthForm={toggleAuthForm}
          loginUser={loginUser}
          registerUser={registerUser}
        />
      )}
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