import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventary } from "../../../redux/actions";

export const AdmininAllStock = () => {
  const dispatch = useDispatch();
  const allStock = useSelector((state) => state.inventory);
  useEffect(() => {
    dispatch(getInventary());
  });

  return (
    <>
      <div>AdmininAllStock</div>
      {allStock.map((s) => s.name)}
    </>
  );
    };
