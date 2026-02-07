 export type PaginationOptionsType = {
    page?: number;
    limit?: number;
    search?: string;
    sort?:string;
    skip?:number 
};


export const PaginationOptions = (options: PaginationOptionsType) => {
    const page = Number(options.page) || 1
    const limit = Number(options.limit) || 6
    const skip = (page - 1) * limit
    const search = options.search || ''
    const sort  = options.sort || 'all'

    return { page, limit, skip, search,sort  }
}