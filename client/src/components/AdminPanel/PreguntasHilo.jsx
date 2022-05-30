import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAsksOneUserOneProduct, getAsksOneUserOneProduct } from "../../redux/actions";

export const PreguntasHilo = ({ userId, prodId }) => {
  console.log(userId);
  console.log(prodId);
  const dispatch = useDispatch();
  const allAsksOneUser = useSelector((state) => state.getAsksOneUserOnePruduct);
  const [verHilo, setVerHilo] = useState(false);

  console.log(allAsksOneUser);
  useEffect(() => {
    dispatch(getAsksOneUserOneProduct(userId, prodId));

  }, [dispatch]);

  async function handleClick(e) {
    e.preventDefault();
    setVerHilo(!verHilo);
    if(verHilo){
    await  clearAsksOneUserOneProduct()
    } else {
      await  clearAsksOneUserOneProduct()
      await dispatch(getAsksOneUserOneProduct(userId, prodId));
      
}

  }

  return (
    <>
        <Button
          type="submit"
          variant="contained"
          color="ambar3"
          onClick={(e) => handleClick(e)}
        >
          Ver hilo
        </Button>
     

      { verHilo &&
        allAsksOneUser.map((p) => {
          return (
            <>
           
      
              <li>{p.content}</li>
              <h4>{p.answer?.content}</h4>
            </>
          );
        })}

      {verHilo && (
        <Button
          variant="contained"
          color="ambar3"
          onClick={() =>   dispatch(clearAsksOneUserOneProduct())}
        >
          Ocultar hilo
        </Button>
      )}
    </>
  );
};
