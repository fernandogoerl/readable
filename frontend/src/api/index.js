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
    const comments = await fetch(req).then(res => res.json())
    return comments;
};

export const getSingleComment = async (id) => {
    const req = new Request(`${api}/comments/${id}`, { headers });
    const comment = await fetch(req).then(res => res.json())
    return comment;
};

export const votePost = async (data) => {
    const req = new Request(`${api}/posts/${data.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: data.option })
    });
    const post = await fetch(req).then(res => res.json())
    return post;
};

export const voteComment = async (data) => {
    const req = new Request(`${api}/comments/${data.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ option: data.option })
    });
    const comment = await fetch(req).then(res => res.json())
    return comment;
};

export const addNewPost = async (data) => {
    const req = new Request(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data })
    });
    const post = await fetch(req).then(res => res.json())
    return post;
};

// POST /posts
//       USAGE:
//         Add a new post

//       PARAMS:
//         id - UUID should be fine, but any unique id will work
//         timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//         title - String
//         body - String
//         author - String
//         category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

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