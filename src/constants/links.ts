import IconProjects from '../../public/svg/IconProjects'
import IconCargo from '../../public/svg/IconCargo'
import IconTransport from '../../public/svg/IconTransport'
import IconVisualization from '../../public/svg/IconVisualization'

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
    icon: IconProjects
  },
  {
    id: 2,
    text: 'Выбор груза',
    textSmall: 'Грузы',
    link: '/cargo',
    icon: IconCargo
  },
  {
    id: 3,
    text: 'Выбор транспорта',
    textSmall: 'Транспорт',
    link: '/transport',
    icon: IconTransport
  },
  {
    id: 4,
    text: 'Расчет загрузки',
    textSmall: 'Расчет',
    link: '/visualization',
    icon: IconVisualization
  }
]
