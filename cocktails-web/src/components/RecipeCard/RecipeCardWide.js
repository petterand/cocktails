import { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es';
import threeDots from '../../../images/three_dots.svg';
import editIcon from '../../../images/edit_white.svg';
import shareIcon from '../../../images/share_white.svg';
import Icon from '../Icon';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import navigate from '../../common/navigate';
import ConditionalRender from '../ConditionalRender';
import { useModalContext } from '../../contextProviders/modalContext';
import EditModal from '../EditModal';
import { useToastContext } from '../../contextProviders/toastContext';
import { useUserContext } from '../../contextProviders/userContext';
import { sendEvent } from '../../common/analytics';
import {
   Icons,
   MenuButton,
   RecipeBasicInfo,
   RecipeMain,
   BackMenu,
   Card,
   RecipeDetails,
} from './styles';

import RecipeImage from './RecipeImage';

const OpenMenuButton = (props) => {
   return (
      <MenuButton onClick={props.onClick}>
         <img src={threeDots} />
      </MenuButton>
   );
};

const RecipeCardWide = (props) => {
   const cardRef = useRef(null);
   const mainRef = useRef(null);
   const { recipe } = props;
   const [isExpanded, setIsExpanded] = useState(false);
   const [imageLoaded, setImageLoaded] = useState(null);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const { deepLinkedRecipe } = useRecipeContext();
   const { openModal } = useModalContext();
   const { showToast } = useToastContext();
   const { isSignedIn } = useUserContext();

   useEffect(() => {
      if (deepLinkedRecipe?.id === recipe.id && !isExpanded) {
         setIsExpanded(true);
      }
   }, [deepLinkedRecipe?.id]);

   useEffect(() => {
      const el = cardRef.current;
      const mainEl = mainRef.current;
      if (isExpanded && imageLoaded) {
         anime({
            targets: el,
            easing: 'linear',
            duration: 300,
            height: mainEl.scrollHeight,
            complete: () => {
               window.scrollTo({
                  top: el.offsetTop - 16,
                  behavior: 'smooth',
               });
            },
         });
      } else if (!isExpanded) {
         anime({
            targets: el,
            easing: 'linear',
            duration: 100,
            height: 150,
         });
      }
   }, [isExpanded, imageLoaded, recipe.image]);

   const onClick = () => {
      if (!isExpanded) {
         sendEvent('expand', { event_label: recipe.name });
         setIsExpanded(true);
      } else {
         if (deepLinkedRecipe) {
            navigate('');
         }
         setIsExpanded(false);
         setIsMenuOpen(false);
      }
   };

   const onImageLoad = (e) => {
      setImageLoaded(e.target.src);
   };

   const openMenu = (e) => {
      e.stopPropagation();
      setIsMenuOpen((s) => !s);
   };

   const closeMenu = (e) => {
      e.stopPropagation();
      setIsMenuOpen(false);
   };

   const openEditModal = (e) => {
      e.stopPropagation();
      openModal({
         body: <EditModal value={recipe} />,
      });
   };

   const onShare = async (e) => {
      e.stopPropagation();
      sendEvent(`share`, { event_label: recipe.name });
      const url = `${window.location.origin}/#${props.recipe.urlId}`;
      await navigator.clipboard.writeText(url);
      showToast({
         variant: 'info',
         timeout: 3000,
         text: 'Url kopierad till urklipp',
      });
   };

   return (
      <Card onClick={onClick} ref={cardRef} shouldExpand={isExpanded}>
         <RecipeMain
            ref={mainRef}
            shouldExpand={isExpanded}
            className={isMenuOpen ? 'open' : ''}
         >
            <ConditionalRender predicate={isExpanded}>
               <OpenMenuButton onClick={openMenu} />
            </ConditionalRender>
            <RecipeImage
               recipe={recipe}
               shouldExpand={isExpanded}
               onLoad={onImageLoad}
            />
            <RecipeBasicInfo>
               <p>{recipe.name}</p>
               <Icons>
                  <Icon icon={recipe.preparation} />
                  <Icon icon={recipe.servingStyle} />
               </Icons>
            </RecipeBasicInfo>
            <RecipeDetails shouldExpand={isExpanded}>
               <ul>
                  {recipe.ingredients.map((ingredient, i) => (
                     <li key={i}>{ingredient}</li>
                  ))}
               </ul>
               <ConditionalRender predicate={recipe.description}>
                  <p>{recipe.description}</p>
               </ConditionalRender>
            </RecipeDetails>
         </RecipeMain>
         <BackMenu onClick={closeMenu}>
            <ConditionalRender predicate={isSignedIn}>
               <div onClick={openEditModal}>
                  <img src={editIcon} alt={`edit ${recipe.name}`} />
               </div>
            </ConditionalRender>
            <div onClick={onShare}>
               <img src={shareIcon} alt={`share ${recipe.name}`} />
            </div>
         </BackMenu>
      </Card>
   );
};

export default RecipeCardWide;
