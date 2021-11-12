import React, { useState } from 'react'

import { Button, Icon, Form, Input } from 'semantic-ui-react'
// import app from '../../../utils/Firebase'
// import { getAuth } from 'firebase/auth'

import './RegisterForm.scss'

export default function RegisterForm({ setSelectedForm }) {

  const [formData, setFormData] = useState(defaultValueForm())

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () => {
    console.log('Formulario enviado')
    console.log(formData)
  }

  return (
    <div className='register-form'>
      <h1>Empieza a escuchar con una cuenta de Spotyfier gratis</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Correo electronico'
            icon='mail outline'

          // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='password'
            name='password'
            placeholder='Contraseña'
            icon='eye'

          // error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='Como deberiamos llamarte'
            icon='user circle outline'

          // error={}
          />
        </Form.Field>
        <Button type='submit'>
          Continuar
        </Button>
      </Form>

      <div className='register-form__options'>
        <p onClick={() => setSelectedForm(null)}>Volver</p>
        <p>
          ¿Ya tienes Spotyfier?{" "}
          <span onClick={() => setSelectedForm('login')}>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  )
}

function defaultValueForm() {
  return {
    email: '',
    password: '',
    username: ''
  }
}
