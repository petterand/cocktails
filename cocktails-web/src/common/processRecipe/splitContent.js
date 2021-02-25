function trim(s) {
   return s.trim();
}

function getRowsFromSection(section) {
   if (!section) {
      return [];
   }
   return section.split(/\n/gm).map(trim).filter(Boolean);
}

export default function splitContent(content) {
   const sections = content.split(/^\s*$/gm);

   const name = sections[0].trim();
   const ingredients = getRowsFromSection(sections[1]);
   const instructions = sections[2]?.trim();

   return [name, ingredients, instructions];
}
