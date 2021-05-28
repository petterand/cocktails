const { getImageName } = require('./getImageName');

describe('getImageName', () => {
   it('it replaces characters', () => {
      const name =
         'Varldens basta G&T infuserad med en Espresso Martini serverad som en Tom Collins';

      const result = getImageName(name);

      expect(result.webp).toEqual(
         'varldensbastagtinfuseradmedenespressomartiniserveradsomentomcollins.webp'
      );
   });
});
