import { hasUncaughtExceptionCaptureCallback } from 'process';
import getUrlId from './getUrlId';

describe('getUrlId', () => {
   it('returns formatted url id', () => {
      const input = {
         name: 'Cörpse Rävivor 2.0',
         id: 'c32deaf8713ade96',
         ingredients: ['aabb'],
      };

      const result = getUrlId(input);

      expect(result).toEqual('corpse-ravivor-2-0-c32de');
   });
});
