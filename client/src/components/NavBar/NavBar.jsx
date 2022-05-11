import React from "react"
import styles from "./NavBar.module.css"


export const NavBar = () => {
    return (
        <div className={styles.container}>
            <div>
                <span>Logo</span>
            </div>

            <div>
                <label>Buscar:</label>
                <input type="text" />
            </div>

            <div className={styles.div3}>
                <span>Home</span>
                <span>Products</span>
                <span>About</span>
                <span>Login</span>
                <span>Cart</span>
            </div>

            <div>
            </div>
        </div>
    )
}
