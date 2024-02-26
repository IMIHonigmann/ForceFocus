import React, { useEffect, useRef, useState } from 'react';

const TODOComponent = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [indexToRemove, setIndexToRemove] = useState(-1);
  const [editModeIndex, setEditModeIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleEdit = (indexToEdit) => {
    let newTodoList = [...todoList];
    newTodoList[indexToEdit] = todo;
    setTodoList(newTodoList);
    setEditModeIndex(-1);
  };
  
  return (
    <>
      <input
        ref={inputRef}
        placeholder='Add to list...'
        type='text'
        value={todo}
        onChange={e => setTodo(e.target.value)}
      />

      <button
        onClick={ (editModeIndex !== -1 ? () => handleEdit(editModeIndex) : () => {todo === '' ? {} : setTodoList([...todoList, todo]); inputRef.current.select();}) }
      >
        {editModeIndex !== -1 ? 'Edit!' : 'Add to List'}
      </button>

      {editModeIndex !== -1 && ' ' + editModeIndex}

      {todoList.map((element, index) => (
        <p key={index} className={index == indexToRemove ? 'removeAnimation' : ''} 
        style={{ transitionDuration: '0.2s',
        ...(editModeIndex == index ? {color: 'red', marginLeft: '30px'} : {marginLeft: '10px'})
        }}>
          <button
            onClick={() => { 
              setEditModeIndex(-1);
              setIndexToRemove(index);
              setTimeout(() => {
              setTodoList([...todoList.slice(0, index), ...todoList.slice(index + 1)]);
              setIndexToRemove(-1)
            }, 100);
              }
            }
          >
            ✖
          </button>
          {' '}
          <button onClick={() => {
            setEditModeIndex(index);
            inputRef.current.select();
            setTodo(element);
          }}>🖋</button>
          <span style={{ transitionDuration: '0.4s', borderStyle: 'groove', borderRadius: '10px',  ...(editModeIndex == index ? {marginLeft: '10px', padding: '10px'} : {padding: '5px'}) }}>
            {' '} {index} {element}
          </span>
        </p>
      ))}
    </>
  );
};

const TimerComponent = () => {
  const [secs, setSecs] = useState(0);
  const [mins, setMins] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const [beepin, setBeepin] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if(runTimer) {
        setSecs(previousTime => {
          if (previousTime === 59) {
            setMins(previousMins => {
              if(previousMins == 59) {
                setHrs(previousHrs => previousHrs + 1)
              }
              return (previousMins + 1) % 60
            });
          }
          return (previousTime + 1) % 60;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [runTimer]);

  useEffect(() => {
    const beeper = setInterval(() => {
      if(!runTimer) {
        setBeepin(prev => !prev)
      }
    }, 700);

    return () => clearInterval(beeper);
  }, [runTimer]);

  return (
    <>
    <p style={{fontSize: 100, margin: 30, display: 'flex', justifyContent: 'center', color: 'yellow'}} className={beepin || runTimer ? 'beep-in' : 'beep-out'}>
      {hrs < 10 ? '0'+hrs : hrs}:{mins < 10 ? '0'+mins : mins}:{secs < 10 ? '0'+secs : secs}
    </p>
    <p>
      <button
        onClick={() => setRunTimer(prev => !prev)}
      > Start Timer!</button>
    </p>
    </>
  )
};

const RenderComponent = () => {
  return (
    <>
      {TimerComponent()}
      {TODOComponent()}
    </>
  ) 
}

export default RenderComponent;