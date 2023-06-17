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
    groupId
  })

  const changePage = async (page: number) => {
    await fetchNextPage({ pageParam: page - 1 })
  }

  const currentPage = () => {
    if (
      data?.pageParams.at(data.pageParams.length - 1) !== undefined &&
      data.pages[data.pages.length - 1].data.length > 0
    ) {
      return data.pageParams.at(data.pageParams.length - 1) as number
    } else {
      return 0
    }
  }

  const Page = data?.pages
    ?.filter((el) => el.page == currentPage())
    .reverse()[0]?.data

  const fetchPage = async () => {
    await fetchNextPage({
      pageParam: data?.pageParams[data?.pageParams.length - 1]
        ? data?.pageParams[data?.pageParams.length - 1]
        : 0
    })
  }

  if (isLoading) return <></>
  return (
    <>
      <Templates
        groupId={groupId}
        projectId={projectId}
        data={Page}
        fetchPage={fetchPage}
      />
      <Navigation
        currentPage={currentPage() ? currentPage() + 1 : 1}
        countItem={data?.pages[data.pages.length - 1]?.itemCount}
        changePage={changePage}
      />
    </>
  )
}
