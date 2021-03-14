import { useState } from 'react';
import styled from 'styled-components';
import { useModalContext } from '../../contextProviders/modalContext';
import { useToastContext } from '../../contextProviders/toastContext';
import Button from '../Button';

const ButtonRow = styled.div`
   margin-top: 16px;
   display: flex;
   justify-content: flex-end;
   > button:first-child {
      margin-right: 16px;
   }
`;

const ConfirmModal = (props) => {
   const { closeModal } = useModalContext();
   const [busy, setBusy] = useState(false);
   const { showToast } = useToastContext();

   const onPrimary = async () => {
      try {
         setBusy(true);
         await props.onPrimary();
         setBusy(false);
      } catch (e) {
         setBusy(false);
         showToast({
            text: 'Det gick inte att ta bort cocktail',
            variant: 'error',
            data: e.message,
         });
      }
   };

   return (
      <>
         <p>{props.children}</p>
         <ButtonRow>
            <Button variant="secondary" onClick={onPrimary} busy={busy}>
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
