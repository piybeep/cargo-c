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

import { TransportConfigProps } from './TransportConfig.types'
import s from './TransportConfig.module.scss'
import { createTrasportInput } from './type'
import Van from './Van/Van'
import TractorTrailer from './TractorTrailer/TractorTrailer'

export function TransportConfig({ ...props }: TransportConfigProps) {
  const router = useRouter()

  const [width, setWidth] = useState('мм')
  const [height, setHeight] = useState('кг')
  const [axialLoad, setAxialLoad] = useState(0)
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
      type: 'Грузовой автомобиль'
    }
  })

  const watchTypeTransport = watch('type')

  useEffect(() => {
    watchTypeTransport != 'Грузовой автомобиль' && setIsSwitch(true)
  }, [watchTypeTransport])

  useEffect(() => {
    clearErrors()
  }, [isSwitch, watchTypeTransport, transport])

  const onSubmit = (data: any) => {
    console.log(data)
    let values: any = {}

    if (isSwitch) {
      values = {
        configWidth: data.configWidth,
        configHeight: data.configHeight,
        name: data.name,
        type: data.type,
        length: data.length,
        width: data.width,
        height: data.height,
        tonnage: data.tonnage
      }
    } else {
      if (transport === 0) {
        values = {
          configWidth: data.configWidth,
          configHeight: data.configHeight,
          name: data.name,
          type: data.type,
          length: data.length,
          width: data.width,
          height: data.height,
          tonnage: data.tonnage,

          semiTrailerAxes: data.semiTrailerAxes,
          semiTrailerWeight: data.semiTrailerWeight,
          L2: data.L2,
          L3: data.L3,
          A2SemiTrailer: data.A2SemiTrailer,
          A2SemiTrailerTrolley: data.A2SemiTrailerTrolley,

          // Для тягача/фургона
          Axes: data.Axes,
          WeightWithoutLoad: data.WeightWithoutLoad,
          L: data.L,
          L1: data.L1,
          A1: data.A1,
          A1Axes: data.A1Axes,
          A2: data.A2,
          A2Axes: data.A2Axes
        }
      } else {
        values = {
          configWidth: data.configWidth,
          configHeight: data.configHeight,
          name: data.name,
          type: data.type,
          length: data.length,
          width: data.width,
          height: data.height,
          tonnage: data.tonnage,

          // Для тягача/фургона
          Axes: data.Axes,
          WeightWithoutLoad: data.WeightWithoutLoad,
          L: data.L,
          L1: data.L1,
          A1: data.A1,
          A1Axes: data.A1Axes,
          A2: data.A2,
          A2Axes: data.A2Axes
        }
      }
    }
    //create transport
    // setAddTransport(
    //     {
    //         title: values.name,
    //         text: `${values.type} ${values.length} x ${values.width} x ${values.height} ${values.configWidth}, ${values.tonnage} ${values.configHeight}, "тут подсчёт"`,
    //         type: values.type
    //     })

    // router.push({pathname: '/transport'})
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
    setAxialLoad(e.target.value)
    setTransport(e.target.value)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Title className={s.header__title} level={5}>
          Параметры
        </Title>
        <div className={s.header__menu}>
          <span title='Добавить в шаблон' className={s.header__svg}>
            <svg
              className={s.header__svg}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_474_9493)'>
                <path
                  d='M5.99951 4H15.9995L19.9995 8V18C19.9995 18.5304 19.7888 19.0391 19.4137 19.4142C19.0387 19.7893 18.5299 20 17.9995 20H5.99951C5.46908 20 4.96037 19.7893 4.5853 19.4142C4.21023 19.0391 3.99951 18.5304 3.99951 18V6C3.99951 5.46957 4.21023 4.96086 4.5853 4.58579C4.96037 4.21071 5.46908 4 5.99951 4Z'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M11.9995 16C13.1041 16 13.9995 15.1046 13.9995 14C13.9995 12.8954 13.1041 12 11.9995 12C10.8949 12 9.99951 12.8954 9.99951 14C9.99951 15.1046 10.8949 16 11.9995 16Z'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14 4V8H8V4'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
          </span>

          <span
            onClick={() => reset()}
            title='Очистить поля'
            className={s.header__svg}
          >
            <svg
              className={s.header__svg}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_474_9498)'>
                <path
                  d='M20 11C19.7554 9.24017 18.9391 7.60961 17.6766 6.35945C16.4142 5.10928 14.7758 4.30887 13.0137 4.0815C11.2516 3.85414 9.46362 4.21243 7.9252 5.1012C6.38678 5.98996 5.18325 7.35989 4.5 8.99995M4 4.99995V8.99995H8'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4 12.9998C4.24456 14.7595 5.06093 16.3901 6.32336 17.6403C7.58579 18.8904 9.22424 19.6908 10.9863 19.9182C12.7484 20.1456 14.5364 19.7873 16.0748 18.8985C17.6132 18.0097 18.8168 16.6398 19.5 14.9998M20 18.9998V14.9998H16'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
          </span>

          <span title='Удалить' className={s.header__svg}>
            <svg
              className={s.header__svg}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clipPath='url(#clip0_474_9502)'>
                <path
                  d='M4 7H20'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M10 11V17'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14 11V17'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7'
                  stroke='#1890FF'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </g>
            </svg>
          </span>
        </div>
      </div>

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
              name='name'
              control={control}
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
                    {...register('name', {
                      required: true,
                      maxLength: 110,
                      minLength: 1
                    })}
                    status={errors.name && 'error'}
                    onChange={onChange}
                  />
                </div>
              )}
            />
            <Controller
              name='type'
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
              name='length'
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
              name='width'
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
              name='height'
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
              name='weight'
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
                    status={errors.weight && 'error'}
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
                value={axialLoad}
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
          <Button type='primary' htmlType='submit'>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
