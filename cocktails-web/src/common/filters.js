function removeMeasurements(str) {
   if (!str.includes('ml')) {
      return str;
   }
   return str.split('ml')[1].trim();
}

export const arrayIntersection = (arr1, arr2) =>
   arr1.filter((val) => arr2.includes(val));

export const arrayIntersects = (arr1, arr2) =>
   arrayIntersection(arr1, arr2).length > 0;

export function buildFilterObject(recipes) {
   const filterObject = { names: [], ingredients: [] };
   for (let recipe of recipes) {
      filterObject.names.push(recipe.name);
      filterObject.ingredients = [
         ...filterObject.ingredients,
         ...recipe.ingredients.map(removeMeasurements),
      ];
   }
   return filterObject;
}

export const filterRecipes = (values) => (recipe) => {
   if (values.length === 0) {
      return true;
   }
   const nameMatches =
      values
         .map((v) => recipe.name.toLowerCase() === v.toLowerCase())
         .filter(Boolean).length > 0;
   if (nameMatches) {
      return true;
   }

   const ingredients = recipe.ingredients
      .map(removeMeasurements)
      .map(toLowerCase);
   const ingredientMatches = values
      .map((v) => ingredients.includes(v))
      .every(Boolean);

   return ingredientMatches;
};

export function getTop5Ingredients(ingredients) {
   if (!ingredients) {
      return [];
   }
   const occurencesObj = ingredients.reduce((acc, i) => {
      if (acc[i]) {
         acc[i]++;
         return acc;
      }
      return { ...acc, [i]: 1 };
   }, {});

   const sortedIngredients = Object.entries(occurencesObj)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 5);

   return sortedIngredients;
}

export function getSearchResultList(filterValues, searchString) {
   const combined = [...filterValues.names, ...filterValues.ingredients];

   const filtered = combined.filter((ing) =>
      ing.toLowerCase().includes(searchString.toLowerCase())
   );

   return [...new Set(filtered)];
}

const toLowerCase = (s) => s.toLowerCase();
