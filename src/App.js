import React, { createContext, useReducer } from "react";

import Header from "./components/Layout/Header.jsx";
import MealsSummary from "./components/Meals/MealsSummary.jsx";
import MealItem from "./components/Meals/MealItem/MealItem.jsx";

import "./App.css";

const initialState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  //sao chép thành một giỏ hàng mới
  const updatedItems = { ...state };
  //tìm chỉ mục của món ăn được chọn
  const index = state.items.findIndex((item) => item.id === action.item.id);
  // console.log(index);
  if (action.type === "ADD") {
    // console.log(action.item.mount);
    //Kiểm tra đã có món ăn trong giỏ hàng chưa
    //Nếu món ăn đã có trong giỏ hàng thì cập nhật lại số lượng của món ăn đó và tổng tiền
    if (index >= 0) {
      //thay đổi số lượng dựa theo chỉ mục
      updatedItems.items[index].amount = action.item.amount;
      const updatedTotalAmount = updatedItems.items.reduce(
        (acc, item) => acc + item.price * item.amount,
        0
      );
      return { items: updatedItems.items, totalAmount: updatedTotalAmount };
    } else if (index < 0) {
      //Nếu món ăn chưa có trong giỏ hàng thì thêm vào giỏ hàng và tính lại tổng tiền
      updatedItems.items.push(action.item);
      const updatedTotalAmount =
        updatedItems.totalAmount + action.item.price * action.item.amount;
      return { items: updatedItems.items, totalAmount: updatedTotalAmount };
    }
  }

  if (action.type === "REMOVE") {
    //xóa phần tử ra khỏi giỏ hàng và tính lại tổng tiền
    updatedItems.items.splice(index, 1);
    const updatedTotalAmount =
      updatedItems.totalAmount - action.item.price * action.item.amount;
    return { items: updatedItems.items, totalAmount: updatedTotalAmount };
  }

  if (action.type === "UP") {
    updatedItems.items[index].amount += 1;
    const updatedTotalAmount =
      updatedItems.totalAmount + action.item.price * action.item.amount;
    return { items: updatedItems.items, totalAmount: updatedTotalAmount };
  }

  if (action.type === "DOWN") {
    if (updatedItems.items[index].amount > 0) {
      updatedItems.items[index].amount -= 1;
      const updatedTotalAmount =
        updatedItems.totalAmount - action.item.price * action.item.amount;
      return { items: updatedItems.items, totalAmount: updatedTotalAmount };
    } else if (updatedItems.items[index].amount <= 0) {
      updatedItems.items[index].amount = 0;
      const updatedTotalAmount =
        updatedItems.totalAmount - action.item.price * action.item.amount;
      return {
        items: updatedItems.items,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  return state;
};

export const CartContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cartContext = {
    items: state.items,
    totalAmount: state.totalAmount,
    addItem: (item) => {
      dispatch({ type: "ADD", item: item });
    },
    removeItem: (id) => {
      dispatch({ type: "REMOVE", id: id });
    },
    up: (item) => {
      dispatch({ type: "UP", item: item });
    },
    down: (item) => {
      dispatch({ type: "DOWN", item: item });
    },
  };

  const DUMMY_MEALS = [
    {
      id: "m1",
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
    },
    {
      id: "m2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
    },
    {
      id: "m3",
      name: "Barbecue Burger",
      description: "American, raw, meaty",
      price: 12.99,
    },
    {
      id: "m4",
      name: "Green Bowl",
      description: "Healthy...and green...",
      price: 18.99,
    },
  ];
  return (
    <CartContext.Provider value={cartContext}>
      <Header />
      <MealsSummary />
      <MealItem data={DUMMY_MEALS} />
    </CartContext.Provider>
  );
}

export default App;
