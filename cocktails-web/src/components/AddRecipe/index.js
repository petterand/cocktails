import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';

import processRecipe from './processRecipe';

const Tools = (props) => {
   return (
      <div>
         <Button onClick={props.saveRecipe}>Lägg till</Button>
      </div>
   );
};

const AddRecipe = ({ addRecipe }) => {
   const addRef = useRef(null);
   const [expanded, setExpanded] = useState(false);
   const [dirty, setDirty] = useState(false);

   useEffect(() => {
      const el = addRef.current;
      if (el && expanded) {
         el.focus();
      }
   }, [expanded]);

   const saveRecipe = (e) => {
      e.stopPropagation();
      const el = addRef.current;
      const recipe = el.value;

      if (recipe) {
         try {
            addRecipe(processRecipe(recipe));
            setExpanded(false);
         } catch (e) {
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

   return (
      <AddRecipeWrapper
         expanded={expanded}
         onClick={() => {
            setExpanded(true);
         }}
      >
         {expanded ? (
            <AddRecipeTextBox
               expanded={expanded}
               ref={addRef}
               onBlur={() => !dirty && setExpanded(false)}
               onInput={onInput}
            />
         ) : (
            'Lägg till recept'
         )}
         {expanded && <Tools saveRecipe={saveRecipe} />}
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

const AddRecipeContent = styled.div`
   outline: none;
   flex: 1;
   &:before {
      ${(props) => props.contentEditable || 'content: "Lägg till recept"'};
   }
`;

const expandedStyle = css`
   height: 200px;
`;

const AddRecipeWrapper = styled.div`
   color: ${(props) => (props.contentEditable ? '#000' : 'var(--placeholder)')};
   border: 1px solid #e0e0e0;
   border-radius: 4px;
   margin-top: 16px;
   padding: 16px;

   display: flex;
   flex-direction: column;
   ${(props) => props.expanded && expandedStyle}
`;

export default AddRecipe;
