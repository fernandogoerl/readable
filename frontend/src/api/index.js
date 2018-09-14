const api = "http://localhost:3001"

let token = localStorage.token
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept' : "application/json",
    'Authorization' : token,
}

export const getAllCategories = async () => {
    const req = new Request(`${api}/categories`, { headers });
    const res = await fetch(req);
    const categories = await res.json().then(data => data.categories);
    return categories;
};

export const getAllPosts = async () => {
    const req = new Request(`${api}/posts`, { headers });
    const posts = await fetch(req).then(res => res.json())
    return posts;
};

export const getCategoryPosts = async (category) => {
    const req = new Request(`${api}/${category}/posts`, { headers });
    const posts = await fetch(req).then(res => res.json())
    return posts;
};

export const getSinglePost = async (id) => {
    const req = new Request(`${api}/posts/${id}`, { headers });
    const post = await fetch(req).then(res => res.json())
    return post;
};

export const getPostComments = async (id) => {
    const req = new Request(`${api}/posts/${id}/comments`, { headers });
    const post = await fetch(req).then(res => res.json())
    return post;
};

// export const update = (book, shelf) =>
//     fetch(`${api}/books/${book.id}`, {
//         method: 'PUT',
//         headers: {
//         ...headers,
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ shelf })
//     }).then(res => res.json())

// export const search = (query) =>
//     fetch(`${api}/search`, {
//         method: 'POST',
//         headers: {
//         ...headers,
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ query })
//     }).then(res => res.json())
//         .then(data => data.books)