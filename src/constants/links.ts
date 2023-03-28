import { FileOutlined, BuildOutlined, CarOutlined, ControlOutlined } from '@ant-design/icons';

export const LINKS = [
    {
        id: 1,
        text: 'Выбор проекта',
        link: '/projects',
        icon: FileOutlined,
    },
    {
        id: 2,
        text: 'Выбор груза',
        link: '/cargo',
        icon: BuildOutlined,
    },
    {
        id: 3,
        text: 'Выбор транспорта',
        link: '/transport',
        icon: CarOutlined,
    },
    {
        id: 4,
        text: 'Расчет загрузки',
        link: '/visualization',
        icon: ControlOutlined,
    }
]