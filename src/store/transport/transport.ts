import { create } from "zustand";
import { transportProps } from "./transport.types";

export const useTransport = create<transportProps>()(set => ({
    transport: [
        {
            id: 0,
            title: 'Морской контейнер 40НС',
            text: 'Морской контейнер 12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            icon: ''
        },
        {
            id: 1,
            title: 'Грузовой автомобиль 87м3',
            text: 'Грузовой автомобиль 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            icon: ''
        },
        {
            id: 2,
            title: 'Новый транспорт - 1',
            text: 'Складская площадь 6000 х 2000 х 1200 мм, 5000 кг, 200 м2',
            icon: ''
        }
    ],
    setAddTransport: (data) => set(state => {
        const newTransport = { id: state.transport.length, title: data.title, text: data.text, icon: '' }

        return { transport: [...state.transport, newTransport] }
    }),
    setRemoveTransport: (id) => set(state => {
        return { transport: state.transport.filter(current => current.id != id) }
    })
}))