import React, { useState } from 'react'

import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import { validateEmail } from '../../../utils/Validations'
import app from '../../../utils/Firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import './RegisterForm.scss'

const auth = getAuth(app)

export default function RegisterForm({ setSelectedForm }) {

  const [formData, setFormData] = useState(defaultValueForm())
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () => {
    setFormError({})
    let errors = {}
    let formOk = true

    if (!validateEmail(formData.email)) {
      errors.email = true
      formOk = false
    }

    if (formData.password.length < 6) {
      errors.password = true
      formOk = false
    }

    if (!formData.username) {
      errors.username = true
      formOk = false
    }

    setFormError(errors)

    if (formOk) {
      setIsLoading(true)
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          console.log('Registro completado')
        }).catch(() => {
          toast.error("Error al crear la cuenta")
        }).finally(() => {
          setIsLoading(false)
          setSelectedForm(null)
        })
    }
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
            error={formError.email}
          />
          {formError.email && (<span className='error-text'>Por favor introduce email valido</span>)}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Contraseña'
            icon={
              showPassword ? (<Icon name='eye slash outline' link onClick={handlerShowPassword} />) : (<Icon name='eye' link onClick={handlerShowPassword} />)
            }
            error={formError.password}
          />
          {formError.password && (<span className='error-text'>Por favor elige contraseña mayor 6 caracteres</span>)}
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='Como deberiamos llamarte'
            icon='user circle outline'
            error={formError.username}
          />
          {formError.username && (<span className='error-text'>Por favor introduce un username </span>)}
        </Form.Field>
        <Button type='submit' loading={isLoading}>
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
