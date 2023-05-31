import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import classNames from 'classnames'

import { Controller, useForm } from 'react-hook-form'

import {
  Radio,
  RadioChangeEvent,
  Typography,
  Input,
  Select,
  InputNumber,
  Switch,
  Button
} from 'antd'

import s from './TransportConfig.module.scss'
import { createTrasportInput } from './type'
import Van from './Van/Van'
import TractorTrailer from './TractorTrailer/TractorTrailer'
import Header from './Header/Header'
import { useCreateTransport } from './hook/useCreateTransport'

export function TransportConfig() {
  const router = useRouter()

  const { mutateAsync, isLoading } = useCreateTransport()

  const [width, setWidth] = useState<'м' | 'см' | 'мм'>('мм')
  const [height, setHeight] = useState<'тн' | 'кг'>('кг')
  const [transport, setTransport] = useState(0)

  const [isSwitch, setIsSwitch] = useState(true)

  const { Title, Text } = Typography
  const { TextArea } = Input

  const [minValue, setMinValue] = useState(10)
  const [maxValue, setMaxValue] = useState(500000)

  useEffect(() => {
    if (width === 'мм') {
      setMinValue(10)
      setMaxValue(500000)
    } else if (width === 'см') {
      setMinValue(1)
      setMaxValue(50000)
    } else {
      setMinValue(0.01)
      setMaxValue(500)
    }
  }, [width])

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    getValues,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<createTrasportInput>({
    defaultValues: {
      main: {
        type: 'Грузовой автомобиль',
        height: 10,
        length: 10,
        width: 10
      },
      tractor: {
        axesCount: 2
      },
      trailer: {
        axesCount: 2
      },
      van: {
        axesCount: 2
      }
    }
  })

  const watchTypeTransport = watch('main.type')

  useEffect(() => {
    watchTypeTransport != 'Грузовой автомобиль' && setIsSwitch(true)
  }, [watchTypeTransport])

  useEffect(() => {
    clearErrors()
  }, [isSwitch, watchTypeTransport, transport])

  const onSubmit = async (data: createTrasportInput) => {
    if (isSwitch) {
      console.log(data.main)
      await mutateAsync({
        ...data.main,
        weightUnit: height,
        sizeUnit: width,
        transports: [null],
        autoDistribution:true
      })
    } else {
      if (transport === 0) {
        console.log({
          main: {
            ...data.main
          },
          tractor: {
            ...data.tractor
          },
          trailer: {
            ...data.trailer
          }
        })
        await mutateAsync({
          ...data.main,
          weightUnit: height,
          sizeUnit: width,
          transports: [
            { ...data.trailer, type: 'Тягач с полуприцепом' },
            { ...data.tractor, type: 'Тягач с полуприцепом' }
          ],
          autoDistribution:false
        })
      } else {
        console.log({
          main: {
            ...data.main
          },
          van: {
            ...data.van
          }
        })
        await mutateAsync({
          ...data.main,
          weightUnit: height,
          sizeUnit: width,
          transports: [{ ...data.van, type: 'Фургон грузовой' }],
          autoDistribution:false
        })
      }
    }

    router.push({pathname: '/transport'})
  }

  const changeWidth = (e: RadioChangeEvent) => {
    setWidth(e.target.value)
  }

  const changeHeight = (e: RadioChangeEvent) => {
    setHeight(e.target.value)
  }

  const changeOptions = (checked: boolean) => {
    setIsSwitch(checked)
  }

  const changeAxialLoad = (e: RadioChangeEvent) => {
    setTransport(e.target.value)
  }

  return (
    <div className={s.wrapper}>
      <Header reset={reset} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.form__wrapper}>
          <div className={s.menu}>
            <Radio.Group
              onChange={changeWidth}
              value={width}
              className={s.menu__group}
            >
              <Radio value={'мм'}>мм</Radio>
              <Radio value={'см'}>см</Radio>
              <Radio value={'м'}>м</Radio>
            </Radio.Group>

            <Radio.Group
              onChange={changeHeight}
              value={height}
              className={s.menu__group}
            >
              <Radio value={'кг'}>кг</Radio>
              <Radio value={'тн'}>тн</Radio>
            </Radio.Group>
          </div>
          <div className={s.info}>
            <Controller
              name='main.name'
              control={control}
              rules={{
                required: true,
                maxLength: 110,
                minLength: 1
              }}
              render={({ field: { onChange, value } }) => (
                <div className={s.info__input}>
                  <Text className={s.info__text} type='secondary'>
                    Название или маркировка места
                  </Text>
                  <TextArea
                    showCount
                    autoSize={true}
                    maxLength={110}
                    minLength={1}
                    value={value}
                    status={errors?.main?.name && 'error'}
                    onChange={onChange}
                  />
                </div>
              )}
            />
            <Controller
              name='main.type'
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className={s.info__select}>
                  <Text className={s.info__text} type='secondary'>
                    Тип грузовой площади
                  </Text>
                  <Select
                    defaultValue='Грузовой автомобиль'
                    value={value}
                    style={{ width: '100%' }}
                    onChange={onChange}
                    options={[
                      {
                        value: 'Грузовой автомобиль',
                        label: 'Грузовой автомобиль'
                      },
                      {
                        value: 'Морской контейнер',
                        label: 'Морской контейнер'
                      },
                      { value: 'Паллет', label: 'Паллет' },
                      { value: 'Складская площадь', label: 'Складская площадь' }
                    ]}
                  />
                </div>
              )}
            />

            <Controller
              name='main.length'
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <div className={s.item}>
                  <Text className={s.item__text} type='secondary'>
                    Длина
                  </Text>
                  <InputNumber
                    value={value}
                    type='number'
                    className={s.item__input}
                    addonAfter={width}
                    min={minValue}
                    max={maxValue}
                    defaultValue={minValue}
                    onChange={onChange}
                  />
                  <Text
                    className={s.item__text_bottom}
                    type='secondary'
                  >{`${minValue} / ${maxValue}`}</Text>
                </div>
              )}
            />
            <Controller
              name='main.width'
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className={s.item}>
                  <Text className={s.item__text} type='secondary'>
                    Ширина
                  </Text>
                  <InputNumber
                    value={value}
                    type='number'
                    className={s.item__input}
                    addonAfter={width}
                    min={minValue}
                    max={maxValue / 10}
                    defaultValue={minValue}
                    onChange={onChange}
                  />
                  <Text
                    className={s.item__text_bottom}
                    type='secondary'
                  >{`${minValue} / ${maxValue / 10}`}</Text>
                </div>
              )}
            />
            <Controller
              name='main.height'
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, value } }) => (
                <div className={s.item}>
                  <Text className={s.item__text} type='secondary'>
                    Высота
                  </Text>
                  <InputNumber
                    value={value}
                    type='number'
                    className={s.item__input}
                    addonAfter={width}
                    min={minValue}
                    max={maxValue / 10}
                    defaultValue={minValue}
                    onChange={onChange}
                  />
                  <Text
                    className={s.item__text_bottom}
                    type='secondary'
                  >{`${minValue} / ${maxValue / 10}`}</Text>
                </div>
              )}
            />
            <Controller
              name='main.weight'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field: { onChange, value } }) => (
                <div className={s.item}>
                  <Text className={s.item__text} type='secondary'>
                    Тоннаж
                  </Text>
                  <InputNumber
                    className={s.item__input}
                    addonAfter={height}
                    defaultValue={0}
                    value={value}
                    type='number'
                    status={errors.main?.weight && 'error'}
                    onChange={onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div
          className={classNames(s.options, {
            [s.options__hidden]: watchTypeTransport != 'Грузовой автомобиль'
          })}
        >
          <div className={s.options__header}>
            <Title className={s.options__title} level={5}>
              Осевая нагрузка
            </Title>
            <div className={s.options__wrapper}>
              <Radio.Group
                onChange={changeAxialLoad}
                defaultValue={0}
                value={transport}
                className={classNames(s.options__group, {
                  [s.options__group_hidden]: isSwitch
                })}
              >
                <Radio value={0}>Тягач с полуприцепом</Radio>
                <Radio value={1}>Фургон грузовой</Radio>
              </Radio.Group>
              <div
                className={classNames(s.options__info, {
                  [s.options__info_hidden]: !isSwitch
                })}
              >
                <Text className={s.options__text} type='secondary'>
                  Выключите этот параметр если требуется указать нагрузку на
                  каждую ось отдельно
                </Text>
              </div>
            </div>
          </div>
          <div className={s.options__switch}>
            <Switch
              defaultChecked={isSwitch}
              checked={isSwitch}
              onChange={changeOptions}
            />
            <Text className={s.options__text} type='secondary'>
              Автоматически
            </Text>
          </div>
        </div>
        {!isSwitch ? (
          <div className={s.list}>
            {transport != 0 ? (
              <Van control={control} height={height} width={width} />
            ) : (
              <TractorTrailer control={control} height={height} width={width} />
            )}
          </div>
        ) : (
          <></>
        )}

        <div className={s.buttons}>
          <Link href='/transport'>
            <Button>Отменить</Button>
          </Link>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
