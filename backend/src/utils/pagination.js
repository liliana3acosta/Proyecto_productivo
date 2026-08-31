export const getPaginationParams = (query) => {

    const page = Math.max(parseInt(query.page) || 1, 1);
    const limit = Math.max(parseInt(query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    return { page, limit, skip };

};

export const buildPaginatedResponse = (data, total, page, limit) => {

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };

};
