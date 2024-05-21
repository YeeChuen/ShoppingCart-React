// cart API reference from evaluation

const cartURL = "http://localhost:8000/cart";

export const getCart = () => {
  return fetch(cartURL).then((response) => response.json());
};

export const addToCart = (inventoryItem) => {
  return fetch(cartURL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventoryItem),
  }).then((response) => response.json());
};

export const updateCart = (id, newAmount) => {
  return fetch(`${cartURL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAmount),
  }).then((response) => response.json());
};

export const deleteFromCart = (id) => {
  return fetch(`${cartURL}/${id}`, {
    method: "DELETE", // <-- for DELETE, give the full http url that ends with id
  }).then((response) => response.json()); // <-- resolve by returning data.json()
};

export const checkout = () => {
  return getCart().then((data) =>
    Promise.all(data.map((item) => deleteFromCart(item.id)))
  );
};
