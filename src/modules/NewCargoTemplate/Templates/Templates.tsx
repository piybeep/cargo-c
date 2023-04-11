import React from 'react'
import s from './Templates.module.scss'
import TemplateEl from './TemplateEl/TemplateEl'

const Templates = () => {
  return (
    <div className={s.cont}>
        <TemplateEl/>
        <TemplateEl/>
        <TemplateEl/>
    </div>
  )
}

export default Templates