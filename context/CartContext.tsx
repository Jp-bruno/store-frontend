import { createContext, PropsWithChildren, useState } from "react";

class CartProduct {
  id: number;
  price: number;
  title: string;
  quantity: number;
  constructor({ id, price = 0, title, quantity = 1 }: ProductVitalData) {
    this.id = id;
    this.price = price;
    this.title = title;
    this.quantity = quantity;
  }

  get priceTimesQuantity() {
    return this.price * this.quantity;
  }
}

type ProductVitalData = {
  id: number;
  price: number;
  title: string;
  quantity: number;
};

type CartContextProps = {
  products: CartProduct[] | null;
  addProductToCart: (productVitalData: ProductVitalData) => void;
  removeProductFromCart: (produtcID: number) => void;
  clearCart: () => void;
  setQuantity: (id: number, newValue: number) => void;
};

export const CartContext = createContext({} as CartContextProps);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [products, setProducts] = useState<CartProduct[] | null>(null);

  function addProductToCart(productVitalData: ProductVitalData) {
    function findItemById(item: ProductVitalData) {
      return item.id === productVitalData.id;
    }

    setProducts((prevState) => {
      let productAlreadyInCart = prevState?.some(findItemById);

      if (productAlreadyInCart) {
        const index = (prevState as ProductVitalData[]).findIndex(findItemById);
        const newProductsArray = [...(products as CartProduct[])];
        newProductsArray[index].quantity++;
        return newProductsArray;
      }

      return prevState === null
        ? [new CartProduct(productVitalData)]
        : [...prevState, new CartProduct(productVitalData)];
    });
  }

  function removeProductFromCart(produtcID: number) {
    setProducts((prevState: any) => {
      if (prevState.length === 1) {
        return null;
      }

      const newArr = prevState?.filter((product: any) => {
        return product.id === produtcID ? false : true;
      });

      return newArr;
    });
  }

  function clearCart() {
    setProducts(null);
  }

  function setQuantity(id: number, newValue: number) {
    setProducts((prevState: any) => {
      let newState = prevState.map((element: CartProduct) => {
        if (element.id === id) {
          element.quantity = newValue;
          return element;
        }
        return element;
      });
      return newState;
    });
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        clearCart,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
