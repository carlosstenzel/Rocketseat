import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string()
    .min(6, 'No minimo 6 caracteres')
    .required('A senha é obrigatório'),
});

export default function SignUp() {
  function handleSumit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form schema={schema} onSubmit={handleSumit}>
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
