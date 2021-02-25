import { useRef } from 'react';
import styled from 'styled-components';
import processRecipe from '../../common/processRecipe/processRecipe';
import { useModalContext } from '../../contextProviders/modalContext';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import Button from '../Button';

const EditTextBox = styled.textarea`
   border: 1px solid var(--battleship-grey);
   outline: none;
   flex: 1;
   font-family: 'Ubuntu', sans-serif;
   font-size: 16px;
   width: 100%;
   height: 100%;
   resize: none;
   padding: 8px;
`;

const Wrapper = styled.div`
   min-height: 300px;
   display: flex;
   flex-direction: column;
   width: calc(90vw - 32px);
`;

const ButtonWrapper = styled.div`
   margin-top: 8px;
   display: flex;
   justify-content: flex-end;
`;

function recipeToText(recipe) {
   return `${recipe.name}\r\n\r\n${recipe.ingredients.join('\r\n')}\r\n\r\n${
      recipe.description || ''
   }`;
}

const EditModal = (props) => {
   const inputRef = useRef(null);
   const { updateRecipe } = useRecipeContext();
   const { closeModal } = useModalContext();

   const onSave = async () => {
      try {
         const recipe = {
            ...props.value,
            ...processRecipe(inputRef.current.value),
         };
         await updateRecipe(recipe);
         closeModal();
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <Wrapper>
         <EditTextBox defaultValue={recipeToText(props.value)} ref={inputRef} />
         <ButtonWrapper>
            <Button variant="primary" onClick={onSave}>
               Spara
            </Button>
         </ButtonWrapper>
      </Wrapper>
   );
};

export default EditModal;
