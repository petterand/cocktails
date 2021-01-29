import processRecipe, { convertAmount } from './processRecipe';

describe('processRecipe', () => {
   it('returns formatted object', () => {
      const content = `namn

      rad1
      rad2
      rad3
      
      instruktioner`;
      const result = processRecipe(content);

      expect(result).toEqual({
         name: 'namn',
         ingredients: ['rad1', 'rad2', 'rad3'],
         description: 'instruktioner',
      });
   });
});

describe('convertAmounts', () => {
   it.only('converts cl to ml', () => {
      const ingredients = [
         '3cl vodka',
         '3 cl kaffelikör',
         '2,5cl söt vermouth',
      ];

      const result = ingredients.map(convertAmount);

      expect(result).toEqual([
         '30ml vodka',
         '30ml kaffelikör',
         '25ml söt vermouth',
      ]);
   });

   it('converts oz to ml', () => {
      const ingredients = ['1oz vodka', '1oz kaffelikör', '0.5oz espresso'];

      const result = ingredients.map(convertAmount);

      expect(result).toEqual([
         '30ml vodka',
         '30ml kaffelikör',
         '15ml espresso',
      ]);
   });

   it('doesnt convert ml', () => {
      const ingredients = ['30ml vodka', '30ml kaffelikör', '30ml espresso'];

      const result = ingredients.map(convertAmount);

      expect(result).toEqual([
         '30ml vodka',
         '30ml kaffelikör',
         '30ml espresso',
      ]);
   });
});
