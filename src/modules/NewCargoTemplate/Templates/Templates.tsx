import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'
import style from './TemplateEl/TemplateEl.module.scss'
import { useSwipe } from '@/hook/useSwipe'
import { useGetAllCargo } from '@/modules/Cargo/Group/hook/useGetAllCargo'
import { useRemoveCargo } from '@/modules/Cargo/Group/hook/useRemoveCargo'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const Templates = ({ groupId,projectId }: { groupId: string,projectId:string }) => {
  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useSwipe(
    style.cont
  )

  const { mutateAsync, isLoading } = useRemoveCargo({ groupId })

  const deleteCargo = (cargoId: string) => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить этот транспорт?',
      icon: <ExclamationCircleOutlined />,
      onCancel: () => close(),
      onOk: async () => {
        await mutateAsync({ groupId, cargoId })
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

  const { data } = useGetAllCargo({ groupId, templates: true })

  return (
    <div className={s.cont}>
      {data &&
        'data' in data &&
        data?.data?.map((el, ind) => (
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
