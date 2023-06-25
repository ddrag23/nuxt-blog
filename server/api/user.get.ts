import { SortType } from './../../node_modules/vue3-easy-data-table/types/main.d';
import { Prisma } from "@prisma/client"

export interface PaginationQuery {
  skip: number
  take: number
  sortBy: string
  sortType: Prisma.SortOrder
}
export class Pagination implements PaginationQuery {
  skip: number
  take: number
  sortBy: string
  sortType: Prisma.SortOrder
  constructor(skip: number, take: number, sortBy: string, sortType: Prisma.SortOrder) {
    this.skip = skip
    this.take = take
    this.sortBy = sortBy
    this.sortType = sortType
  }
}
export default defineEventHandler(async (event) => {
  const pq = getQuery(event)
  let start = +pq.skip! > 1 ? (+pq.skip! * +pq.take!) - +pq.take! : 0
  const totalData = await event.context.prisma.user.count()
  let pages = Math.ceil(totalData / +pq.take!)
  const data = await event.context.prisma.user.findMany({
    take: +pq.take!, skip: start, orderBy: {
      [pq.sortBy! as string]: pq.sortType
    }, include: { role: true }
  })
  const currentPage = (start / +pq.take!) + 1
  return {
    data,
    pages,
    currentPage,
    totalData,
  }
})
