import React, { useState } from 'react'
import s from './Auth.module.scss'
import { Typography, Button, Input } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Checkbox, Modal, Space, Form } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { Logo } from '@/component'

const { Title, Text, Link } = Typography
interface AuthInputs {
  email: string
  password: string
}
export const Auth = () => {
  const [form] = Form.useForm()
  const [isFetched, setIsFetched] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { control, handleSubmit } = useForm<AuthInputs>()

  const Submit = (data: AuthInputs) => {
    console.log(data)
  }

  const sendEmail = (data: any) => {
    console.log(data)
    setIsFetched(true)
  }

  const closeModal = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  return (
    <div className={s.cont}>
      <div className={s.formCont}>
        <div className={s.title}>
          <div className={s.title__top}>
            <Logo size='large' />
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
              rules={{required:true}}
              render={({ field: { onChange } }) => (
                <Input
                  onChange={onChange}
                  width={'100%'}
                  size='large'
                  placeholder='Почта'
                  inputMode='email'
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
              rules={{required:true}}
              render={({ field: { onChange } }) => (
                <Input.Password
                  onChange={onChange}
                  width={'100%'}
                  size='large'
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
          <div className={s.tool}>
            <Checkbox>Запомнить меня</Checkbox>
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
        footer={[
          <Form onFinish={sendEmail} form={form}>
            {isFetched ? (
              <Space style={{ width: '100%' }}>
                <Text
                  style={{
                    width: '50%',
                    marginRight: 'auto',
                    textAlign: 'start'
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
                  style={{ width: '100%' }}
                >
                  <Input placeholder='Введите почту...' inputMode='email' />
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
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
