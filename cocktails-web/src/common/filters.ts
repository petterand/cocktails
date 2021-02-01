function removeMeasurements(str: String) {
   if (!str.includes('ml')) {
      return str;
   }
   return str.split('ml')[1].trim();
}

export const arrayIntersection = (arr1: Array<String>, arr2: Array<String>) =>
   arr1.filter((val) => arr2.includes(val));

export const arrayIntersects = (arr1: Array<String>, arr2: Array<String>) =>
   arrayIntersection(arr1, arr2).length > 0;

export function buildFilterObject(recipes: Array<Recipe>) {
   const names = [];
   let ingredients: Array<String> = [];
   for (let recipe of recipes) {
      names.push(recipe.name);
      ingredients = [
         ...ingredients,
         ...recipe.ingredients.map(removeMeasurements).map(toLowerCase),
      ];
   }
   return { names, ingredients };
}

export const filterRecipes = (values: Array<string>) => (recipe: Recipe) => {
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

export function getTop5Ingredients(ingredients: Array<string>) {
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
      .sort((a, b) => <number>b[1] - <number>a[1])
      .map((entry) => entry[0])
      .slice(0, 5);

   return sortedIngredients;
}

export function getSearchResultList(
   filterValues: FilterValues,
   searchString: String
) {
   const combined = [...filterValues.names, ...filterValues.ingredients];

   const filtered = combined.filter((ing) =>
      ing.toLowerCase().includes(searchString.toLowerCase())
   );

   return [...new Set(filtered)];
}

const toLowerCase = (s: String) => s.toLowerCase();
