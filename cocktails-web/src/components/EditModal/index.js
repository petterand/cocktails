import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import processRecipe from '../../common/processRecipe/processRecipe';
import { Divider } from '../../common/styles';
import { useModalContext } from '../../contextProviders/modalContext';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import Button from '../Button';
import Preparation from '../Preparation';
import ServingStyle from '../ServingStyle';

const EditTextBox = styled.textarea`
   border: none;
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

   @media screen and (min-width: 540px) {
      max-width: 700px;
   }
`;

const ButtonWrapper = styled.div`
   border-top: 1px solid var(--timber-wolf);
   padding-top: 8px;
   display: flex;
   > button {
      margin-left: auto;
   }
`;

function recipeToText(recipe) {
   return `${recipe.name}\r\n\r\n${recipe.ingredients.join('\r\n')}\r\n\r\n${
      recipe.description || ''
   }`;
}

const EditModal = (props) => {
   const inputRef = useRef(null);
   const [preparation, setPreparation] = useState(null);
   const [servingStyle, setServingStyle] = useState(null);
   const [busy, setBusy] = useState(false);
   const { updateRecipe } = useRecipeContext();
   const { closeModal } = useModalContext();

   useEffect(() => {
      setPreparation(props.value.preparation);
      setServingStyle(props.value.servingStyle);
   }, [props.value]);

   const onSave = async () => {
      try {
         const recipe = {
            ...props.value,
            preparation,
            servingStyle,
            ...processRecipe(inputRef.current.value),
         };
         setBusy(true);
         await updateRecipe(recipe);
         setBusy(false);
         closeModal();
      } catch (e) {
         setBusy(false);
         console.error(e);
      }
   };

   return (
      <Wrapper>
         <EditTextBox defaultValue={recipeToText(props.value)} ref={inputRef} />
         <ButtonWrapper>
            <Preparation onChange={setPreparation} value={preparation} />
            <Divider />
            <ServingStyle onChange={setServingStyle} value={servingStyle} />
            <Button variant="primary" onClick={onSave} busy={busy}>
               Spara
            </Button>
         </ButtonWrapper>
      </Wrapper>
   );
};

export default EditModal;
