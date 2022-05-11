import React from "react";
import { Link } from "react-router-dom";
import styles from './Footer.module.css';

export const Footer = () => {
    return(
        <div className={styles.footContainer}> 
            <h6>Empresa copada</h6>
            <p>Copyright © 2022 Empresa copada, Todos los derechos reservados.</p>
            <p> Sobre Nosotros</p>
        </div>
    )
}

