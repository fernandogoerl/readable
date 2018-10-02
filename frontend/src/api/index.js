const api = "http://localhost:3001"

let token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept' : "application/json",
    'Authorization' : token,
}


//FETCH

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


//VOTE

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


//CREATE

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

export const addNewComment = async (data) => {
    const req = new Request(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data })
    });
    const comment = await fetch(req).then(res => res.json())
    return comment;
};


//DELETE

export const disablePost = async (id) => {
    const req = new Request(`${api}/posts/${id}`, {
        method: "DELETE",
        headers: {
        ...headers,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    });
    const post = await fetch(req).then(res => res.json());
    return post;
};

export const disableComment = async (id) => {
    const req = new Request(`${api}/comments/${id}`, {
        method: "DELETE",
        headers: {
        ...headers,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    });
    const comment = await fetch(req).then(res => res.json());
    return comment;
};


//EDIT

export const editPost = async (data) => {
    const req = new Request(`${api}/posts/${data.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: data.title, body: data.body })
    });
    const post = await fetch(req).then(res => res.json())
    return post;
};

export const editComment = async (data) => {
    const req = new Request(`${api}/comments/${data.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ body: data.body, timestamp: data.timestamp })
    });
    const comment = await fetch(req).then(res => res.json())
    return comment;
};
