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
   width: 75%;
   padding: 48px 16px 16px;
   position: relative;
   > span {
      font-size: 32px;
      display: block;
      position: absolute;
      right: 16px;
      top: 6px;
   }
`;

const Modal = (props) => {
   const { closeModal } = useModalContext();
   return (
      <ModalWrapper>
         <ModalContent>
            <span onClick={closeModal}>×</span>
            {props.children}
         </ModalContent>
      </ModalWrapper>
   );
};

export default Modal;
