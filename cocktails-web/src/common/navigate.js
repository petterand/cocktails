export default function navigate(hash, data) {
   history.pushState(data, null, hash);
   window.dispatchEvent(new Event('recipechanged'));
}
