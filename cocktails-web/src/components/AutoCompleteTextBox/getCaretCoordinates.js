const properties = [
   'direction', // RTL support
   'boxSizing',
   'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
   'height',
   'overflowX',
   'overflowY', // copy the scrollbar for IE

   'borderTopWidth',
   'borderRightWidth',
   'borderBottomWidth',
   'borderLeftWidth',
   'borderStyle',

   'paddingTop',
   'paddingRight',
   'paddingBottom',
   'paddingLeft',

   // https://developer.mozilla.org/en-US/docs/Web/CSS/font
   'fontStyle',
   'fontVariant',
   'fontWeight',
   'fontStretch',
   'fontSize',
   'fontSizeAdjust',
   'lineHeight',
   'fontFamily',

   'textAlign',
   'textTransform',
   'textIndent',
   'textDecoration', // might not make a difference, but better be safe

   'letterSpacing',
   'wordSpacing',

   'tabSize',
   'MozTabSize',
];

export default function getCaretCoordinates(el, pos) {
   const div = document.createElement('div');
   div.id = 'mirror-div';
   document.body.appendChild(div);

   const style = div.style;
   const computed = window.getComputedStyle(el);

   style.whiteSpace = 'pre-wrap';
   style.position = 'absolute';
   style.visibility = 'hidden';

   for (let prop of properties) {
      style[prop] = computed[prop];
   }

   style.overflow = 'hidden';
   div.textContent = el.value.substring(0, pos);

   const span = document.createElement('span');
   span.textContent = el.value.substring(pos) || '.';
   div.appendChild(span);

   const coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
      height: parseInt(computed['lineHeight']),
   };

   return coordinates;
}
