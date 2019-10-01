const { orderedFor } = require('../lib/util');

module.exports = mPool => {
    return {
        // getCounts(user, countsField) {
        //     return mPool.collection('users')
        //                 .findOne({ userId: user.id })
        //                 .then(userCounts => userCounts[countsField]);
        // },
        //use dataLoader to void query multiplely
        getUsersByIds(userIds) {
            return mPool.collection('users')
                        .find({ userId: { $in: userIds } })
                        .toArray()     // turn to a promise by using toArray()
                        .then( rows => {
                            return orderedFor(rows, userIds, 'userId', true)
                        })
        }
    };
};