import React from 'react'
import Templates from './Templates/Templates'
import Navigation from './Pagination/Pagination'
import { useGetCargoTemplate } from './hook/useGetCargoTemplate'

export const NewCargoTemplate = ({
  groupId,
  projectId
}: {
  groupId: string
  projectId: string
}) => {
  const { data, fetchNextPage, isLoading } = useGetCargoTemplate({
    groupId,
    templates: true
  })

  const changePage = async (page: number) => {
    await fetchNextPage({ pageParam: page - 1 })
  }

  const currentPage =
    data?.pageParams.at(data.pageParams.length - 1) !== undefined
      ? (data.pageParams.at(data.pageParams.length - 1) as number)
      : 0

  const Page = data?.pages.filter((el) => el.page === currentPage)[0]?.data

  if (isLoading) return <></>
  return (
    <>
      <Templates groupId={groupId} projectId={projectId} data={Page} />
      <Navigation
        currentPage={currentPage + 1}
        countItem={data?.pages[data.pages[0].page].itemCount}
        changePage={changePage}
      />
    </>
  )
}
