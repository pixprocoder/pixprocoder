'use client';
import { useState } from 'react';

export default function CartIcon() {
  const [position, setPosition] = useState({ x: 20, y: 20 }); // Initial position

  const handleDrag = (e) => {
    // Prevent default touch behavior
    e.preventDefault();

    if (e.type === 'mousemove' || e.type === 'touchmove') {
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

      setPosition({ x: clientX - 25, y: clientY - 25 }); // Adjust for icon size
    }
  };

  const handleDragEnd = () => {
    // Cleanup if needed
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleDragEnd);
  };

  const startDrag = (e) => {
    e.preventDefault();

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  return (
    <div
      className="fixed z-50 bg-white rounded-full p-4 shadow-lg cursor-pointer text-blue-500"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '50px',
        height: '50px',
      }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      🛒
    </div>
  );
}
