import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypedText = () => {
  const typingRef = useRef(null);

  useEffect(() => {
    const options1 = {
      strings: [
        'React.js',
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'MongoDB',
        'GraphQL',
        'Prisma',
        'Docker',
      ],
      typeSpeed: 40,
      backSpeed: 20,
      loop: true,
    };
    const options2 = {
      strings: ['Programmer', 'Full-stack Developer', 'Graphic Designer'],
      typeSpeed: 40,
      backSpeed: 20,
      loop: true,
    };

    const typed = new Typed(typingRef.current, options1);

    return () => {
      typed.destroy();
    };
  }, []);

  const styles = {
    typing: {
      display: 'inline-block',
      opacity: 1,
      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
      color: '#0084FF', // Initial color is blue
    },
  };

  return (
    <div>
      <span ref={typingRef} style={styles.typing}></span>
    </div>
  );
};

export default TypedText;
