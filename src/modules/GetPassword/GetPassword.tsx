import React from 'react'
import s from './GetPassword.module.scss'
import { Typography, Button, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { useForm, Controller } from 'react-hook-form'
import { Logo } from '@/component'

const { Title, Text } = Typography
interface AuthInputs {
  repPassword: string
  password: string
}

export const GetPassword = ({ code }: { code: number }) => {
  console.log(code)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AuthInputs>()

  const Submit = (data: AuthInputs) => {
    console.log(data)
  }

  return (
    <div className={s.cont}>
      <div className={s.formCont}>
        <div className={s.title}>
          <div className={s.title__top}>
            <Logo size='large' />
            <Title level={1}>Логистика</Title>
          </div>
          <Text type='secondary' style={{ textAlign: 'center' }}>
            Сервис для оптимизации загрузки грузовых контейнеров
          </Text>
        </div>
        <form className={s.form} onSubmit={handleSubmit(Submit)}>
          <Text className={s.form__title}>Восстановление пароля</Text>
          <div className={s.form__inputs}>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Input.Password
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Новый пароль'
                  status={errors.password ? 'error' : ''}
                  prefix={
                    <LockOutlined
                      style={{ color: '#1890FF', fontSize: '18px' }}
                    />
                  }
                />
              )}
            />
            <Controller
              name='repPassword'
              control={control}
              rules={{
                validate: (e) => e === watch('password'),
                required: true
              }}
              render={({ field: { onChange } }) => (
                <Input.Password
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Повторите новый пароль'
                  status={errors.repPassword ? 'error' : ''}
                  prefix={
                    <LockOutlined
                      style={{ color: '#1890FF', fontSize: '18px' }}
                    />
                  }
                />
              )}
            />
          </div>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            className={s.button}
          >
            Продолжить
          </Button>
        </form>
      </div>
      <div className={s.footer}>
        <div className={s.footer__top}>
          <div className={s.footer__top_mod}>
            <Logo size='small' />
            <Text type='secondary'>Название компании</Text>
          </div>
          <Text type='secondary'>Сделано в студии piybeep.</Text>
        </div>
        <Text type='secondary'>© domainname.com, 2023</Text>
      </div>
    </div>
  )
}
