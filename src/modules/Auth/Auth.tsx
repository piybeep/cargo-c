import React, { useState } from 'react'
import s from './Auth.module.scss'
import { Typography, Button, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Checkbox, Modal, Space, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { Logo } from '@/component'
import { useLogin } from './hook/useLogin'
import { useRouter } from 'next/router'
import { useRecovery } from './hook/useRecovery'

const { Title, Text, Link } = Typography
interface AuthInputs {
  email: string
  password: string
  rememberMe: boolean
}
export const Auth = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { control, handleSubmit } = useForm<AuthInputs>({
    defaultValues: { rememberMe: false }
  })
  const { mutate, isError, isSuccess } = useLogin()
  const { mutate: recovery, isFetched, setIsFetched, isLoading } = useRecovery()

  if (isSuccess && !isError) {
    router.replace('/')
  }

  const Submit = (data: AuthInputs) => {
    mutate(data)
  }

  const sendEmail = ({ email }: { email: string }) => {
    recovery({ email })
  }

  const closeModal = () => {
    form.resetFields()
    setIsModalOpen(false)
    setIsFetched(false)
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
          <Text className={s.form__title}>Авторизация</Text>
          <div className={s.form__inputs}>
            <Controller
              name='email'
              control={control}
              rules={{
                required: true,
                pattern: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i
              }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Почта'
                  inputMode='email'
                  status={error ? 'error' : ''}
                  prefix={
                    <MailOutlined
                      style={{ color: '#1890FF', fontSize: '18px' }}
                    />
                  }
                />
              )}
            />
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <Input.Password
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  status={error ? 'error' : ''}
                  placeholder='Пароль'
                  prefix={
                    <LockOutlined
                      style={{ color: '#1890FF', fontSize: '18px' }}
                    />
                  }
                />
              )}
            />
          </div>
          {isError ? (
            <Text type='danger'>Неверный логин или пароль</Text>
          ) : (
            <></>
          )}
          <div className={s.tool}>
            <Controller
              name='rememberMe'
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value}>
                  Запомнить меня
                </Checkbox>
              )}
            />
            <Link href='#' onClick={() => setIsModalOpen(true)}>
              Забыли пароль?
            </Link>
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
            <Logo size='small' />
            <Text type='secondary'>Название компании</Text>
          </div>
          <Text type='secondary'>Сделано в студии piybeep.</Text>
        </div>
        <Text type='secondary'>© domainname.com, 2023</Text>
      </div>
      <Modal
        title='Восстановление пароля'
        open={isModalOpen}
        onOk={() => console.log(2222)}
        onCancel={closeModal}
        width={400}
        footer={[
          <Form onFinish={sendEmail} form={form} key={'submit'}>
            {isFetched ? (
              <Space style={{ width: '100%' }}>
                <Text
                  style={{
                    width: '80%',
                    marginRight: 'auto',
                    textAlign: 'start',
                    display: 'flex'
                  }}
                >
                  Перейдите по ссылке, которая отправлена на вашу почту
                </Text>
                <Button type='primary' onClick={closeModal}>
                  Хорошо
                </Button>
              </Space>
            ) : (
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item
                  name={'email'}
                  rules={[{ required: true, type: 'email' }]}
                  style={{ width: '100%', margin: 0 }}
                >
                  <Input placeholder='Введите почту...' inputMode='email' />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                  <Button type='primary' htmlType='submit' loading={isLoading}>
                    Отправить
                  </Button>
                </Form.Item>
              </Space.Compact>
            )}
          </Form>
        ]}
      ></Modal>
    </div>
  )
}
