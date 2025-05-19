import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

// Minimum swipe distance in pixels to trigger action
const SWIPE_THRESHOLD = 200;

function TodoItem({ todo, handleSwipe }) {
  const [deltaX, setDeltaX] = useState(0);
  const [swipingDirection, setSwipingDirection] = useState(null); // 'left', 'right', or null

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setDeltaX(eventData.deltaX);
      if (eventData.deltaX > 0) {
        setSwipingDirection('right');
      } else if (eventData.deltaX < 0) {
        setSwipingDirection('left');
      } else {
        setSwipingDirection(null);
      }
    },
    onSwipedLeft: (eventData) => {
      if (Math.abs(eventData.deltaX) >= SWIPE_THRESHOLD) {
        handleSwipe('left', todo.id);
      }
      setDeltaX(0);
      setSwipingDirection(null);
    },
    onSwipedRight: (eventData) => {
      if (Math.abs(eventData.deltaX) >= SWIPE_THRESHOLD) {
        handleSwipe('right', todo.id);
      }
      setDeltaX(0);
      setSwipingDirection(null);
    },
    onSwiped: () => {
      setDeltaX(0);
      setSwipingDirection(null);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  let itemClassName = `todo-item ${todo.completed ? 'completed' : ''}`;
  if (swipingDirection === 'left') {
    itemClassName += ' swiping-left';
  } else if (swipingDirection === 'right') {
    itemClassName += ' swiping-right';
  }

  return (
    <li
      {...handlers}
      className={itemClassName}
      style={{ transform: `translateX(${deltaX}px)` }}
    >
      {todo.text}
    </li>
  );
}

export default TodoItem;
