import { useContext } from "react";

import { CartContext } from "../../App.js";

import styles from "./Modal.module.css";

const Popup = (props) => {
  const cartContext = useContext(CartContext);
  console.log(cartContext);
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {cartContext.items.map((item) => (
          <div key={item.id} className={styles.detail}>
            <div>
              <p className={styles.name}>{item.name}</p>
              <div className={styles.priceandamount}>
                <p>${item.price}</p>
                <button>x {item.amount}</button>
              </div>
            </div>
            <div className={styles.upanddown}>
              <button
                className={styles.btnup}
                onClick={() => cartContext.down(item)}
              >
                -
              </button>
              <button onClick={() => cartContext.up(item)}>+</button>
            </div>
          </div>
        ))}
        <div className={styles.totalamountdiv}>
          <p>Total Amount</p>
          <p>${cartContext.totalAmount}</p>
        </div>
        <div className={styles.closeandorder}>
          <button
            className={styles.closebtn}
            onClick={() => props.hideModalFn()}
          >
            Close
          </button>
          <button className={styles.orderbtn}>Order</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

// const Modal = () => {
//   return ReactDOM.createPortal(<Popup />, document.getElementById("popup"));
// };

// export default Modal;
