import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import processRecipe from '../../common/processRecipe';
import onClickOutside from '../../common/onClickOutside';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import Tools from './Tools';
import { useToastContext } from '../../contextProviders/toastContext';

const AddRecipe = () => {
   const addRef = useRef(null);
   const wrapperRef = useRef(null);
   const [expanded, setExpanded] = useState(false);
   const [dirty, setDirty] = useState(false);
   const [preparation, setPreparation] = useState(null);
   const [servingStyle, setServingStyle] = useState(null);
   const [busy, setBusy] = useState(false);
   const { addRecipe } = useRecipeContext();
   const { showToast } = useToastContext();

   useEffect(() => {
      const el = addRef.current;
      let remove;
      if (el && expanded) {
         remove = onClickOutside(wrapperRef.current, () => {
            if (!dirty) {
               setExpanded(false);
            }
         });
         el.focus();
      }

      return () => remove && remove();
   }, [expanded, dirty]);

   const saveRecipe = async (e) => {
      e.stopPropagation();
      const el = addRef.current;
      const recipe = el.value;

      if (recipe) {
         try {
            const processedRecipe = {
               ...processRecipe(recipe),
               servingStyle,
               preparation,
            };
            setBusy(true);
            await addRecipe(processedRecipe);
            setBusy(false);
            setExpanded(false);
            setServingStyle(null);
            setPreparation(null);
         } catch (e) {
            showToast({
               text: 'Det gick inte att lägga till cocktail',
               variant: 'error',
               data: e.message,
            });
            setBusy(false);
            console.error(e);
         }
      }
   };

   const onInput = () => {
      const content = addRef.current.value;

      if (!content) {
         setDirty(false);
      } else {
         setDirty(true);
      }
   };

   const onChangeTool = (cb) => (value) => {
      setDirty(true);
      cb(value);
   };

   return (
      <AddRecipeWrapper
         expanded={expanded}
         onClick={() => setExpanded(true)}
         ref={wrapperRef}
      >
         {expanded ? (
            <>
               <AddRecipeTextBox
                  expanded={expanded}
                  ref={addRef}
                  onInput={onInput}
               />
               <Tools
                  saveRecipe={saveRecipe}
                  onChangePreparation={onChangeTool(setPreparation)}
                  onChangeServingStyle={onChangeTool(setServingStyle)}
                  selectedServingStyle={servingStyle}
                  selectedPreperation={preparation}
                  buttonBusy={busy}
               />
            </>
         ) : (
            'Lägg till recept'
         )}
      </AddRecipeWrapper>
   );
};

const AddRecipeTextBox = styled.textarea`
   border: none;
   outline: none;
   flex: 1;
   margin-bottom: ${(props) => (props.expanded ? '8px' : '')};
   font-family: 'Ubuntu', sans-serif;
   font-size: 16px;
`;

const expandedStyle = css`
   height: 200px;
   padding: 16px 16px 8px;
`;

const AddRecipeWrapper = styled.div`
   color: ${(props) => (props.contentEditable ? '#000' : 'var(--placeholder)')};
   border: 1px solid #e0e0e0;
   border-radius: 4px;
   padding: 16px;
   margin-top: 16px;
   display: flex;
   flex-direction: column;
   ${(props) => props.expanded && expandedStyle}
   user-select: none;

   @media screen and (min-width: 540px) {
      max-width: 500px;
      margin: 16px auto 0;
   }
`;

export default AddRecipe;
