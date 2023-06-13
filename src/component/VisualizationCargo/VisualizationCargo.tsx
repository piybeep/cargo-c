import Image from 'next/image';
import { Typography } from 'antd';

import testCargo from '../../../public/img/testCargo.png'

import box from '../../../public/svg/cargo/box.svg'
import carton from '../../../public/svg/cargo/carton.svg'
import pallet from '../../../public/svg/cargo/pallet.svg'

import { VisualizationCargoProps } from './VisualizationCargo.types';
import s from './VisualizationCargo.module.scss'

export function VisualizationCargo({ dataCargo, dataCargoRemove }: VisualizationCargoProps) {
    const { Title, Text } = Typography;

    const Cargo = (data: any) => (
        <div className={s.cargo}>
            <div className={s.cargo__img} style={{backgroundColor: data.data.color}}>
                <Image className={s.cargo__icon} src={data.data.type === 'Ящик' ? box : data.data.type === 'Коробка' ? carton : pallet} alt={'Иконка'}/>
            </div>
            <div className={s.cargo__list}>
                <Text>{data.data.name}</Text>
                <Text type="secondary">{data.data.size}</Text>
                <div className={s.cargo__menu}>
                    <svg className={s.cargo__svg} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.88156 0.714657C6.64621 0.575583 6.35382 0.575583 6.11847 0.714657L0.686686 3.92435C0.458332 4.05928 0.318233 4.3048 0.318233 4.57004C0.318233 4.83528 0.458332 5.0808 0.686686 5.21574L6.11847 8.42543C6.35382 8.5645 6.64621 8.5645 6.88156 8.42543L12.3133 5.21574C12.5417 5.0808 12.6818 4.83528 12.6818 4.57004C12.6818 4.3048 12.5417 4.05928 12.3133 3.92435L6.88156 0.714657ZM6.50002 6.90858L2.54249 4.57004L6.50002 2.23151L10.4575 4.57004L6.50002 6.90858ZM1.44978 7.13404C1.09317 6.92332 0.633261 7.04158 0.422538 7.39819C0.211816 7.75479 0.330079 8.2147 0.686686 8.42543L6.11847 11.6351C6.35382 11.7742 6.64621 11.7742 6.88156 11.6351L12.3133 8.42543C12.67 8.2147 12.7882 7.75479 12.5775 7.39819C12.3668 7.04158 11.9069 6.92332 11.5503 7.13404L6.50002 10.1183L1.44978 7.13404Z" fill="black" fillOpacity="1" />
                    </svg>

                    <svg className={s.cargo__svg} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.24994 1.40332C7.24994 0.989107 6.91416 0.65332 6.49994 0.65332C6.08573 0.65332 5.74994 0.989107 5.74994 1.40332V5.75014H1.4032C0.988985 5.75014 0.653198 6.08593 0.653198 6.50014C0.653198 6.91436 0.988985 7.25014 1.4032 7.25014H5.74994V11.597C5.74994 12.0112 6.08573 12.347 6.49994 12.347C6.91416 12.347 7.24994 12.0112 7.24994 11.597V7.25014H11.5968C12.0111 7.25014 12.3468 6.91436 12.3468 6.50014C12.3468 6.08593 12.0111 5.75014 11.5968 5.75014H7.24994V1.40332Z" fill="black" fillOpacity="1" />
                    </svg>

                    <svg className={s.cargo__svg} width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.54175 4.5498H7.93341M1.54175 4.5498L3.16675 2.9248M1.54175 4.5498L3.16675 6.1748M13.4584 8.4498H7.06675M13.4584 8.4498L11.8334 10.0748M13.4584 8.4498C13.4584 8.4498 12.468 7.45941 11.8334 6.8248" stroke="black" strokeOpacity="1" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <svg className={s.cargo__svg} width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.54993 13.4585V7.06683M4.54993 13.4585L2.92493 11.8335M4.54993 13.4585L6.17493 11.8335M8.44993 1.54183V7.9335M8.44993 1.54183L10.0749 3.16683M8.44993 1.54183C8.44993 1.54183 7.45953 2.53223 6.82493 3.16683" stroke="black" strokeOpacity="1" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )

    const CargoRemove = (data: any) => (
        <div className={s.cargo}>
            <div className={s.cargo__img} style={{backgroundColor: data.data.color}}>
                <Image className={s.cargo__icon} src={data.data.type === 'Ящик' ? box : data.data.type === 'Коробка' ? carton : pallet} alt={'Иконка'}/>
            </div>
            <div className={s.cargo__list}>
                <Text>{data.data.name}</Text>
                <Text type="secondary">{data.data.size}</Text>
                <Text type="danger">Превышена ширина груза</Text>
            </div>
        </div>
    )

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <Title className={s.title} level={5}>Исключены из расчета</Title>
                {dataCargoRemove.map((current: any) => (
                    <CargoRemove key={current.id} data={current} />
                ))}
            </div>

            <div className={s.list}>
                <div className={s.header}>
                    <Title className={s.title} level={5}>Название компании - 1</Title>
                    <Text type="secondary">228 кг, 40 шт</Text>
                </div>
                {dataCargo.map((current: any) => (
                    <Cargo key={current.id} data={current} />
                ))}
            </div>
        </div>
    );
};