import { create } from "zustand";
import { transportProps } from "./transport.types";

import Ship from "../../../public/svg/IconShip";
import Car from "../../../public/svg/IconCar";
import Pallet from "../../../public/svg/IconPallet";
import Stock from "../../../public/svg/IconStock";

export const typeIcons:Record<string, any> = {
    'Грузовой автобомиль': Car,
    'Морской контейнер': Ship,
    'Паллет': Pallet,
    'Складская площадь': Stock,
}

export const useTransport = create<transportProps>()((set, get) => ({
    transport: [
        {
            id: 0,
            title: 'Морской контейнер 40НС',
            text: 'Морской контейнер 12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            type: 'Морской контейнер',
        },
        {
            id: 1,
            title: 'Грузовой автомобиль 87м3',
            text: 'Грузовой автомобиль 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            type: 'Грузовой автобомиль',
        },
        {
            id: 2,
            title: 'Новый транспорт - 1',
            text: 'Паллет 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            type: 'Паллет',
        },
        {
            id: 3,
            title: 'Новый транспорт - 1',
            text: 'Складская площадь 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            type: 'Складская площадь',
        }
    ],
    getIcon: (id) => {
        return typeIcons[get().transport.find(item => item.id === id)?.type as string]
    },
    setAddTransport: (data) => set(state => {
        const newTransport = { id: state.transport.length, title: data.title, text: data.text, type: 'Паллет' }

        return { transport: [...state.transport, newTransport] }
    }),
    setRemoveTransport: (id) => set(state => {
        return { transport: state.transport.filter(current => current.id != id) }
    })
}))