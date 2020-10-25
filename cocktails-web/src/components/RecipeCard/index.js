import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import edit from '../../../images/edit.svg';
import remove from '../../../images/remove.svg';
import { RecipeContent, Card, BackMenu, Icon } from './styles';

const RecipeCard = (props) => {
   const containerRef = useRef(null);

   const animate = (val, duration = 300) =>
      anime({
         targets: containerRef.current,
         translateX: val,
         duration: 300,
      });

   useEffect(() => {
      if (props.recipeIndex === 0) {
         setTimeout(() => animate(-25, 700), 1000);
         setTimeout(() => animate(0), 2500);
      }
   }, []);

   const isMenuOpen = () =>
      containerRef.current.style.transform.includes('-50px');

   const onDoubleClick = (e) => {
      if (!isMenuOpen()) {
         animate(-50);
      } else {
         animate(0);
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

   return (
      <Card>
         <RecipeContent
            onClick={onDoubleClick}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
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
               <Icon src={edit} />
               <Icon src={remove} />
            </div>
         </BackMenu>
      </Card>
   );
};

export default RecipeCard;
