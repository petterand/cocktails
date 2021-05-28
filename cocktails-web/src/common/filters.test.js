const {
   buildFilterObject,
   arrayIntersection,
   arrayIntersects,
   filterRecipes,
   getTop5Ingredients,
   getSearchResultList,
} = require('./filters');

const recipes = [
   {
      ingredients: ['30ml vodka', '30ml kaffelikör', '30ml espresso'],
      name: 'Espresso martini',
   },
   {
      ingredients: ['50ml gin', '30ml citronjuice', '20ml Honungslag'],
      name: 'Bees knees',
   },
   {
      ingredients: ['50ml gin', '200ml tonic'],
      name: 'Gin & Tonic',
   },
];

describe('buildFilterObject', () => {
   it('creates object with ingredients and names', () => {
      const result = buildFilterObject(recipes);

      expect(result).toEqual({
         names: ['Espresso martini', 'Bees knees', 'Gin & Tonic'],
         ingredients: [
            'vodka',
            'kaffelikör',
            'espresso',
            'gin',
            'citronjuice',
            'honungslag',
            'gin',
            'tonic',
         ],
      });
   });
});

describe('filterRecipes', () => {
   it('filters recipes by name', () => {
      const result = recipes.filter(filterRecipes(['espresso']));

      expect(result).toEqual([
         {
            ingredients: ['30ml vodka', '30ml kaffelikör', '30ml espresso'],
            name: 'Espresso martini',
         },
      ]);
   });

   it('filters recipes with two matching filters', () => {
      const result = recipes.filter(filterRecipes(['gin', 'citronjuice']));

      expect(result).toEqual([
         {
            ingredients: ['50ml gin', '30ml citronjuice', '20ml Honungslag'],
            name: 'Bees knees',
         },
      ]);
   });
});

describe('arrayIntersection', () => {
   const arr1 = [1, 2, 3];
   const arr2 = [2, 3, 4, 5];

   const result = arrayIntersection(arr1, arr2);

   expect(result).toEqual([2, 3]);
});

describe('arrayIntersects', () => {
   it('returns true when arrays intersect', () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 4, 5];

      const result = arrayIntersects(arr1, arr2);

      expect(result).toEqual(true);
   });
});

describe('getTop5Ingredients', () => {
   it('returns 5 most used ingredients', () => {
      const ingredients = [
         'gin',
         'citronjuice',
         'limejuice',
         'limejuice',
         'gin',
         'sodavatten',
         'gin',
         'citronjuice',
         'gin',
         'citronjuice',
         'rye',
         'rom',
         'tonic',
      ];
      const result = getTop5Ingredients(ingredients);

      expect(result).toEqual([
         'gin',
         'citronjuice',
         'limejuice',
         'sodavatten',
         'rye',
      ]);
   });
});

describe('getSearchResultList', () => {
   it('filter ingredients based on input', () => {
      const filterValues = {
         names: ['Espresso martini', 'Bees knees'],
         ingredients: [
            'vodka',
            'kaffelikör',
            'espresso',
            'gin',
            'citronjuice',
            'Honungslag',
            'Sockerlag',
         ],
      };
      const searchString = 'lag';
      const result = getSearchResultList(filterValues, searchString);

      expect(result).toEqual(['Honungslag', 'Sockerlag']);
   });

   it('filter ingredients and names based on input', () => {
      const filterValues = {
         names: ['Espresso martini', 'Bees knees'],
         ingredients: [
            'vodka',
            'kaffelikör',
            'espresso',
            'gin',
            'citronjuice',
            'Honungslag',
            'Sockerlag',
         ],
      };
      const searchString = 'espresso';
      const result = getSearchResultList(filterValues, searchString);

      expect(result).toEqual(['Espresso martini', 'espresso']);
   });
});
