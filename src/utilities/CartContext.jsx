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
          let quantity;
          if (item.quantity === 5) {
            toast.error("Maximum quantity can not be more than 5!")
            return item;
          } else {
            quantity = item.quantity + 1;
            toast.success("Item quantity increased!");
          }
          return { ...item, quantity }
        } else {
          return item
        }
      });

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

  function updateQuantity(itemToUpdate, type) {
    if (type === "minus") {
      if (itemToUpdate.quantity > 1) {
        const updatedCart = cartData.map((i) => {
          if (itemToUpdate.id === i.id) {
            return { ...itemToUpdate, quantity: itemToUpdate.quantity - 1 };
          } else {
            return i;
          }
        });
        setCartData(updatedCart);
        localStorage.setItem('cart_data', JSON.stringify(updatedCart));
      } else {
        toast.error("Minimum 1 quantity required!")
      }
    } else {
      if (itemToUpdate.quantity < 5) {
        const updatedCart = cartData.map((i) => {
          if (itemToUpdate.id === i.id) {
            return { ...itemToUpdate, quantity: itemToUpdate.quantity + 1 };
          } else {
            return i;
          }
        });
        setCartData(updatedCart);
        localStorage.setItem('cart_data', JSON.stringify(updatedCart));
      } else {
        toast.error("Maximum 5 quantity can be added!")
      }
    }
  }

  function removeFromCart(itemId) {
    const updatedCart = cartData.filter((v) => v.id !== itemId);
    toast.success("Item removed Successully!");
    setCartData(updatedCart);
    localStorage.setItem('cart_data', JSON.stringify(updatedCart));
  }

  const data = { cartData, setCartData, addToCart, updateQuantity, removeFromCart }

  return (
    <CreatedCartContext.Provider value={data}>
      {children}
    </CreatedCartContext.Provider>
  )
}

export default CartContext;

export { CreatedCartContext }