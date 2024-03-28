import { useEffect, useState } from 'react';

const CookieComponent: React.FC = () => {
  const [cookieValue, setCookieValue] = useState<string>('');

  useEffect(() => {
    // Function to read a specific cookie by name
    const getCookie = (name: string): string | undefined => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    // Reading a cookie named 'example_cookie'
    const exampleCookieValue = getCookie('token');
    console.log(exampleCookieValue,'cookie');
    
    setCookieValue(exampleCookieValue || 'Cookie not found');
  }, []);

  return (
    <div>
      <p>Cookie Value: {cookieValue}</p>
    </div>
  );
};

export default CookieComponent;
