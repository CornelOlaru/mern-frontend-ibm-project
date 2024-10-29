import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);

  // Funcție pentru adăugarea produselor în favorite
  const addToFavorite = (product, quantity) => {
    setFavorite(prevFavorite => {
      const existingProduct = prevFavorite.find(item => item.productId === product._id);
      if (existingProduct) {
        return prevFavorite.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevFavorite, { ...product, quantity }];
      }
    });
  };

  // Funcție pentru a obține numărul total de produse din favorite
  const getTotalFavoriteItems = () => {
    return favorite.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <FavoriteContext.Provider value={{ favorite, addToFavorite, getTotalFavoriteItems, setFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
