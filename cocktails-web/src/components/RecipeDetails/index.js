import navigate from '../../common/navigate';
import { useUserContext } from '../../contextProviders/userContext';
import ConditionalRender from '../ConditionalRender';
import Icon from '../Icon';
import editIcon from '../../../images/edit.svg';
import removeIcon from '../../../images/remove.svg';
import {
   CloseButton,
   InfoRow,
   Ingredients,
   Instructions,
   ToolsWrapper,
   Wrapper,
   Header,
} from './styles';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import { useModalContext } from '../../contextProviders/modalContext';
import ConfirmModal from '../ConfirmModal';
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
   const { removeRecipe } = useRecipeContext();

   const onRemove = (id) => async () => {
      const remove = async () => {
         removeRecipe(id);
      };
      openModal({
         body: (
            <ConfirmModal onPrimary={remove}>
               Är du säker på att du vill ta bort receptet?
            </ConfirmModal>
         ),
      });
   };

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
            <div onClick={onRemove(recipe.id)}>
               <img src={removeIcon} />
            </div>
         </ToolsWrapper>
      </ConditionalRender>
   );
};

const Details = ({ recipe, onClose }) => (
   <Wrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>

      <Header>
         <h2>{recipe.name}</h2>
         <Tools recipe={recipe} />
      </Header>
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
