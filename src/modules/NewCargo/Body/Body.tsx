import React from 'react'
import s from './Body.module.scss'
import { Radio, Typography, Input, InputNumber, Select } from 'antd'
import classNames from 'classnames'
import boxSvg from '@/public/svg/newBox/box.svg'
import listSvg from '@/public/svg/boxEl/list.svg'
import arrowXSvg from '@/public/svg/boxEl/arrowX.svg'
import arrowYSvg from '@/public/svg/boxEl/arrowY.svg'
import { PlusOutlined } from '@ant-design/icons'
import { BodyProps } from './type'
import { Controller } from 'react-hook-form'
import Image from 'next/image'

const { Text } = Typography

const Body: React.FC<BodyProps> = ({
  control,
  setUnitLength,
  setUnitWeight,
  unitLength,
  unitWeight,
  watch
}) => {
  const getMaxLength = () => {
    if (unitLength === 'мм') {
      return 50000
    } else if (unitLength === 'cм') {
      return 5000
    } else {
      return 50
    }
  }

  return (
    <div className={s.cont}>
      <div className={s.header}>
        <Radio.Group
          size='large'
          value={unitLength}
          onChange={(e) => setUnitLength(e.target.value)}
        >
          <Radio value={'мм'}>мм</Radio>
          <Radio value={'cм'}>cм</Radio>
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
            render={({ field }) => (
              <Input type='text' {...field} required maxLength={110} />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            {watch('name') ? watch('name').length : 0} / 110
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Количество</Text>
          <Controller
            control={control}
            name='count'
            render={({ field }) => (
              <InputNumber
                style={{ width: '100%' }}
                type='text'
                {...field}
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
            render={({ field }) => (
              <InputNumber
                style={{ width: '100%' }}
                {...field}
                type='text'
                addonAfter={unitLength}
                max={getMaxLength()}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            {watch('length') ? String(watch('length')) : 0} / {getMaxLength()}
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Ширина</Text>
          <Controller
            control={control}
            name='width'
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                type='text'
                addonAfter={unitLength}
                max={getMaxLength()}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            {watch('width') ? String(watch('width')) : 0} / {getMaxLength()}
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Высота</Text>
          <Controller
            control={control}
            name='height'
            render={({ field }) => (
              <InputNumber
                {...field}
                style={{ width: '100%' }}
                type='text'
                addonAfter={unitLength}
                max={getMaxLength()}
                required
              />
            )}
          />
          <Text type='secondary' style={{ marginLeft: 'auto' }}>
            {watch('height') ? String(watch('height')) : 0} / {getMaxLength()}
          </Text>
        </div>
        <div className={s.el}>
          <Text type='secondary'>Масса брутто</Text>
          <Controller
            control={control}
            name='weight'
            render={({ field }) => (
              <InputNumber
                {...field}
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
            <Image src={boxSvg.src} alt='Ящик' width={20} height={20}/>
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
            <Image src={listSvg.src} alt='Ярусы' width={20} height={20}/>
          </div>
        </div>
        <div className={classNames(s.breakInput, s.el)}>
          <Text type='secondary'>Нагрузка</Text>
          <div className={s.el_mod}>
            <Controller
              control={control}
              name='load'
              render={({ field }) => (
                <InputNumber
                  {...field}
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
            <Image src={arrowXSvg.src} width={20} height={20} alt='Поворот'/>
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
            <Image src={arrowYSvg.src} width={20} height={20} alt='Кантование'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Body
