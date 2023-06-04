import { Button } from "antd";
import { FileOutlined } from '@ant-design/icons';
import { VisualizationCargo, VisualizationCarousel } from "@/component";

import { VisualizationMenuProps } from "./VisualizationMenu.types";
import s from './VisualizationMenu.module.scss'
import { VisualizationCollapse } from "@/component/VisualizationCollapse";

export function VisualizationMenu({ }: VisualizationMenuProps) {


    const testDataSudno = [
        {
            id: 1,
            title: 'Морской контейнер 40HC',
            size: '12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            text: 'Морской контейнер 2 шт.',
        },
        {
            id: 2,
            title: 'Морской контейнер 40HC',
            size: '12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            text: 'Морской контейнер 2 шт.',
        },
        {
            id: 3,
            title: 'Морской контейнер 40HC',
            size: '12039 х 2330 х 2693 мм, 26840 кг, 75.5 м3',
            text: 'Морской контейнер 2 шт.',
        }
    ]

    const testDataContainer = [
        {
            id: 1,
            title: 'Морской контейнер 1 / 2',
            total: 'Итого 228 кг, 37.1 м3, 40 шт',
            free: 'Свободно 260 кг, 38.4 м3'
        },
        {
            id: 2,
            title: 'Морской контейнер 1 / 2',
            total: 'Итого 228 кг, 37.1 м3, 40 шт',
            free: 'Свободно 260 кг, 38.4 м3'
        },
        {
            id: 3,
            title: 'Морской контейнер 1 / 2',
            total: 'Итого 228 кг, 37.1 м3, 40 шт',
            free: 'Свободно 260 кг, 38.4 м3'
        }
    ]

    const testDataPanel = [
        {
            id: 1,
            title: 'Максимальная длина',
            number: '12000 / 12039'
        },
        {
            id: 2,
            title: 'Максимальная высота',
            number: '2100 / 2693'
        },
        {
            id: 1,
            title: 'LDM',
            number: '7983 / 12039'
        },
    ]

    const testCargoRemove = [
        {
            id: 1,
            name: '2. Новое место - 2',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: 'red',
            type: 'Ящик',
        },
        {
            id: 2,
            name: '3. Новое место - 3',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: '#fff',
            type: 'Коробка',
        },
        {
            id: 3,
            name: '4. Новое место - 4',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: '#ece',
            type: 'Паллет',
        }
    ]

    const testCargo = [
        {
            id: 1,
            name: '2. Новое место - 2',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: '#ece',
            type: 'Ящик',
        },
        {
            id: 2,
            name: '3. Новое место - 3',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: '#fff',
            type: 'Коробка',
        },
        {
            id: 3,
            name: '4. Новое место - 4',
            size: '500 х 600 х 100 мм, 5 кг, 18 шт.',
            color: 'red',
            type: 'Паллет',
        }
    ]

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <VisualizationCarousel data={testDataSudno} color={false} />
                <VisualizationCarousel data={testDataContainer} color={true} />
                <VisualizationCollapse data={testDataPanel} />
                <VisualizationCargo dataCargo={testCargo} dataCargoRemove={testCargoRemove} />
                <Button className={s.list__button} icon={<FileOutlined />}>Сохранить в файл</Button>
            </div>
        </div>
    );
};