import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../App.js";

import ReactDOM from "react-dom";

import Popup from "../UI/Modal.jsx";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = () => {
  const cartContext = useContext(CartContext);
  //cập nhật tổng số sản phẩm đang trong giỏ hàng
  const [yourCart, setYourCart] = useState(0);
  const updateYourCart = (cartContext) => {
    setYourCart(cartContext.items.length);
    console.log(yourCart);
  };
  useEffect(() => updateYourCart(cartContext), [cartContext]);

  //state ẩn hiện modal
  const [hide, setHide] = useState(true);

  const hideModal = () => {
    return setHide(true);
  };

  return (
    <React.Fragment>
      {!hide &&
        ReactDOM.createPortal(
          <Popup hideModalFn={hideModal} />,
          document.getElementById("popup")
        )}
      <div
        onClick={() => setHide(false)}
        className={`${styles.headercartbutton} ${styles.bump}`}
      >
        <p className={styles.reactmeals}>ReactMeals</p>
        <p className={styles.button}>
          Your Cart <span className={styles.badge}>{yourCart}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default HeaderCartButton;
