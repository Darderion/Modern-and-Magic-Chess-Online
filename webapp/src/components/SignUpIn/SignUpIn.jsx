import React from "react";
import { useForm } from "react-hook-form";
import './SignUpIn.css'
import sha512 from 'js-sha512';

export default function SignUpIn({ closeSelf, submitText, workWithData }) {
  const { register, handleSubmit } = useForm();

  const isCorrectStr = (str) => {
    // lenngth >= 3 and str contains only letters (rus, eng), ' ' or digits
    return /^[а-яА-ЯA-Za-z0-9 -]*$/.test(str) && str.length >= 3;
  }
  
  const onSubmit = data => {
    if(isCorrectStr(data.nick) && isCorrectStr(data.password)) {
      data.password = sha512(data.password);
      workWithData(data);
    } else {
      alert('Данные могут состоять только из цифр, букв и побела, длина логина и пароля не должна быть короче 3 символов.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup__form">
      <div className="nick">
        <input {...register("nick", { required: true,
          minLength: 3 })} placeholder="Nick" />
      </div>
      <div className="pass">
      <input type="password" {...register("password", { required: true,
        minLength: 3 })} placeholder="Password" />
      </div>
      <div className="btns">
        <input type="submit" value={submitText}/>
        <button className="close" onClick={ closeSelf }>X</button>
      </div>
    </form>
  );
}
