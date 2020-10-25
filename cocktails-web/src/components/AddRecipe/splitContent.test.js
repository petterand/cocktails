import splitContent from './splitContent';

describe('splitContent', () => {
   it('splits recipe into name, ingredients and instructions', () => {
      const content = `namn

      rad1
      rad2
      rad3
      
      instruktioner`;

      const result = splitContent(content);

      expect(result).toEqual([
         'namn',
         ['rad1', 'rad2', 'rad3'],
         'instruktioner',
      ]);
   });

   it('splits recipe into name ingredients and trims extra rows', () => {
      const content = `Namn
      
      rad1
      rad2
      rad3

   

      `;

      const result = splitContent(content);

      expect(result).toEqual(['Namn', ['rad1', 'rad2', 'rad3'], '']);
   });
});
