import React from 'react';
import Modal from '../components/Modal';

const ModalContext = React.createContext({});

export const useModalContext = () => React.useContext(ModalContext);

const ModalContextProvider = (props) => {
   const [openModals, setOpenModals] = React.useState([]);
   const openModal = (modal) => {
      const newState = [...openModals, modal];
      setOpenModals(newState);
      document.querySelector('body').classList.add('modal-open');
   };

   const closeModal = () => {
      const newState = [...openModals];
      newState.pop();
      setOpenModals(newState);
      if (newState.length === 0) {
         document.querySelector('body').classList.remove('modal-open');
      }
   };

   return (
      <ModalContext.Provider value={{ openModal, closeModal }}>
         {props.children}
         {openModals.map((m, i) => (
            <Modal key={i} {...m.props}>
               {m.body}
            </Modal>
         ))}
      </ModalContext.Provider>
   );
};

export default ModalContextProvider;
