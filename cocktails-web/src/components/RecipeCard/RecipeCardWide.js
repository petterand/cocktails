import React, { lazy, useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es';
import threeDots from '../../../images/three_dots.svg';

import Icon from '../Icon';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import navigate from '../../common/navigate';
import ConditionalRender from '../ConditionalRender';
import { sendEvent } from '../../common/analytics';
import {
   Icons,
   MenuButton,
   RecipeBasicInfo,
   RecipeMain,
   Card,
   RecipeDetails,
} from './styles';
import RecipeImage from './RecipeImage';

const backMenuPromise = import('./BackMenu');
const BackMenu = lazy(() => backMenuPromise);

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
   const [isInteractedWith, setIsInteractedWith] = useState(false);
   const { deepLinkedRecipe } = useRecipeContext();
   const isDeeplinkedRecipe = deepLinkedRecipe?.id === recipe?.id;

   useEffect(() => {
      function resize() {
         const el = cardRef.current;
         const mainEl = mainRef.current;
         if (isExpanded && mainEl.scrollHeight > 0) {
            el.style.height = `${mainEl.scrollHeight}px`;
         }
      }
      if (isExpanded) {
         resize();
      }
   }, [isExpanded, recipe]);

   useEffect(() => {
      function collapse() {
         setIsExpanded(false);
      }
      window.addEventListener('collapseall', collapse);
      return () => window.removeEventListener('collapseall', collapse);
   }, []);

   useEffect(() => {
      if (deepLinkedRecipe?.id === recipe.id) {
         if (!isExpanded) {
            setIsExpanded(true);
            setIsInteractedWith(true);
         } else {
            const el = cardRef.current;
            window.scrollTo({
               top: el.offsetTop - 16,
               behavior: 'smooth',
            });
         }
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
      } else if (!isExpanded && isInteractedWith) {
         anime({
            targets: el,
            easing: 'linear',
            duration: 100,
            height: 150,
         });
      }
   }, [isExpanded, imageLoaded, recipe.image]);

   const onClick = () => {
      setIsInteractedWith(true);
      if (isMenuOpen) {
         setIsMenuOpen(false);
         return;
      }
      if (!isExpanded) {
         sendEvent('expand', { event_label: recipe.name });
         navigate(`/${recipe.urlId}`, recipe);
      } else {
         if (deepLinkedRecipe) {
            navigate('/');
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
               lazyLoad={!isDeeplinkedRecipe}
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
         <BackMenu recipe={recipe} setIsMenuOpen={setIsMenuOpen} />
      </Card>
   );
};

export default React.memo(RecipeCardWide);
