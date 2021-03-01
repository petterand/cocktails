export default function navigate(hash) {
   history.replaceState(null, null, `#${hash}`);
   window.dispatchEvent(new HashChangeEvent('hashchange'));
}
