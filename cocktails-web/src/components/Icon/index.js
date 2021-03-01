import cocktailIcon from '../../../images/cocktail.svg';
import coupeIcon from '../../../images/coupe.svg';
import highballIcon from '../../../images/highball.svg';
import fluteIcon from '../../../images/flute.svg';
import rocksIcon from '../../../images/rocks.svg';
import shakeIcon from '../../../images/shaker.svg';
import stirIcon from '../../../images/stir.svg';

const icons = {
   cocktail: { alt: 'Cocktailglas', src: cocktailIcon },
   coupe: { alt: 'Coupeglas', src: coupeIcon },
   highball: { alt: 'Highballglas', src: highballIcon },
   flute: { alt: 'Flöjtglas', src: fluteIcon },
   rocks: { alt: 'Rocksglas', src: rocksIcon },
   shake: { alt: 'Skaka', src: shakeIcon },
   stir: { alt: 'Rör över is', src: stirIcon },
};

const Icon = (props) => {
   const icon = icons[props.icon];
   return <img alt={icon.alt} src={icon.src} />;
};

export default Icon;
