export const TagMaker = (type, parent, props = {}) => {
  const element = document.createElement(type);
  Object.assign(element, props);
  parent.appendChild(element);
  return element;
};
