import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

const Homepage = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: { limit: 12 },
      })
      .then((response) => {
        setProductsData(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsData.map((v, i) => {
              return (
                <ProductCard
                  id={v.id}
                  key={i}
                  image={v.image}
                  name={v.name}
                  price={v.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
