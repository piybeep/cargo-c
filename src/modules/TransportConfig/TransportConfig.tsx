import { Controller, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

import { Radio, RadioChangeEvent, Typography, Input, Select, InputNumber, Switch } from 'antd';

import { TransportConfigProps } from './TransportConfig.types';

import s from './TransportConfig.module.scss'
import classNames from 'classnames';

export function TransportConfig({ ...props }: TransportConfigProps) {
    const [width, setWidth] = useState('мм')
    const [height, setHeight] = useState('кг')
    const [axialLoad, setAxialLoad] = useState(0)

    const [isSwitch, setIsSwitch] = useState(true)

    const { Title, Text } = Typography
    const { TextArea } = Input;

    const minMaxValue = '500 / 50000'

    const { control, handleSubmit } = useForm({
        defaultValues: {
            configWidth: width,
            configHeight: height,
            name: '',
            type: 0,
            length: 500,
            width: 500,
            height: 500,
            tonnage: 0,
        }
    });

    const onSubmit = (data: any) => console.log(data);

    const changeWidth = (e: RadioChangeEvent) => {
        console.log('Мера измерения длины: ', e.target.value);
        setWidth(e.target.value);
    }

    const changeHeight = (e: RadioChangeEvent) => {
        console.log('Мера измерения веса: ', e.target.value);
        setHeight(e.target.value);
    }

    const changeOptions = (checked: boolean) => {
        setIsSwitch(checked)
    }

    const changeAxialLoad = (e: RadioChangeEvent) => {
        setAxialLoad(e.target.value)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <Title className={s.header__title} level={5}>Параметры</Title>
                <div className={s.header__menu}>
                    <svg className={s.header__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_474_9493)">
                            <path d="M5.99951 4H15.9995L19.9995 8V18C19.9995 18.5304 19.7888 19.0391 19.4137 19.4142C19.0387 19.7893 18.5299 20 17.9995 20H5.99951C5.46908 20 4.96037 19.7893 4.5853 19.4142C4.21023 19.0391 3.99951 18.5304 3.99951 18V6C3.99951 5.46957 4.21023 4.96086 4.5853 4.58579C4.96037 4.21071 5.46908 4 5.99951 4Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9995 16C13.1041 16 13.9995 15.1046 13.9995 14C13.9995 12.8954 13.1041 12 11.9995 12C10.8949 12 9.99951 12.8954 9.99951 14C9.99951 15.1046 10.8949 16 11.9995 16Z" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 4V8H8V4" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>

                    <svg className={s.header__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_474_9498)">
                            <path d="M20 11C19.7554 9.24017 18.9391 7.60961 17.6766 6.35945C16.4142 5.10928 14.7758 4.30887 13.0137 4.0815C11.2516 3.85414 9.46362 4.21243 7.9252 5.1012C6.38678 5.98996 5.18325 7.35989 4.5 8.99995M4 4.99995V8.99995H8" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12.9998C4.24456 14.7595 5.06093 16.3901 6.32336 17.6403C7.58579 18.8904 9.22424 19.6908 10.9863 19.9182C12.7484 20.1456 14.5364 19.7873 16.0748 18.8985C17.6132 18.0097 18.8168 16.6398 19.5 14.9998M20 18.9998V14.9998H16" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>

                    <svg className={s.header__svg} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_474_9502)">
                            <path d="M4 7H20" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 11V17" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#1890FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    </svg>
                </div>
            </div>

            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.form__wrapper}>
                    <div className={s.menu}>
                        <Radio.Group onChange={changeWidth} value={width} className={s.menu__group}>
                            <Radio value={'мм'}>мм</Radio>
                            <Radio value={'см'}>см</Radio>
                            <Radio value={'м'}>м</Radio>
                        </Radio.Group>

                        <Radio.Group onChange={changeHeight} value={height} className={s.menu__group}>
                            <Radio value={'кг'}>кг</Radio>
                            <Radio value={'тн'}>тн</Radio>
                        </Radio.Group>
                    </div>
                    <div className={s.info}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.info__input}>
                                    <Text className={s.info__text} type="secondary">Название или маркировка места</Text>
                                    <TextArea
                                        showCount
                                        autoSize={true}
                                        maxLength={110}
                                        onChange={onChange} />
                                </div>
                            )}
                        />
                        <Controller
                            name='type'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.info__select}>
                                    <Text className={s.info__text} type="secondary">Название или маркировка места</Text>
                                    <Select
                                        defaultValue={0}
                                        style={{ width: '100%' }}
                                        onChange={onChange}
                                        options={[
                                            { value: 0, label: 'Грузовой автомобиль' },
                                            { value: 1, label: 'Какой-то другой' },
                                            { value: 2, label: 'Какой-то другой' },
                                        ]}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            name='length'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.item}>
                                    <Text className={s.item__text} type="secondary">Длина</Text>
                                    <InputNumber className={s.item__input} addonAfter={width} min={500} max={50000} defaultValue={500} onChange={onChange} />
                                    <Text className={s.item__text_bottom} type="secondary">{minMaxValue}</Text>
                                </div>
                            )}
                        />
                        <Controller
                            name='width'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.item}>
                                    <Text className={s.item__text} type="secondary">Ширина</Text>
                                    <InputNumber className={s.item__input} addonAfter={width} min={500} max={50000} defaultValue={500} onChange={onChange} />
                                    <Text className={s.item__text_bottom} type="secondary">{minMaxValue}</Text>
                                </div>
                            )}
                        />
                        <Controller
                            name='height'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.item}>
                                    <Text className={s.item__text} type="secondary">Высота</Text>
                                    <InputNumber className={s.item__input} addonAfter={width} min={500} max={50000} defaultValue={500} onChange={onChange} />
                                    <Text className={s.item__text_bottom} type="secondary">{minMaxValue}</Text>
                                </div>
                            )}
                        />
                        <Controller
                            name='tonnage'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <div className={s.item}>
                                    <Text className={s.item__text} type="secondary">Тоннаж</Text>
                                    <InputNumber className={s.item__input} addonAfter={height} defaultValue={0} onChange={onChange} />
                                </div>
                            )}
                        />
                    </div>
                </div>

                <div className={s.options}>
                    <div className={s.options__header}>
                        <Title className={s.options__title} level={5}>Осевая нагрузка</Title>
                        <div className={s.options__wrapper}>
                        <Radio.Group onChange={changeAxialLoad} defaultValue={0} value={axialLoad} className={classNames(s.options__group, {
                            [s.options__group_hidden]: isSwitch
                        })}>
                            <Radio value={0}>Тягач с полуприцепом</Radio>
                            <Radio value={1}>Фургон грузовой</Radio>
                        </Radio.Group>
                        <div className={classNames(s.options__info, {
                            [s.options__info_hidden]: !isSwitch
                        })}>
                            <Text className={s.options__text} type="secondary">Выключите этот параметр если требуется указать нагрузку на каждую ось отдельно</Text>
                            </div>
                        </div>
                    </div>
                    <div className={s.options__switch}>
                        <Switch defaultChecked={isSwitch} onChange={changeOptions} />
                        <Text className={s.options__text} type="secondary">Автоматически</Text>
                    </div>
                </div>

                <button type='submit'>{isSwitch ? `Check: ${isSwitch}` : `Check: ${isSwitch}`}</button>
            </form>
        </div>
    );
};