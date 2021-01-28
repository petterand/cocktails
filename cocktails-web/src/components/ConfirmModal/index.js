import styled from 'styled-components';
import { useModalContext } from '../../contextProviders/modalContext';
import Button from '../Button';

const ButtonRow = styled.div`
   margin-top: 16px;
   display: flex;
   justify-content: flex-end;
`;

const ConfirmModal = (props) => {
   const { closeModal } = useModalContext();

   const onPrimary = () => {
      props.onPrimary();
      closeModal();
   };

   return (
      <>
         <p>{props.children}</p>
         <ButtonRow>
            <Button variant="secondary" onClick={onPrimary}>
               Ja
            </Button>
            <Button variant="primary" onClick={closeModal}>
               Nej
            </Button>
         </ButtonRow>
      </>
   );
};

ConfirmModal.defaultProps = {
   onPrimary: () => {},
};

export default ConfirmModal;
