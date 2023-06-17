import React from 'react'
import { TractorTrailerProps } from './type'
import s from '../TransportConfig.module.scss'
import { Typography, Select, InputNumber } from 'antd'
import Image from 'next/image'
import { Controller } from 'react-hook-form'

const { Title, Text } = Typography

const Tractor: React.FC<TractorTrailerProps> = ({ control, height, width }) => {
  return (
    <div className={s.list__item}>
      <div className={s.list__header}>
        <Title className={s.list__title} level={5}>
          Описание тягача
        </Title>
        <Image
          className={s.list__img}
          width='277'
          height='142'
          src={'/img/tyagach.png'}
          alt={'Тягача'}
        />
      </div>
      <div className={s.list__description}>
        <Controller
          name='tractor.axesCount'
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Количество осей
              </Text>
              <Select
                className={s.list__input}
                defaultValue={2}
                value={value}
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
          name='tractor.weight'
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
                min={1}
                type='number'
                status={error && 'error'}
                onChange={onChange}
              />
            </div>
          )}
        />

        <Controller
          name='tractor.length'
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Длина между осями
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={width}
                  value={value}
                  min={1}
                  type='number'
                  status={error && 'error'}
                  onChange={onChange}
                />
                <Title className={s.list__title} level={5}>
                  L
                </Title>
              </div>
            </div>
          )}
        />

        <Controller
          name='tractor.length1'
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Длина от оси А1 до сцеп. устройства
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={width}
                  value={value}
                  min={1}
                  type='number'
                  status={error && 'error'}
                  onChange={onChange}
                />
                <Title className={s.list__title} level={5}>
                  L1
                </Title>
              </div>
            </div>
          )}
        />

        <Controller
          name='tractor.axle1Min'
          control={control}
          rules={{ required: true, min: 1 }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Нагрузка на ось без груза
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={height}
                  value={value}
                  min={1}
                  type='number'
                  status={error && 'error'}
                  onChange={onChange}
                />
                <Title className={s.list__title} level={5}>
                  A1
                </Title>
              </div>
            </div>
          )}
        />

        <Controller
          name='tractor.axle1Max'
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Макс. нагрузка на ось
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={height}
                  value={value}
                  min={1}
                  type='number'
                  status={error && 'error'}
                  onChange={onChange}
                />
                <Title className={s.list__title} level={5}>
                  A1
                </Title>
              </div>
            </div>
          )}
        />

        <Controller
          name='tractor.axle2Min'
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Нагрузка на ось без груза
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={height}
                  value={value}
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
          name='tractor.axle2Max'
          control={control}
          rules={{
            required: true,
            min: 1
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className={s.list__control}>
              <Text className={s.list__text} type='secondary'>
                Макс. нагрузка на ось
              </Text>
              <div className={s.list__row}>
                <InputNumber
                  className={s.list__input_small}
                  addonAfter={height}
                  value={value}
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
  )
}

export default Tractor
