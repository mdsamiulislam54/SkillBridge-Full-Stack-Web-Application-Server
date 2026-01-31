import { prisma } from "../../../lib/prisma"
import { Category } from "../../type/category.type"

const createCategory = async (category: Category) => {
    return await prisma.category.create({ data: category })

}
const getCategory = async () => {
    return await prisma.category.findMany({
        orderBy:{
            sortOrder:"asc"
        }
    })

}

export const adminService = { createCategory,getCategory }