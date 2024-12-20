import React, { useState } from 'react';

function MyComponent() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <DarkModeToggle />
      <div className="bg-white dark:bg-gray-700 p-4">
        Contenido que cambia de color según el modo
      </div>
    </div>
  );
}

export default MyComponent;