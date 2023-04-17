import { create } from "zustand";
import { transportTemplateProps } from "./transportTemplate.types";

import Ship from "../../../public/svg/ship";
import Car from "../../../public/svg/car";
import Pallet from "../../../public/svg/pallet";
import Stock from "../../../public/svg/stock";

export const useTransportTemplate = create<transportTemplateProps>()(set => ({
    transportTemplate: [
        {
            id: 0,
            title: 'Морской контейнер 40НС',
            text: 'Морской контейнер 12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            icon: Ship
        },
        {
            id: 1,
            title: 'Грузовой автомобиль 87м3',
            text: 'Грузовой автомобиль 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            icon: Car
        },
        {
            id: 2,
            title: 'Новый транспорт - 1',
            text: 'Складская площадь 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            icon: Pallet
        },
        {
            id: 3,
            title: 'Новый транспорт - 1',
            text: 'Складская площадь 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            icon: Stock
        }
    ],
    setAddTransportTemplate: (data) => set(state => {
        const newTransport = { id: state.transportTemplate.length, title: data.title, text: data.text, icon: '' }

        return { transportTemplate: [...state.transportTemplate, newTransport] }
    }),
    setRemoveTransportTemplate: (id) => set(state => {
        return { transportTemplate: state.transportTemplate.filter(current => current.id != id) }
    })
}))