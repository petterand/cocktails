export const getImageName = (recipeName) => {
   const base = recipeName
      .replace(/[\s&]/g, '')
      .replace(/[åä]/g, 'a')
      .replace(/ö/g, 'o')
      .substring(0, 10)
      .toLowerCase();
   return {
      jpg: `${base}.jpg`,
      webp: `${base}.webp`,
   };
};
