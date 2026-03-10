import { createContext, useState } from 'react'
import { toast } from 'react-toastify';

const CreatedCartContext = createContext();

const CartContext = ({ children }) => {

  const [cartData, setCartData] = useState(() => {
    const cartDataInLocalStorage = JSON.parse(localStorage.getItem('cart_data'));
    return (
      cartDataInLocalStorage ?? []
    );
  });

  function addToCart(product) {
    let updatedCart;

    const existingItem = cartData.find((item) => {
      return item.id === product.id
    })

    if (existingItem) {
      updatedCart = cartData.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      });
      toast.success("Item quantity increased!");
    } else {
      let newItem = {
        name: product.name,
        id: product.id,
        image: product.image,
        quantity: 1,
        price: product.price,
      }
      updatedCart = [newItem, ...cartData];
      toast.success("New Item added Successully!")
    }

    setCartData(updatedCart);
    localStorage.setItem('cart_data', JSON.stringify(updatedCart));
  }

  const data = { cartData, setCartData, addToCart }

  return (
    <CreatedCartContext.Provider value={data}>
      {children}
    </CreatedCartContext.Provider>
  )
}

export default CartContext;

export { CreatedCartContext }