const compare = (post1, post2, orderBy) => {
    switch(orderBy) {
        case 'author' :
        case 'title' :
            if(post1[orderBy] < post2[orderBy]) { return -1; }
            else if(post1[orderBy] > post2[orderBy]) { return 1; }
            else { return post2.voteScore - post1.voteScore; }
        default :
            return post2.voteScore - post1.voteScore;

    }
};

export const order = (posts, orderBy) => (posts.sort((post1, post2) => compare(post1, post2, orderBy)));