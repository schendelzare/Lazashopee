"use client";

import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import { FaCartArrowDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { CartContext } from "@context/context";

const Navbar = React.memo(() => {
  const { data: session } = useSession();
  const [providers, setProvider] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [cartIsOn, setCartIsOn] = useState(false);

  const ctxData = useContext(CartContext);
  const { items } = ctxData;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const router = useRouter();

  function dropdownHandler() {
    setToggleDropdown((prev) => !prev);
  }

  useEffect(() => {
    const setUpProvider = async () => {
      const res = await getProviders();

      setProvider(res);
    };

    setUpProvider();
  }, []);

  function cartHandler() {
    router.push(`/cart?id=${session?.user.id}`);
  }

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setCartIsOn(true);

    const timer = setTimeout(() => {
      setCartIsOn(false);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <nav className=" flex justify-end font-semibold py-3  items-center mx-5 tracking-tighter gap-2 ">
      <Link href="/" className="mr-auto">
        <h1 className="font-semibold text-3xl p-1.5 rounded-md">
          <span className="text-my-green ">Laza</span>
          <span className="text-primary-orange  ">shopee</span>
        </h1>
      </Link>
      <div>
        {session?.user ? (
          <div className="flex w-16 justify-between border-2 p-1 rounded-lg">
            <FaCartArrowDown
              size={25}
              className={`nav_cart ${cartIsOn ? "scale-125 ease-in-out" : ""}`}
              onClick={cartHandler}
            />
            <div className="px-2">{numberOfCartItems}</div>
          </div>
        ) : null}
      </div>

      {/* Mobile nav */}

      <ul className=" p-2">
        <li>
          {session?.user ? (
            <div className="flex flex-col  text-left items-end">
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                className="nav_image rounded-full "
                alt="profile"
                onClick={dropdownHandler}
              />

              <div
                className={toggleDropdown ? "drop_down" : "drop_down_toggle"}
              >
                <Link
                  href={`/cart/myorders?userId=${session?.user.id}`}
                  className="nav_button"
                >
                  My orders
                </Link>
                <Link href="/profile" className="nav_button">
                  Profile
                </Link>
                <Link href="/products/addItem" className="nav_button">
                  Sell Item
                </Link>

                <button
                  type="button"
                  onClick={signOut}
                  className="nav_button text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider, i) => (
                  <div
                    className="sign_in"
                    key={i}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                  >
                    <span className="text-white ">Sign-in with</span>
                    <button type="button" key={provider.name}>
                      <FcGoogle size={25} />
                    </button>
                  </div>
                ))}
            </>
          )}
        </li>
      </ul>
    </nav>
  );
});

export default Navbar;
