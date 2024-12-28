'use client';
import { useState, useEffect } from 'react';

export default function DraggableCartIcon() {
  const [position, setPosition] = useState({
    x: window.innerWidth - 70, // Default: Bottom-right
    y: window.innerHeight - 70,
  });
  const [dragging, setDragging] = useState(false);

  const handleDrag = (e: any) => {
    e.preventDefault(); // Prevent default browser behavior
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    // Update position without going out of bounds
    const x = Math.max(0, Math.min(window.innerWidth - 50, clientX - 25));
    const y = Math.max(0, Math.min(window.innerHeight - 50, clientY - 25));

    setPosition({ x, y });
  };

  const handleDragEnd = () => {
    setDragging(false);

    // Snap to nearest side (left or right)
    const snapX =
      position.x > window.innerWidth / 2 ? window.innerWidth - 60 : 20;
    setPosition((prev) => ({
      x: snapX,
      y: Math.max(20, Math.min(window.innerHeight - 70, prev.y)), // Ensure it doesn't go off-screen vertically
    }));

    // Remove event listeners
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', handleDragEnd);
  };

  const startDrag = (e: any) => {
    e.preventDefault(); // Prevent default touch behavior
    setDragging(true);

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  useEffect(() => {
    // Update position dynamically when the window resizes
    const updatePositionOnResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 60),
        y: Math.min(prev.y, window.innerHeight - 60),
      }));
    };

    window.addEventListener('resize', updatePositionOnResize);
    return () => {
      window.removeEventListener('resize', updatePositionOnResize);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 bg-blue-500 rounded-full p-4 shadow-lg cursor-pointer text-white transition-all duration-300 ${
        dragging ? 'opacity-75' : 'opacity-100'
      }`}
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
