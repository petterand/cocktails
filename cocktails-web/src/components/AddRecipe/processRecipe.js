import splitContent from './splitContent';

function convertAmount(ingredient) {
   const unitsToConvert = ['cl', 'oz'];
   const multiplier = [10, 30];

   for (let i = 0; i < unitsToConvert.length; i++) {
      const unit = unitsToConvert[i];
      const rx = new RegExp(`(^[0-9.,]+)\\s?${unit}(.+)`);
      const match = ingredient.match(rx);
      if (match) {
         const newUnit = parseFloat(match[1].replace(',', '.')) * multiplier[i];
         ingredient = `${newUnit}ml ${match[2].trim()}`;
         break;
      }
   }

   return ingredient;
}

function processRecipe(recipe) {
   let [name, ingredients, description] = splitContent(recipe);
   ingredients = ingredients.map(convertAmount);
   const object = { name, ingredients, description };
   return object;
}

export default processRecipe;
export { convertAmount };
