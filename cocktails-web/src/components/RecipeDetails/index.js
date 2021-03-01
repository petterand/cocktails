import styled from 'styled-components';
import navigate from '../../common/navigate';
import ConditionalRender from '../ConditionalRender';
import Icon from '../Icon';

const Wrapper = styled.div`
   position: fixed;
   top: 16px;
   bottom: 16px;
   background-color: white;
   z-index: 999;
   border: 1px solid #e0e0e0;
   padding: 32px 16px 16px;
   border-left: 6px solid var(--aero-blue);
   left: 50%;
   max-width: 700px;
   transform: translateX(-50%);
   width: 90%;
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
   margin-top: 24px;
   list-style-type: none;
`;

const Instructions = styled.p`
   margin-top: 32px;
`;

const InfoRow = styled.div`
   display: flex;
   align-items: center;
   margin-top: 8px;
   > span {
      font-size: 12px;
   }
   > img {
      margin-right: 4px;
      &:first-of-type {
         height: 32px;
      }
      &:last-of-type {
         margin-left: 16px;
         height: 20px;
      }
   }
   &.stir {
      > img {
         &:first-of-type {
            margin-bottom: 8px;
         }
      }
   }
`;

const getServingText = (style) => {
   const map = {
      cocktail: 'cocktailglas',
      coupe: 'coupeglas',
      highball: 'highballglas',
      flute: 'flöjtglas',
      rocks: 'rocksglas',
   };
   return map[style] ? `Servera i ${map[style]}` : '';
};

const getPreparationText = (prep) => {
   const map = {
      shake: 'Skaka',
      stir: 'Rör över is',
   };
   return map[prep] || '';
};

const Details = ({ recipe, onClose }) => (
   <Wrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <h2>{recipe.name}</h2>
      <ConditionalRender predicate={recipe.preparation || recipe.servingStyle}>
         <InfoRow className={`${recipe.preparation} ${recipe.servingStyle}`}>
            <Icon icon={recipe.preparation} />
            <span>{getPreparationText(recipe.preparation)}</span>
            <Icon icon={recipe.servingStyle} />
            <span>{getServingText(recipe.servingStyle)}</span>
         </InfoRow>
      </ConditionalRender>
      <Ingredients>
         {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
         ))}
      </Ingredients>
      <Instructions>{recipe.description}</Instructions>
   </Wrapper>
);

const RecipeDetails = ({ recipe }) => {
   const onClose = () => navigate('');

   return (
      <ConditionalRender predicate={recipe}>
         <Details recipe={recipe} onClose={onClose} />
      </ConditionalRender>
   );
};

export default RecipeDetails;
