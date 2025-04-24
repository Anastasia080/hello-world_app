import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';
import Button from './button';

const Counter = ({ theme }) => {
  const count = useSelector((state) => state.counter?.value ?? 0);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: 'flex', gap: '2px', marginLeft: '45px' }}>
        <Button label="Increment" onClick={() => dispatch(increment())} theme={theme} />
        <Button label="Decrement" onClick={() => dispatch(decrement())} theme={theme} />
      </div>
    </div>
  );
};

export default Counter;