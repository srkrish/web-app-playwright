import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";
import { ShoppingCart } from "../utils/shopping-cart";
import { ROUTES } from "../utils/Constants";
import {
  isProblemUser,
  isVisualUser,
  removeCredentials,
} from "../utils/Credentials";
import menuClosePng from "../assets/img/close.png";
import menuCloseSvg from "../assets/svg/close@3x.svg";
import menuIconPng from "../assets/img/menu.png";
import menuIconSvg from "../assets/svg/menu3x.svg";
import "./DrawerMenu.css";

const DrawerMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const resetStorage = () => {
    // Wipe out our shopping cart now
    ShoppingCart.resetCart();
  };

  const aboutLink = isProblemUser()
    ? "https://saucelabs.com/error/404"
    : "https://saucelabs.com/";
  const isVisualFailure = isVisualUser();
  const imageClass = isVisualFailure ? "visual_failure" : "";

  return (
    <Menu
      customBurgerIcon={
        <img
          src={menuIconPng}
          className={imageClass}
          srcSet={menuIconSvg}
          alt="Open Menu"
          data-test="open-menu"
        />
      }
      customCrossIcon={
        <img
          src={menuClosePng}
          className={imageClass}
          srcSet={menuCloseSvg}
          alt="Close Menu"
          data-test="close-menu"
        />
      }
      outerContainerId={"page_wrapper"}
      pageWrapId={"contents_wrapper"}
      noOverlay
    >
      <a
        id="inventory_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          handleNavigation(ROUTES.INVENTORY);
        }}
        data-test="inventory-sidebar-link"
      >
        All Items
      </a>
      <a
        id="about_sidebar_link"
        className="menu-item"
        href={aboutLink}
        data-test="about-sidebar-link"
      >
        About
      </a>
      <a
        id="logout_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          removeCredentials();
          handleNavigation(ROUTES.LOGIN);
        }}
        data-test="logout-sidebar-link"
      >
        Logout
      </a>
      <a
        id="reset_sidebar_link"
        className="menu-item"
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          resetStorage();
        }}
        data-test="reset-sidebar-link"
      >
        Reset App State
      </a>
    </Menu>
  );
};

export default DrawerMenu;
