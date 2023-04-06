import svgProjects from '../../public/svg/projects'
import svgCargo from '../../public/svg/cargo'
import svgTransport from '../../public/svg/transport'
import svgvisualization from '../../public/svg/visualization'

type LinkTypes = {
  id: number
  text: string
  textSmall: string
  link: string
  icon: any
}[]

export const LINKS: LinkTypes = [
  {
    id: 1,
    text: 'Выбор проекта',
    textSmall: 'Проекты',
    link: '/projects',
    icon: svgProjects
  },
  {
    id: 2,
    text: 'Выбор груза',
    textSmall: 'Грузы',
    link: '/cargo',
    icon: svgCargo
  },
  {
    id: 3,
    text: 'Выбор транспорта',
    textSmall: 'Транспорт',
    link: '/transport',
    icon: svgTransport
  },
  {
    id: 4,
    text: 'Расчет загрузки',
    textSmall: 'Расчет',
    link: '/visualization',
    icon: svgvisualization
  }
]
