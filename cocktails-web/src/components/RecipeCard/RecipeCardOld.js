import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { sendEvent } from '../../common/analytics';
import share from '../../../images/share_white.svg';
import expand from '../../../images/expand.svg';
import { RecipeContent, Card, BackMenu, Icon, RecipeName } from './stylesOld';

import navigate from '../../common/navigate';
import { useToastContext } from '../../contextProviders/toastContext';

const RecipeCard = (props) => {
   const containerRef = useRef(null);

   const { showToast } = useToastContext();

   const animate = (val, duration = 300) =>
      anime({
         targets: containerRef.current,
         translateX: val,
         duration,
      });

   useEffect(() => {
      const hasHinted = localStorage.getItem('menu-hint');
      if (!hasHinted && props.recipeIndex === 0) {
         setTimeout(() => animate(-25, 700), 1000);
         setTimeout(() => animate(0), 2500);
         localStorage.setItem('menu-hint', true);
      }
   }, []);

   const isMenuOpen = () =>
      containerRef.current.style.transform.includes('-50px');

   const onClick = () => {
      if (!isMenuOpen()) {
         animate(-50);
      } else {
         animate(0);
      }
   };

   const onShare = async () => {
      const url = `${window.location.origin}/#${props.recipe.urlId}`;
      await navigator.clipboard.writeText(url);
      showToast({
         variant: 'info',
         timeout: 3000,
         text: 'Url kopierad till urklipp',
      });
   };

   const openDetails = (source) => (e) => {
      e.stopPropagation();
      sendEvent(`open-${source}`, {
         event_category: 'details',
         event_label: props.recipe.name,
      });
      navigate(props.recipe.urlId);
   };

   return (
      <Card>
         <RecipeContent onClick={onClick} ref={containerRef}>
            <RecipeName onClick={openDetails('name-click')}>
               {props.recipe.name}
            </RecipeName>
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
                  <Icon alt="Share icon" src={share} />
               </div>
               <div onClick={openDetails('menu-click')}>
                  <Icon alt="Visa detaljer" src={expand} />
               </div>
            </div>
         </BackMenu>
      </Card>
   );
};

export default RecipeCard;
