import styled from 'styled-components';
import ConditionalRender from '../ConditionalRender';

const Wrapper = styled.div`
   position: absolute;
   top: 16px;
   bottom: 16px;
   left: 16px;
   right: 16px;
   background-color: white;
   z-index: 999;
   border: 1px solid #e0e0e0;
   padding: 32px 16px 16px;
   border-left: 6px solid var(--aero-blue);
`;

const CloseButton = styled.span`
   font-size: 32px;
   position: absolute;
   top: 16px;
   right: 16px;
   line-height: 12px;
   cursor: pointer;
`;

const Ingredients = styled.ul`
   margin-top: 32px;
   list-style-type: none;
`;

const Instructions = styled.p`
   margin-top: 32px;
`;

const Details = ({ recipe, onClose }) => (
   <Wrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>{recipe.name}</h2>
      <Ingredients>
         {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
         ))}
      </Ingredients>
      <Instructions>{recipe.description}</Instructions>
   </Wrapper>
);

const RecipeDetails = ({ recipe }) => {
   const onClose = () => (window.location.hash = '');

   return (
      <ConditionalRender predicate={recipe}>
         <Details recipe={recipe} onClose={onClose} />
      </ConditionalRender>
   );
};

export default RecipeDetails;
