type PaginationOptions = {
    page?: number;
    limit?: number;
    search?: string
};


export const PaginationOptions = (options: PaginationOptions) => {
    const page = Number(options.page) || 1
    const limit = Number(options.limit) || 6
    const skip = (page - 1) * limit
    const search = options.search || ''

    return { page, limit, skip, search,  }
}