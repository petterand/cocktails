import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import edit from '../../../images/edit.svg';
import remove from '../../../images/remove.svg';
import share from '../../../images/share_white.svg';
import { hasKey } from '../../common/auth';
import { RecipeContent, Card, BackMenu, Icon } from './styles';
import { useModalContext } from '../../contextProviders/modalContext';
import { useRecipeContext } from '../../contextProviders/recipeContext';
import ConfirmModal from '../ConfirmModal';

const RecipeCard = (props) => {
   const containerRef = useRef(null);
   const { openModal } = useModalContext();
   const { removeRecipe } = useRecipeContext();

   const noop = () => {};

   const animate = (val, duration = 300) =>
      anime({
         targets: containerRef.current,
         translateX: val,
         duration,
      });

   useEffect(() => {
      const hasHinted = localStorage.getItem('menu-hint');
      if (!hasHinted && hasKey() && props.recipeIndex === 0) {
         setTimeout(() => animate(-25, 700), 1000);
         setTimeout(() => animate(0), 2500);
         localStorage.setItem('menu-hint', true);
      }
   }, []);

   const isMenuOpen = () =>
      containerRef.current.style.transform.includes('-50px');

   const onClick = () => {
      if (hasKey()) {
         if (!isMenuOpen()) {
            animate(-50);
         } else {
            animate(0);
         }
      }
   };

   const setHandler = (handler) => (hasKey() ? handler : noop);

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

   const onShare = async () => {
      console.log('SHARE');
      const url = `${window.location.origin}/#${props.recipe.urlId}`;
      await navigator.clipboard.writeText(url);
      console.log('written to clipboard');
   };

   const openDetails = (e) => {
      e.stopPropagation();
      window.location.hash = `#${props.recipe.urlId}`;
   };

   return (
      <Card>
         <RecipeContent onClick={setHandler(onClick)} ref={containerRef}>
            <p onClick={openDetails}>{props.recipe.name}</p>
            <ul>
               {props.recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
               ))}
            </ul>
            <div>{props.recipe.description}</div>
         </RecipeContent>
         <BackMenu>
            <div>
               <div onClick={onShare}>
                  <Icon
                     alt="Share icon"
                     width="26px"
                     height="26px"
                     src={share}
                  />
               </div>
               <div>
                  <Icon alt="Edit icon" width="26px" height="26px" src={edit} />
               </div>
               <div onClick={onRemove(props.recipe.id)}>
                  <Icon
                     alt="Remove icon"
                     width="26px"
                     height="26px"
                     src={remove}
                  />
               </div>
            </div>
         </BackMenu>
      </Card>
   );
};

export default RecipeCard;
