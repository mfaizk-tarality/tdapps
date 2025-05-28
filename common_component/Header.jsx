"use client";
import { useAppKit } from "@reown/appkit/react";
import { IconBrandSlack } from "@tabler/icons-react";
import Link from "next/link";
import React, { useMemo } from "react";
import { useAccount } from "wagmi";

const navItems = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Faucet",
    href: "/faucet",
  },
  {
    label: "Token Creator",
    href: "/token-creator",
  },
  {
    label: "My Tokens",
    href: "/token-creator/my-tokens",
  },
  {
    label: "MultiSender",
    href: "/multi-sender",
  },
  //   {
  //     label: "Faucet",
  //     href: "#", // Parent links for dropdowns often have a '#' href or are just for navigation
  //     children: [
  //       {
  //         label: "Category 1",
  //         href: "/products/category-1",
  //       },
  //       {
  //         label: "Category 2",
  //         href: "/products/category-2",
  //       },
  //       {
  //         label: "All Products",
  //         href: "/products",
  //       },
  //     ],
  //   },
];

const Header = () => {
  const { open, close } = useAppKit();

  const { isConnected } = useAccount();

  const connectButton = useMemo(() => {
    if (!isConnected) {
      return (
        <button
          className="btn bg-tancolor rounded-sm border-0"
          onClick={() => {
            open({ view: "Connect" });
          }}
        >
          <IconBrandSlack />
          <p>Connect Wallet</p>
        </button>
      );
    }
    return <appkit-button />;
  }, [isConnected]);

  const renderNavItem = (item, isMobileDropdown = false) => {
    if (item.children) {
      // It's a parent with children (dropdown)
      return (
        <li key={item.label}>
          {isMobileDropdown ? (
            // Mobile dropdowns: DaisyUI's mobile dropdown doesn't have a direct "hover" class
            // This will still be click-to-open for mobile, which is often preferred.
            <>
              <Link>{item.label}</Link>
              <ul className="p-2">
                {item.children.map((child) => renderNavItem(child, true))}
              </ul>
            </>
          ) : (
            // Desktop dropdowns: Use <details> with `dropdown` and `dropdown-hover` classes
            // For nested desktop submenus, DaisyUI's <details> + `dropdown-hover` also works
            <details className="dropdown dropdown-hover">
              {/* Add dropdown-hover here */}
              <summary>{item.label}</summary>
              <ul className="p-2 dropdown-content z-[1] bg-background rounded-box w-52 ">
                {/* Ensure dropdown-content has necessary classes */}
                {item.children.map((child) => renderNavItem(child))}
              </ul>
            </details>
          )}
        </li>
      );
    } else {
      // It's a regular link
      return (
        <li key={item.label}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      );
    }
  };

  return (
    <div className="navbar bg-background">
      <div className="navbar-start">
        {/* Mobile Dropdown (typically click-to-open for better UX) */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-background rounded-box z-[1] mt-3 w-52 p-2"
          >
            {navItems.map((item) => renderNavItem(item, true))}
          </ul>
        </div>
        {/* <Link className="btn btn-ghost text-xl"></Link> */}
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-end hidden lg:flex min-w-fit 2xl:gap-10">
        <ul className="menu menu-horizontal px-1 2xl:gap-10">
          {navItems.map((item) => renderNavItem(item))}
        </ul>
        {connectButton}
      </div>
      <div className="navbar-end lg:hidden flex">{connectButton}</div>
    </div>
  );
};

export default Header;
