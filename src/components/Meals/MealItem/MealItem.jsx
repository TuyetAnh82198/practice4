import styles from "./MealItem.module.css";

import MealItemForm from "./MealItemForm.jsx";

const MealItem = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <div className={styles.mealitem}>
        {props.data.map((item) => (
          <div key={item.id} className={styles.meal}>
            <div>
              <h3>{item.name}</h3>
              <p className={styles.description}>{item.description}</p>
              <p className={styles.price}>${item.price}</p>
            </div>
            <MealItemForm item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealItem;
