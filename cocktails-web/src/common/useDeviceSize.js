import { useEffect, useState } from 'react';

const useDeviceSize = () => {
   const [size, setSize] = useState('small');

   const mql = window.matchMedia('(min-width: 540px)');
   const fn = () => {
      setSize(mql.matches ? 'large' : 'small');
   };

   useEffect(() => {
      fn();
      window.addEventListener('resize', fn);

      return () => window.removeEventListener('resize', fn);
   }, []);

   return size;
};

export default useDeviceSize;
