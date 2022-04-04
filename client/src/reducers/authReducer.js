export default function (state = null, action) {
    // console.log(action)
    switch (action.type) {
        case 'fetch_user':
            return action.payload || false;
        default:
            return state;
    }
}