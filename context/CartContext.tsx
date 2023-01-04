import { createContext, PropsWithChildren, useState } from "react";

class CartProduct {
  id: string;
  price: string;
  title: string;
  constructor({ id, price, title }: ProductVitalData) {
    this.id = id;
    this.price = price;
    this.title = title;
  }
}

type ProductVitalData = {
  id: string;
  price: string;
  title: string;
};

type CartContextProps = {
  products: ProductVitalData[] | null;
  addProductToCart: (productVitalData: ProductVitalData) => void;
  removeProductFromCart: (produtcID: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext({} as CartContextProps);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<CartProduct[] | null>(null);

  function addProductToCart(productVitalData: ProductVitalData) {
    setProducts((prevState) => {
      return prevState === null
        ? [productVitalData]
        : [
            ...prevState,
            new CartProduct(productVitalData),
          ];
    });
  }

  function removeProductFromCart(produtcID: string) {
    setProducts((prevState: any) => {
      if (prevState.length === 1) {
        return null
      }
      
      const newArr = prevState?.filter((product:any) => {
        return product.id === produtcID ? false : true
      })

      return newArr
    })
  }

  function clearCart() {
    setProducts(null);
  }

  return (
    <CartContext.Provider
      value={{ products, addProductToCart, removeProductFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
