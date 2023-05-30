import React from 'react'
import { TractorTrailerProps } from './type'
import s from '../TransportConfig.module.scss'
import { Typography, Select, InputNumber } from 'antd'
import Image from 'next/image'
import { Controller } from 'react-hook-form'
import Tractor from './Tractor'

const { Title, Text } = Typography

const TractorTrailer: React.FC<TractorTrailerProps> = ({
  control,
  height,
  width
}) => {
  return (
    <>
      <div className={s.list__item}>
        <div className={s.list__header}>
          <Title className={s.list__title} level={5}>
            Описание полуприцепа
          </Title>
          <Image
            className={s.list__img}
            width='277'
            height='142'
            src={'/img/pricep.png'}
            alt={'Картинка'}
          />
        </div>
        <div className={s.list__description}>
          <Controller
            name='axesCount2'
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Количество осей
                </Text>
                <Select
                  value={Number(value)}
                  className={s.list__input}
                  defaultValue={2}
                  style={{ width: '100%' }}
                  onChange={onChange}
                  options={[
                    { value: 2, label: 2 },
                    { value: 3, label: 3 }
                  ]}
                />
              </div>
            )}
          />

          <Controller
            name='weight2'
            control={control}
            rules={{
              required: true,
              min: 1
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Собственная масса без груза
                </Text>
                <InputNumber
                  className={s.list__input}
                  addonAfter={height}
                  value={value}
                  defaultValue={1}
                  min={1}
                  type='number'
                  status={error && 'error'}
                  onChange={onChange}
                />
              </div>
            )}
          />

          <Controller
            name='length3'
            control={control}
            rules={{
              required: true,
              min: 1
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Длина от центра тележки до сцеп. устройства
                </Text>
                <div className={s.list__row}>
                  <InputNumber
                    value={value}
                    className={s.list__input_small}
                    addonAfter={width}
                    defaultValue={1}
                    min={1}
                    type='number'
                    status={error && 'error'}
                    onChange={onChange}
                  />
                  <Title className={s.list__title} level={5}>
                    L2
                  </Title>
                </div>
              </div>
            )}
          />

          <Controller
            name='length4'
            control={control}
            rules={{
              required: true,
              min: 1
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Длина от центра тележки А2 до стенки
                </Text>
                <div className={s.list__row}>
                  <InputNumber
                    className={s.list__input_small}
                    addonAfter={width}
                    defaultValue={1}
                    value={value}
                    min={1}
                    type='number'
                    status={error && 'error'}
                    onChange={onChange}
                  />
                  <Title className={s.list__title} level={5}>
                    L3
                  </Title>
                </div>
              </div>
            )}
          />

          <Controller
            name='axleMin2'
            control={control}
            rules={{
              required: true,
              min: 1
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Нагрузка на осевую тележку без груза
                </Text>
                <div className={s.list__row}>
                  <InputNumber
                    className={s.list__input_small}
                    addonAfter={height}
                    value={value}
                    defaultValue={1}
                    min={1}
                    type='number'
                    status={error && 'error'}
                    onChange={onChange}
                  />
                  <Title className={s.list__title} level={5}>
                    A2
                  </Title>
                </div>
              </div>
            )}
          />

          <Controller
            name='axleMax2'
            control={control}
            rules={{
              required: true,
              min: 1
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className={s.list__control}>
                <Text className={s.list__text} type='secondary'>
                  Макс. нагрузка на осевую тележку
                </Text>
                <div className={s.list__row}>
                  <InputNumber
                    value={value}
                    className={s.list__input_small}
                    addonAfter={height}
                    defaultValue={1}
                    min={1}
                    type='number'
                    status={error && 'error'}
                    onChange={onChange}
                  />
                  <Title className={s.list__title} level={5}>
                    A2
                  </Title>
                </div>
              </div>
            )}
          />
        </div>
      </div>
      <Tractor control={control} height={height} width={width} />
    </>
  )
}

export default TractorTrailer
