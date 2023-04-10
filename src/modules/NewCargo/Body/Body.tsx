import React from 'react'
import s from './Body.module.scss'
import { Radio, Typography, Input, InputNumber, Select } from 'antd'
import classNames from 'classnames'
import boxSvg from '@/img/svg/newBox/box.svg'
import listSvg from '@/img/svg/boxEl/list.svg'
import arrowXSvg from '@/img/svg/boxEl/arrowX.svg'
import arrowYSvg from '@/img/svg/boxEl/arrowY.svg'
import { PlusOutlined } from '@ant-design/icons'

const { Text } = Typography

const Body = () => {
  return (
    <div className={s.cont}>
      <div className={s.header}>
        <Radio.Group size='large'>
          <Radio value={1}>мм</Radio>
          <Radio value={2}>см</Radio>
          <Radio value={3}>м</Radio>
        </Radio.Group>
        <Radio.Group size='large'>
          <Radio value={1}>кг</Radio>
          <Radio value={2}>тн</Radio>
        </Radio.Group>
      </div>
      <div className={s.body}>
        <div className={classNames(s.firstInput, s.el)}>
          <Text type='secondary'>Название или маркировка места</Text>
          <Input type='text' />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Количество</Text>
          <InputNumber style={{ width: '100%' }} type='text' />
        </div>
        <div className={s.el}>
          <Text type='secondary'>Длина</Text>
          <InputNumber style={{ width: '100%' }} type='text' addonAfter='мм' />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Ширина</Text>
          <InputNumber style={{ width: '100%' }} type='text' addonAfter='мм' />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Высота</Text>
          <InputNumber style={{ width: '100%' }} type='text' addonAfter='мм' />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Масса брутто</Text>
          <InputNumber style={{ width: '100%' }} type='text' addonAfter='кг' />
        </div>
        <div className={s.el}>
          <Text type='secondary'>Тип упаковки</Text>
          <div className={s.el_mod}>
            <Select
              defaultValue='Ящик'
              options={[
                { label: 'Ящик', value: 1 },
                { label: 'Коробка', value: 2 }
              ]}
              style={{ width: '100%' }}
            />
            <img src={boxSvg.src} alt='box' />
          </div>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Ярусы</Text>
          <div className={s.el_mod}>
            <Select
              defaultValue='Да - оптимально'
              options={[
                { label: 'Да - оптимально', value: 1 },
                { label: 'Нет - оптимально', value: 2 }
              ]}
              style={{ width: '100%' }}
            />
            <img src={listSvg.src} alt='list' />
          </div>
        </div>
        <div className={classNames(s.breakInput, s.el)}>
          <Text type='secondary'>Нагрузка</Text>
          <div className={s.el_mod}>
            <InputNumber
              style={{ width: '100%' }}
              type='text'
              addonAfter='мм'
            />
            <PlusOutlined />
          </div>
        </div>
        <div></div>
        <div className={s.el}>
          <Text type='secondary'>Поворот</Text>
          <div className={s.el_mod}>
            <Select
              defaultValue='Да'
              options={[
                { label: 'Да', value: 1 },
                { label: 'Нет', value: 2 }
              ]}
              style={{ width: '100%' }}
            />
            <img src={arrowXSvg.src} />
          </div>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Кантование</Text>
          <div className={s.el_mod}>
            <Select
              defaultValue='Да'
              options={[
                { label: 'Да', value: 1 },
                { label: 'Нет', value: 2 }
              ]}
              style={{ width: '100%' }}
            />
            <img src={arrowYSvg.src} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
