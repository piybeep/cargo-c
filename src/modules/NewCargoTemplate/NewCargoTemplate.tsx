import React from 'react'
import Templates from './Templates/Templates'
import Navigation from './Pagination/Pagination'

export const NewCargoTemplate = ({groupId}:{groupId:string}) => {
  return (
    <>
      <Templates groupId={groupId}/>
      <Navigation/>
    </>
  )
}
