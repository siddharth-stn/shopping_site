import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic-light-dark.css";

const sortOptions = [
  { name: "Name (A-Z)", sorting: 1, current: true },
  { name: "Name (Z-A)", sorting: 2, current: false },
  { name: "Price: Low to High", sorting: 3, current: false },
  { name: "Price: High to Low", sorting: 4, current: false },
  { name: "Rating: Low to High", sorting: 7, current: false },
  { name: "Rating: High to Low", sorting: 8, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [productsData, setProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sorting, setSorting] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filterCategories, setFilterCategories] = useState([]);
  const [brands, setBrands] = useState([])
  const [filterBrands, setFilterBrands] = useState([])
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);


  useEffect(() => {
    axios.get("https://wscubetech.co/ecommerce-api/brands.php")
      .then((response) => {
        setBrands(response.data.data);
      })
      .catch((err) => console.error(err))
  }, []);


  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/categories.php")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://wscubetech.co/ecommerce-api/products.php", {
        params: {
          limit: 12,
          page: currentPage,
          sorting: sorting,
          categories: filterCategories.toString(),
          brands: filterBrands.toString(),
          price_from: priceFrom,
          price_to: priceTo,
        },
      })
      .then((response) => {
        setTotalPages(response.data.total_pages);
        setProductsData(response.data.data);
      })
      .catch((err) => console.error(err));
  }, [sorting, currentPage, filterCategories, filterBrands, priceFrom, priceTo]);

  const handlePriceFilter = (from, to) => {
    setCurrentPage(1);
    setPriceFrom(from);
    setPriceTo(to);
  }


  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <div
                          onClick={() => {
                            sortOptions.map((v) => {
                              v.current = false;
                            });
                            option.current = true;
                            setSorting(option.sorting);
                          }}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden",
                          )}
                        >
                          {option.name}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <Disclosure as="div" className="border-b border-gray-200 py-6 max-h-75 overflow-x-auto">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Categories
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {categories.map((option, optionIdx) => (
                        <div key={option.id} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                onClick={() =>
                                  setFilterCategories((prev) => {
                                    setCurrentPage(1);
                                    if (!prev.includes(option.slug)) {
                                      return [...prev, option.slug];
                                    } else {
                                      return prev.filter(
                                        (slug) => slug !== option.slug,
                                      );
                                    }
                                  })
                                }
                                defaultChecked={option.checked}
                                id={`filter-${option.id}-${optionIdx}`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-${option.id}-${optionIdx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6 max-h-75 overflow-x-auto">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Brands
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {brands.map((option, optionIdx) => (
                        <div key={option.id} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                onClick={() =>
                                  setFilterBrands((prev) => {
                                    setCurrentPage(1);
                                    if (!prev.includes(option.slug)) {
                                      return [...prev, option.slug];
                                    } else {
                                      return prev.filter(
                                        (slug) => slug !== option.slug,
                                      );
                                    }
                                  })
                                }
                                defaultChecked={option.checked}
                                id={`filter-${option.id}-${optionIdx}`}
                                type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-${option.id}-${optionIdx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6 max-h-75 overflow-x-auto">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Filter By Price
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input id="price-1" name="price" type="radio" onClick={() => {
                          handlePriceFilter(0, 1000);
                        }} />
                        <label htmlFor="price-1"> 0 to 1000</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input id="price-2" name="price" type="radio" onClick={() => {
                          handlePriceFilter(1001, 2500);
                        }} />
                        <label htmlFor="price-2"> 1001 to 2500</label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input id="price-3" name="price" type="radio" onClick={() => {
                          handlePriceFilter(2501, 5000);
                        }} />
                        <label htmlFor="price-3"> 2501 to 5000</label>
                      </div>

                      <div className="flex items-center space-x-3">
                        <input id="price-4" name="price" type="radio" onClick={() => {
                          handlePriceFilter(5001, 10000);
                        }} />
                        <label htmlFor="price-4"> 5001 to 10000</label>
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 ">
                <div className="mb-15 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
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
                <ResponsivePagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
