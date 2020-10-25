import { getLastWord } from './';

describe('getLastWord', () => {
   it('returns last word', () => {
      const s = 'aaa bbb ccc';

      const result = getLastWord(s);

      expect(result).toEqual('ccc');
   });

   it('handles empty string', () => {
      const s = '';

      const result = getLastWord(s);

      expect(result).toEqual('');
   });
});
