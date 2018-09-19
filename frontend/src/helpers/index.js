const compare = (data1, data2, orderBy) => {
    switch(orderBy) {
        case 'author' :
        case 'title' :
        case 'timestamp' :
            if(data1[orderBy] < data2[orderBy]) { return -1; }
            else if(data1[orderBy] > data2[orderBy]) { return 1; }
            else { return data2.voteScore - data1.voteScore; }
        default :
            return data2.voteScore - data1.voteScore;

    }
};

const parseOrder = (str) => (str.substring(7));

export const orderPosts = (posts, orderBy) =>
    (posts.sort((post1, post2) =>
        compare(post1, post2, parseOrder(orderBy))));

export const orderComments = (comments, orderBy) =>
    (comments.sort((comment1, comment2) =>
        compare(comment1, comment2, orderBy)));

const timeConverter = (timestamp) => (new Date(timestamp));

export const getMetaInfo = (data) => (`Posted on ${timeConverter(data.timestamp).toDateString()} at ${timeConverter(data.timestamp).getHours()}:${timeConverter(data.timestamp).getMinutes()} by ${data.author}`)