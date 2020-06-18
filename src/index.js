import { cube } from "./math.js";
import "./styles.css";
// import Print from './print';

async function getComponent() {
  const element = document.createElement("div");
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ "lodash"
  );

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  // element.onclick = Print.bind(null, 'Hello webpack!');

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
