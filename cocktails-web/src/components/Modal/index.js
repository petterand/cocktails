import { useModalContext } from '../../contextProviders/modalContext';
import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-color: #00000080;
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 999;
`;

const ModalContent = styled.div`
   background-color: #fff;
   padding: 48px 16px 16px;
   position: relative;
   max-width: 90%;
   z-index: 1000;
`;

const CloseButton = styled.span`
   cursor: pointer;
   font-size: 32px;
   display: block;
   position: absolute;
   right: 16px;
   top: 6px;
   z-index: 1000;
`;

const Modal = (props) => {
   const { closeModal } = useModalContext();
   const onClose = () => {
      if (props.onClose) {
         props.onClose();
      }
      closeModal();
   };
   return (
      <ModalWrapper>
         <ModalContent>
            <CloseButton onClick={onClose}>×</CloseButton>
            {props.children}
         </ModalContent>
      </ModalWrapper>
   );
};

export default Modal;
