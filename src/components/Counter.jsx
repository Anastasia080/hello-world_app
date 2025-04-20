import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';
import Button from './button';

const Counter = ({ theme }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Counter: {count}</h2>
      <div style={{ display: 'flex', gap: '2px', marginLeft: '100px' }}>
        <Button label="Increment" onClick={() => dispatch(increment())} theme={theme} />
        <Button label="Decrement" onClick={() => dispatch(decrement())} theme={theme} />
      </div>
    </div>
  );
};

export default Counter;