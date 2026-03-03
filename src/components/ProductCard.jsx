import { Link } from "react-router";
export default function ProductCard({ id, price, name, image }) {
  return (
    <>
      <Link to={`/product-details/${id}`} className="group">
        <img
          src={image}
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
        />
        <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          ₹{price}
        </p>
      </Link>
    </>
  );
}
