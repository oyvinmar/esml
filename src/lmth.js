export default function lmth(type, props, ...children) {
  const flattened = children.reduce((a, b) => a.concat(b), []);
  return { type, props: props || {}, children: flattened };
}

function setBooleanProp(target, name, value) {
  if (value) {
    target.setAttribute(name, value);
    target[name] = true;
  } else {
    target[name] = false;
  }
}

function isEventProp(name) {
  return /^on/.test(name);
}

function extractEventName(name) {
  return name.slice(2).toLowerCase();
}

function isCustomProp(name) {
  return isEventProp(name);
}

function addEventListeners(target, props) {
  Object.keys(props).forEach(name => {
    if (isEventProp(name)) {
      target.addEventListener(extractEventName(name), props[name]);
    }
  });
}

function setProp(target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp(target, name, value);
  } else {
    target.setAttribute(name, value);
  }
}

function setProps(target, props) {
  Object.keys(props).forEach(name => {
    setProp(target, name, props[name]);
  });
}

function createElement(node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return document.createTextNode(node);
  }
  const el = document.createElement(node.type);
  setProps(el, node.props);
  addEventListeners(el, node.props);
  node.children
    .map(createElement)
    .forEach(el.appendChild.bind(el));
  return el;
}

export function render(node, root) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(createElement(node));
}
