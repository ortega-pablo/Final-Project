import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOneUsers, getUserIdByToken } from "../../redux/actions";
import { OrdersOneUser } from "../Orders/OrdersOneUser";
import { CambiarClave } from "./CambiarClave";
import { EditarPerfilGoogle } from "./EdiarPerfilGoogle";
import { EditarPerfil } from "./EditarPerfil";
import { MisPreguntas } from "./MisPreguntas";
import { UltimasCompras } from "./UltimasCompras";

export const Perfil = () => {
  const dispatch = useDispatch();
  const idToken = JSON.parse(window.localStorage.getItem("token"))?.token;
  const [render, setRender] = useState(0);
  useEffect(() => {
    dispatch(getUserIdByToken(idToken))
      .then((r) => r)
      .then((r) => dispatch(getDetailOneUsers(r)));
    }, [render]);
    
  const user = useSelector((state) => state.getDetailOneUser);

  //bt para ver su perfil y modificarlo
  //bt con sus preguntas y rtas
  //

  return (
    <>
      <h1>MI CUENTA</h1>
    <h3>{user?.userName}</h3>
      <h2>MIS DATOS:</h2>
      <h3>Editar perfil:</h3>

      {user.loginWithGoogle ? (
        <EditarPerfilGoogle
          setRender={setRender}
          render={render}
          user={user}
          idToken={idToken}
        />
      ) : (
        <EditarPerfil
          setRender={setRender}
          render={render}
          user={user}
          idToken={idToken}
        />
      )}

      <h3>editar contraseña</h3>
      {!user.loginWithGoogle ? (
        <CambiarClave
          setRender={setRender}
          render={render}
          user={user}
          idToken={idToken}
        />
      ) : (
        <h3>
          Las cuentas logeadas con Google no pueden cambiar de contraseña.
        </h3>
      )}

      <h2>MIS DOMICILIOS</h2>

      <h4>Mis preguntas</h4>
      <MisPreguntas asks={user?.asks} userid={user?.id} />
      <h4>Mis ultimas compras</h4>
      <OrdersOneUser userId={user?.id} />
      <UltimasCompras />
    </>
  );
};
