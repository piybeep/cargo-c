import React from 'react'
import Templates from './Templates/Templates'
import Navigation from './Pagination/Pagination'

export const NewCargoTemplate = ({groupId,projectId}:{groupId:string,projectId:string}) => {
  return (
    <>
      <Templates groupId={groupId} projectId={projectId}/>
      <Navigation/>
    </>
  )
}
