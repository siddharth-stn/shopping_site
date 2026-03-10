import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router";
import { useContext } from "react";
import { CreatedCartContext } from "../utilities/CartContext";

export default function Header() {
  const { cartData } = useContext(CreatedCartContext)
  return (
    <header className="bg-gray-900 sticky top-0 z-3">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm/6 font-semibold text-white">
            Home
          </Link>

          <Link
            to="/product-list"
            className="text-sm/6 font-semibold text-white"
          >
            Product List
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-white">
            Marketplace
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-white">
            Company
          </Link>
        </PopoverGroup>
        <section className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          <Link to="/view-cart" className="text-white mr-5">
            <button className="border border-amber-100 px-4 py-2 rounded-xl hover:bg-white hover:text-black cursor-pointer">View Cart ({cartData.length})</button>
          </Link>
          <a href="#" className="text-sm/6 font-semibold text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </section>
      </nav>
    </header>
  );
}
