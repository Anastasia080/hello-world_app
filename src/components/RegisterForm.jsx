import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { TextField, Button } from '@mui/material';

const AuthForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = useCallback((data) => {
    onSubmit(data);
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextField
        {...register('email', { required: 'Email обязателен', pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' } })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        type="password"
        {...register('password', { required: 'Пароль обязателен', minLength: { value: 6, message: 'Минимум 6 символов' } })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit">Войти</Button>
    </form>
  );
};