import React from "react";
import style from "./About.module.css";
import img from "../../imagenes/Aboutme.gif"

export default function About() {
    return (
        <div className={style.contenedor}>

            <div className={style.leftSection}>
                <h1 className={style.h1}>About me</h1>

                <p className={style.p}>
                Hello everyone! My name is Bryan, I'm 23 years old,
                I'm an electronic engineer with an emphasis on embedded systems design
                and I consider myself an eternal learner. Lover of creativity, innovative ideas and
                I am always looking for inspiration for new projects and challenges.
                Also, I'll soon be a High Earner, but Not Rich Yet.😉
                </p>
            </div>

            <div className={style.rightSection}>
                <img
                className={style.img}
                src={img}
                alt="Gojo satoru bailando"
                title="Como quisiera bailar 😅"
                />
            </div>

            <div className={style.verticalLine}></div>
        </div>
    );
}
