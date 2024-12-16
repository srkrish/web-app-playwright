import React from "react";
import { useNavigate } from "react-router-dom";
import Checkmark from "assets/img/checkmark.png";
import SwagLabsFooter from "components/layout/Footer";
import HeaderContainer from "components/layout/HeaderContainer";
import Button, { BUTTON_SIZES } from "components/common/Button";
import { ROUTES } from "utils/Constants";
import "./Finish.css";

const Finish = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate(ROUTES.INVENTORY);
  };

  return (
    <div id="page_wrapper" className="page_wrapper">
      <div id="contents_wrapper">
        <HeaderContainer secondaryTitle="Checkout: Complete!" />
        <div
          id="checkout_complete_container"
          className="checkout_complete_container"
          data-test="checkout-complete-container"
        >
          <img
            alt="Pony Express"
            className="pony_express"
            src={Checkmark}
            data-test="pony-express"
          />
          <h2 className="complete-header" data-test="complete-header">
            Thank you for your order!
          </h2>
          <div className="complete-text" data-test="complete-text">
            Your order has been dispatched, and will arrive just as fast as the
            pony can get there!
          </div>
          <Button
            label="Back Home"
            onClick={handleFinish}
            size={BUTTON_SIZES.SMALL}
            testId="back-to-products"
          />
        </div>
      </div>
      <SwagLabsFooter />
    </div>
  );
};

export default Finish;
