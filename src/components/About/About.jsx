import React from "react";
import style from "./About.module.css";
import img from "../../imagenes/Aboutme.gif"

export default function About() {
    return (
        <div className={style.contenedor}>

            <div className={style.leftSection}>
                <h1 className={style.h1}>About me</h1>

                <p className={style.p}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
                    animi ullam voluptas fugiat sint voluptatum neque nam cupiditate,
                    voluptate voluptates id pariatur excepturi fuga reiciendis recusandae
                    quidem dicta delectus totam.<br/><br/>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
                    animi ullam voluptas fugiat sint voluptatum neque nam cupiditate,
                    voluptate voluptates id pariatur excepturi fuga reiciendis recusandae
                    quidem dicta delectus totam.<br/><br/>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos
                    animi ullam voluptas fugiat sint voluptatum neque nam cupiditate,
                    voluptate voluptates id pariatur excepturi fuga reiciendis recusandae
                    quidem dicta delectus totam.
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
