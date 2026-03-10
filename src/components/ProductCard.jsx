import { useContext } from "react";
import { Link } from "react-router";
import { CreatedCartContext } from "../utilities/CartContext";
export default function ProductCard({ id, price, name, image }) {
  const data = { id, price, name, image }

  const { addToCart } = useContext(CreatedCartContext)

  return (
    <div className="flex flex-col h-full rounded-4xl bg-[#e0e0e0] shadow-[inset_10px_10px_20px_#bebebe,inset_-10px_-10px_20px_#ffffff] p-6">

      {/* Product Image & Info (Navigates to Details) */}
      <Link to={`/product-details/${id}`} className="group flex flex-col flex-1 focus:outline-none">
        {/* Image Container: Extruded shadow to pop out of the "inset" card tray */}
        <div className="overflow-hidden rounded-2xl bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]">
          <img
            src={image}
            alt={name}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
          />
        </div>

        {/* Typography: Better spacing and text hierarchy */}
        <div className="mt-6 flex flex-col flex-1">
          <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase line-clamp-1">
            {name}
          </h3>
          <p className="mt-1 text-2xl font-bold text-gray-800">
            ₹{price}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button (Standalone Action) */}
      <div className="mt-6">
        <button
          onClick={() => { addToCart(data) }}
          className="w-full bg-[#e0e0e0] rounded-full text-gray-600 font-bold tracking-wide text-base px-8 py-4 transition-all duration-300 ease-in-out border border-white/40 shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] hover:text-gray-900 active:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] focus:outline-none"
        >
          Add To Cart
        </button>
      </div>

    </div>
  );
}
