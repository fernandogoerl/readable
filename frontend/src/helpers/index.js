const compare = (post1, post2, orderBy) => {
    switch(orderBy) {
        case 'author' :
        case 'title' :
        case 'timestamp' :
            if(post1[orderBy] < post2[orderBy]) { return -1; }
            else if(post1[orderBy] > post2[orderBy]) { return 1; }
            else { return post2.voteScore - post1.voteScore; }
        default :
            return post2.voteScore - post1.voteScore;

    }
};

const parseOrder = (str) => (str.substring(7));

export const order = (posts, orderBy) =>
    (posts.sort((post1, post2) =>
        compare(post1, post2, parseOrder(orderBy))));

export const timeConverter = (timestamp) => (new Date(timestamp));