import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'
import style from './TemplateEl/TemplateEl.module.scss'
import { useSwipe } from '@/hook/useSwipe'
import { useRemoveCargo } from '@/modules/Cargo/Group/hook/useRemoveCargo'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TemplateProps } from './type'

const Templates: React.FC<TemplateProps> = ({
  groupId,
  projectId,
  data,
  fetchPage
}) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(
    style.cont
  )

  const { mutateAsync, isLoading } = useRemoveCargo({
    groupId,
    template: true
  })

  const deleteCargo = (cargoId: string) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этот транспорт?',
      icon: <ExclamationCircleOutlined />,
      onCancel: () => close(),
      onOk: async () => {
        await mutateAsync({ groupId, cargoId })
        await fetchPage()
        close()
      },
      maskClosable: true,
      okText: 'Да',
      cancelText: 'Отмена',
      okButtonProps: {
        loading: isLoading
      }
    })
  }

  return (
    <div className={s.cont}>
      {data?.map((el, ind) => (
        <TemplateEl
          handleTouchEnd={handleTouchEnd}
          handleTouchMove={handleTouchMove}
          handleTouchStart={handleTouchStart}
          key={ind}
          el={el}
          deleteCargo={deleteCargo}
          groupId={groupId}
          projectId={projectId}
        />
      ))}
    </div>
  )
}

export default Templates
