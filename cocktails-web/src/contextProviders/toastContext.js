import React from 'react';
import Toast from '../components/Toast';

const ToastContext = React.createContext({});

export const useToastContext = () => React.useContext(ToastContext);

const ToastContextProvider = (props) => {
   const [toasts, setToasts] = React.useState([]);

   const showToast = (t) => {
      setToasts((s) => [...s, t]);
   };

   const hideToast = (id) => {
      setToasts((s) => s.filter((t) => t.id === id));
   };

   return (
      <ToastContext.Provider value={{ showToast, hideToast }}>
         {props.children}
         {toasts.map((t, i) => (
            <Toast key={i} {...t} id={i} />
         ))}
      </ToastContext.Provider>
   );
};

export default ToastContextProvider;
