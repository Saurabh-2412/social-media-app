export const orderPostByDate = (posts) => {
    return posts?.slice().sort((a, b) => b.createdDate.localeCompare(a.createdDate));
};