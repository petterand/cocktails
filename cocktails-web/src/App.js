import React from 'react';
import Cocktails from './components/Cocktails';
import ModalContextProvider from './contextProviders/modalContext';

const App = () => {
   return (
      <ModalContextProvider>
         <Cocktails />
      </ModalContextProvider>
   );
};

export default App;
