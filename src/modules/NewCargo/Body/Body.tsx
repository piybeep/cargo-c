import React from 'react'
import s from './Body.module.scss'
import { Radio, Typography, Input, InputNumber, Select } from 'antd'
import classNames from 'classnames'
import boxSvg from '@/img/svg/newBox/box.svg'
import listSvg from '@/img/svg/boxEl/list.svg'
import arrowXSvg from '@/img/svg/boxEl/arrowX.svg'
import arrowYSvg from '@/img/svg/boxEl/arrowY.svg'
import { PlusOutlined } from '@ant-design/icons'
import { BodyProps } from './type'
import { Controller } from 'react-hook-form'

const { Text } = Typography

const Body: React.FC<BodyProps> = ({
  control,
  setUnitLength,
  setUnitWeight,
  unitLength,
  unitWeight
}) => {
  return (
    <div className={s.cont}>
      <div className={s.header}>
        <Radio.Group
          size='large'
          value={unitLength}
          onChange={(e) => setUnitLength(e.target.value)}
        >
          <Radio value={'мм'}>мм</Radio>
          <Radio value={'см'}>см</Radio>
          <Radio value={'м'}>м</Radio>
        </Radio.Group>
        <Radio.Group
          size='large'
          value={unitWeight}
          onChange={(e) => setUnitWeight(e.target.value)}
        >
          <Radio value={'кг'}>кг</Radio>
          <Radio value={'тн'}>тн</Radio>
        </Radio.Group>
      </div>
      <div className={s.body}>
        <div className={classNames(s.firstInput, s.el)}>
          <Text type='secondary'>Название или маркировка места</Text>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange } }) => (
              <Input type='text' onChange={onChange} required />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Количество</Text>
          <Controller
            control={control}
            name='count'
            render={({ field: { onChange } }) => (
              <InputNumber
                style={{ width: '100%' }}
                type='text'
                onChange={onChange}
                required
              />
            )}
          />
        </div>
        <div className={s.el}>
          <Text type='secondary'>Длина</Text>
          <Controller
            control={control}
            name='length'
            render={({ field: { onChange } }) => (
              <InputNumber
                style={{ width: '100%' }}
                onChange={onChange}
                type='text'
                addonAfter={unitLength}
                max={50000}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 50000
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Ширина</Text>
          <Controller
            control={control}
            name='width'
            render={({ field: { onChange } }) => (
              <InputNumber
                onChange={onChange}
                style={{ width: '100%' }}
                type='text'
                addonAfter={unitLength}
                max={50000}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 50000
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Высота</Text>
          <Controller
            control={control}
            name='height'
            render={({ field: { onChange } }) => (
              <InputNumber
                onChange={onChange}
                style={{ width: '100%' }}
                type='text'
                addonAfter={unitLength}
                max={50000}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            15 / 50000
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Масса брутто</Text>
          <Controller
            control={control}
            name='weight'
            render={({ field: { onChange } }) => (
              <InputNumber
                onChange={onChange}
                style={{ width: '100%' }}
                type='text'
                addonAfter={unitWeight}
                required
              />
            )}
          />
        </div>
        <div className={s.el}>
          <Text type='secondary'>Тип упаковки</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='type'
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  options={[
                    { label: 'Ящик', value: 'Ящик' },
                    { label: 'Коробка', value: 'Коробка' },
                    { label: 'Палет', value: 'Палет' }
                  ]}
                  style={{ width: '100%' }}
                />
              )}
            />
            <img src={boxSvg.src} alt='box' />
          </div>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Ярусы</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='tiers'
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  options={[
                    { label: 'Да - оптимально', value: 'Да - оптимально' },
                    { label: 'Нет', value: 'Нет' },
                    {
                      label: 'Да - только на другой груз',
                      value: 'Да - только на другой груз'
                    },
                    { label: 'Да - максимально', value: 'Да - максимально' }
                  ]}
                  style={{ width: '100%' }}
                />
              )}
            />
            <img src={listSvg.src} alt='list' />
          </div>
        </div>
        <div className={classNames(s.breakInput, s.el)}>
          <Text type='secondary'>Нагрузка</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='load'
              render={({ field: { onChange } }) => (
                <InputNumber
                  onChange={onChange}
                  style={{ width: '100%' }}
                  type='text'
                  addonAfter={unitWeight}
                  required
                />
              )}
            />
            <PlusOutlined />
          </div>
        </div>
        <div className={s.el_mod2}></div>
        <div className={s.el}>
          <Text type='secondary'>Поворот</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='turn'
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  options={[
                    { label: 'Да', value: true },
                    { label: 'Нет', value: false }
                  ]}
                  style={{ width: '100%' }}
                />
              )}
            />
            <img src={arrowXSvg.src} />
          </div>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Кантование</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='tilting'
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  options={[
                    { label: 'Да', value: true },
                    { label: 'Нет', value: false }
                  ]}
                  style={{ width: '100%' }}
                />
              )}
            />
            <img src={arrowYSvg.src} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body