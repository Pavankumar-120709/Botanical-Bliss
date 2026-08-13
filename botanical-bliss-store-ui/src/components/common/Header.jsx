import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faSeedling,
  faSun,
  faMoon,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../../store/cart-slice.js";
import { SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/clerk-react";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const totalQuantity = useSelector(selectTotalQuantity);
  
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "ADMIN" || user?.publicMetadata?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setAdminMenuOpen(false);
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";

  const dropdownLinkClass =
    "block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link to="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faSeedling} className="h-8 w-8" />
          <span className="font-bold">Botanical Bliss</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
          <ul className="flex space-x-6 items-center">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className={navLinkClass}>Login</button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={toggleAdminMenu}
                        className="flex items-center space-x-1 text-primary dark:text-light font-semibold"
                      >
                        <span>Admin</span>
                        <FontAwesomeIcon icon={faAngleDown} />
                      </button>
                      {isAdminMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20">
                          <ul className="py-2">
                            <li>
                              <Link to="/admin/orders" className={dropdownLinkClass}>Orders</Link>
                            </li>
                            <li>
                              <Link to="/admin/messages" className={dropdownLinkClass}>Messages</Link>
                            </li>
                            <li>
                              <Link to="/admin/products" className={dropdownLinkClass}>Products</Link>
                            </li>
                            <li>
                              <Link to="/admin/discount" className={dropdownLinkClass}>Discount</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  <Link to="/orders" className={navLinkClass}>Orders</Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </li>
            <li>
              <Link to="/cart" className=" relative text-primary py-2">
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="text-primary dark:text-light w-6"
                />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
