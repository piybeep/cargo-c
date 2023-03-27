import React from 'react'
import s from './Auth.module.scss'
import { Typography, Button, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Checkbox } from 'antd'
import { useForm, Controller } from 'react-hook-form'

const { Title, Text, Link } = Typography
interface AuthInputs {
  email: string
  password: string
}
const Auth = () => {
  const { control, handleSubmit } = useForm<AuthInputs>()

  const Submit = (data: AuthInputs) => {
    console.log(data)
  }

  return (
    <div className={s.cont}>
      <div className={s.formCont}>
        <div className={s.title}>
          <div className={s.title__top}>
            <div className={s.title__logo}></div>
            <Title level={1}>Логистика</Title>
          </div>
          <Text type='secondary'>
            Сервис для оптимизации загрузки грузовых контейнеров
          </Text>
        </div>
        <form className={s.form} onSubmit={handleSubmit(Submit)}>
          <Text className={s.form__title}>Авторизация</Text>
          <div className={s.form__inputs}>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Почта'
                  prefix={<UserOutlined />}
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Пароль'
                  prefix={<LockOutlined />}
                />
              )}
            />
          </div>
          <div className={s.tool}>
            <Checkbox>Запомнить меня</Checkbox>
            <Link href='#'>Забыли пароль?</Link>
          </div>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            className={s.button}
          >
            Войти
          </Button>
        </form>
      </div>
      <div className={s.footer}>
        <div className={s.footer__top}>
          <div className={s.footer__top_mod}>
            <div className={s.footer__logo}></div>
            <Text type='secondary'>Название компании</Text>
          </div>
          <Text type='secondary'>Сделано в студии piybeep.</Text>
        </div>
        <Text type='secondary'>© domainname.com, 2023</Text>
      </div>
    </div>
  )
}

export default Auth
