// Needed to add the below due to issues in IE11, see this thread
// https://github.com/facebook/create-react-app/issues/9906#issuecomment-720905753
/** @jsxRuntime classic */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import { BacktraceClient, ErrorBoundary } from "@backtrace-labs/react";
import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import "./index.css";
import Cart from "./pages/Cart";
import CheckOutStepOne from "./pages/CheckOutStepOne";
import CheckOutStepTwo from "./pages/CheckOutStepTwo";
import Finish from "./pages/Finish";
import Inventory from "./pages/Inventory";
import InventoryItem from "./pages/InventoryItem";
import Login from "./pages/Login";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ROUTES } from "./utils/Constants";
import { currentUser } from "./utils/Credentials";
import { ShoppingCart } from "./utils/shopping-cart";
import { InventoryData } from "./utils/InventoryData.js";
import { InventoryDataLong } from "./utils/InventoryDataLong.js";

BacktraceClient.initialize({
  name: "Swag Store",
  version: "3.0.0",
  url: "https://submit.backtrace.io/UNIVERSE/TOKEN/json",
  userAttributes: () => ({
    user: currentUser(),
    shoppingCart: ShoppingCart.getCartContents(),
  }),
});

const routing = (
  <ErrorBoundary>
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route 
            path={ROUTES.INVENTORY} 
            element={<Inventory data={InventoryData} />} 
          />
          <Route 
            path={ROUTES.INVENTORY_LONG} 
            element={<Inventory data={InventoryDataLong} />} 
          />
          <Route 
            path={ROUTES.INVENTORY_LIST} 
            element={<InventoryItem />} 
          />
          <Route 
            path={ROUTES.CART} 
            element={<Cart />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_STEP_ONE} 
            element={<CheckOutStepOne />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_STEP_TWO} 
            element={<CheckOutStepTwo />} 
          />
          <Route 
            path={ROUTES.CHECKOUT_COMPLETE} 
            element={<Finish />} 
          />
        </Route>
      </Routes>
    </Router>
  </ErrorBoundary>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();