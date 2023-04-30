import { useContext, useRef } from "react";
import { CartContext } from "../../../App.js";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const cartContext = useContext(CartContext);

  const amountInput = useRef();
  const itemWithChangedAmount = props.item;
  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" ref={amountInput} />
      </div>
      <button
        onClick={() =>
          cartContext.addItem({
            id: itemWithChangedAmount.id,
            name: itemWithChangedAmount.name,
            description: itemWithChangedAmount.description,
            price: itemWithChangedAmount.price,
            amount: Math.floor(Math.abs(Number(amountInput.current.value))),
          })
        }
      >
        +Add
      </button>
    </div>
  );
};

export default MealItemForm;
