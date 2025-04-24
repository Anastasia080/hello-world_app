import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AuthForm = ({ onSubmit, isLoginForm = true }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = useCallback((data) => {
    onSubmit(data);
    //window.location.href = 'http://localhost:5173/lab1'; // Полный переход с обновлением страницы
  }, [onSubmit]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isLoginForm ? 'Авторизация' : 'Регистрация'}
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          {...register('email', { 
            required: 'Email обязателен', 
            pattern: { 
              value: /^\S+@\S+$/i, 
              message: 'Некорректный email' 
            } 
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Пароль"
          {...register('password', { 
            required: 'Пароль обязателен', 
            minLength: { 
              value: 6, 
              message: 'Минимум 6 символов' 
            } 
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {!isLoginForm && (
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Подтвердите пароль"
            {...register('confirmPassword', { 
              required: 'Подтверждение пароля обязательно',
              validate: (value, formValues) => 
                value === formValues.password || 'Пароли не совпадают'
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2,
            backgroundColor: '#00CED1',
            '&:hover': {
              backgroundColor: '#48D1CC', 
            }
           }}
        >
          {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;