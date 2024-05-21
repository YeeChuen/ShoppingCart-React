// inventory API reference from evaluation

const itemURL = "http://localhost:8000/inventory";

export const getInventory = () => {
  return fetch(itemURL).then((response) => response.json());
};
