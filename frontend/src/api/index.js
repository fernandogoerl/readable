const api = "http://localhost:3001"

let token = localStorage.token
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept' : "application/json",
    'Authorization' : token,
}

// export const getAllCategories = () => (
//     fetch(`${api}/categories`, { headers })
//         .then(res => res.json())
//         .then(data => data.categories));

// export const getAllPosts = () => (
//     fetch(`${api}/posts`, { headers })
//         .then(res => res.json())
//         .then(data => data));

// export const getCategoryPosts = category => (
//     fetch(`${api}/${category}/posts`, { headers })
//         .then(res => res.json())
//         .then(data => data.posts));

export const getAllCategories = async () => {
    const req = new Request(`${api}/categories`, { headers });
    const res = await fetch(req);

    const posts = await res.json().then(data => data.categories);
    return posts;
};

export const getAllPosts = async () => {
    const req = new Request(`${api}/posts`, { headers });
    const res = await fetch(req);

    const posts = await res.json().then(data => data);
    return posts;
};

export const getCategoryPosts = async (category) => {
    const req = new Request(`${api}/${category}/posts`, { headers });
    const res = await fetch(req);
    console.log(getCategoryPosts);
    console.log(res);

    const posts = await res.json().then(data => data);
    return posts;
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