import {kebabCase} from 'micro-dash';

const p = document.createElement('p');
p.className = 'result';
p.innerText = kebabCase('kebab case');
document.querySelector('body').appendChild(p);
