import { useEffect } from 'react';
import { sendEvent } from '../../common/analytics';
import { useUserContext } from '../../contextProviders/userContext';
import ConditionalRender from '../ConditionalRender';
import Icon from '../Icon';
import editIcon from '../../../images/edit.svg';
import {
   InfoRow,
   Ingredients,
   Instructions,
   ToolsWrapper,
   Wrapper,
   Header,
} from './styles';
import { useModalContext } from '../../contextProviders/modalContext';
import EditModal from '../EditModal';

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

const Tools = ({ recipe }) => {
   const { isSignedIn } = useUserContext();
   const { openModal } = useModalContext();

   const onEdit = () => {
      openModal({
         body: <EditModal value={recipe} />,
      });
   };

   return (
      <ConditionalRender predicate={isSignedIn}>
         <ToolsWrapper>
            <div onClick={onEdit}>
               <img src={editIcon} />
            </div>
         </ToolsWrapper>
      </ConditionalRender>
   );
};

const Details = ({ recipe }) => {
   return (
      <Wrapper>
         <ConditionalRender predicate={recipe.image}>
            <div className="main-image">
               <img
                  src={`${process.env.IMAGE_BASE}${recipe.image}`}
                  className="blur-image"
               />
               <img src={`${process.env.IMAGE_BASE}${recipe.image}`} />
            </div>
         </ConditionalRender>
         <Header>
            <h2>{recipe.name}</h2>
            <Tools recipe={recipe} />
         </Header>
         <ConditionalRender
            predicate={recipe.preparation || recipe.servingStyle}
         >
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
};

const RecipeDetails = ({ recipe }) => {
   useEffect(() => {
      sendEvent('show', {
         event_category: 'details',
         event_label: recipe.name,
      });
   }, []);
   return <Details recipe={recipe} />;
};

export default RecipeDetails;
