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

   const touchStart = (e) => {
      e.target.dataset.x =
         Number(e.touches[0].pageX) + Number(e.target.dataset.move || 0);
   };
   const touchMove = (e) => {
      let moveX = Number(e.target.dataset.x) - e.touches[0].pageX;
      if (moveX > 50) {
         moveX = 50;
      }
      if (moveX < 0) {
         moveX = 0;
      }
      e.target.dataset.move = moveX;
      animate(-Number(e.target.dataset.move));
   };
   const touchEnd = (e) => {
      if (e.target.dataset.move > 50) {
         e.target.dataset.move = 50;
      } else if (e.target.dataset.move < -50) {
         e.target.dataset.move = -50;
      } else {
         e.target.dataset.move = 0;
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

   return (
      <Card>
         <RecipeContent
            onClick={setHandler(onClick)}
            onTouchStart={setHandler(touchStart)}
            onTouchMove={setHandler(touchMove)}
            onTouchEnd={setHandler(touchEnd)}
            ref={containerRef}
         >
            <p>{props.recipe.name}</p>
            <ul>
               {props.recipe.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
               ))}
            </ul>
            <div>{props.recipe.description}</div>
         </RecipeContent>
         <BackMenu>
            <div>
               <a href={`#${props.recipe.urlId}`}>
                  <Icon width="26px" height="26px" src={share} />
               </a>
               <div>
                  <Icon width="26px" height="26px" src={edit} />
               </div>
               <div onClick={onRemove(props.recipe.id)}>
                  <Icon width="26px" height="26px" src={remove} />
               </div>
            </div>
         </BackMenu>
      </Card>
   );
};

export default RecipeCard;
