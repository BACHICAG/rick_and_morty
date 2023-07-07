import React, { useState, useEffect } from "react";
import validateForm from "./Validation.jsx";
import style from "./Form.module.css";
import video from "../../imagenes/rick-and-morty-stars-space.mp4";

export default function Form(props) {

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  
  function handleChange(event) {
    const {name, value} = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.login(userData);
    const formErrors = validateForm(userData);
    setErrors(formErrors);
  }


  // Verificar si el formulario es válido y habilitar el botón de envío
  useEffect(() => {
    const formErrors = validateForm(userData);
    setErrors(formErrors);
    setIsSubmitEnabled(Object.keys(formErrors).length === 0);
  }, [userData]);

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      
      <div className={style.videoContainer}>
        <video src={video} type="video/mp4" className={style.video} autoPlay loop muted/>
      </div>

      <div className={style.div_container}>

        <label className={style.texto} htmlFor="email">Email:</label>

        <input
          className={style.input}
          placeholder="example@example.com"
          onChange={handleChange}
          value={userData.email}
          name="email"
          type="email"
          id="email"
          key="email"
        />
        <br />

        {errors.email && <div className={style.error}>{errors.email}</div>}
        
        <br />

        <label className={style.texto} htmlFor="password"> Password:</label>
        <input
          className={style.input}
          placeholder="Password"
          onChange={handleChange}
          value={userData.password}
          name="password"
          type="password"
          id="password"
          key="password"
        />
        <br />

        {errors.password && <div className={style.error}>{errors.password}</div>}
        <br />

        <input className={style.submit} type="submit" value="Sign in" disabled={!isSubmitEnabled} />
      </div>
    </form>
  );
}
