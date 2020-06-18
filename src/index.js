import { cube } from './math.js';
import './styles.css'

function component() {
  var element = document.createElement('button');

  element.innerHTML = [
         'Hello webpack',
         '5 cubed is equal to ' + cube(5)
       ].join('\n\n');
    

  return element;
}

document.body.appendChild(component());