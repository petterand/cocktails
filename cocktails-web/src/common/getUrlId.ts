function getUrlId(cocktail: Recipe) {
   const { name, id } = cocktail;

   const replaceMap = {
      å: 'a',
      ä: 'a',
      ö: 'o',
      é: 'e',
      è: 'e',
      ü: 'u',
   };

   const newId = id.substr(0, 5);
   const newName = name
      .toLowerCase()
      .replace(/[\s\\.]/g, '-')
      .replace(/[åäöèéû]/g, (a) => replaceMap[a]);

   return `${newName}-${newId}`;
}

export default getUrlId;
