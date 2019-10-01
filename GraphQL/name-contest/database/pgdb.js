const humps = require('humps');
const _ = require('lodash');

const {slug} = require('../lib/util');

module.exports = pgPool => {
    const orderedFor = (rows, collection, field, singleOject) => {
        //return the row ordered for the collection
        const data = humps.camelizeKeys(rows);
        const inGroupsOfField = _.groupBy(data, field);
        return collection.map(element => {
            const elementArray = inGroupsOfField[element];
            if(elementArray) {
                return singleOject ? elementArray[0] : elementArray;
            }
            return singleOject ? {} : [];
        });
    };
    return {
        // getUserByApiKey(apiKey) {
        //     return pgPool.query(`
        //         select * from users where api_key=$1`, [apiKey]).then( res => {
        //             return humps.camelizeKeys(res.rows[0]);
        //     });
        // },
        getUsersByApiKeys(apiKeys) {
            return pgPool.query(`
                select * from users where api_key=ANY($1)`, [apiKeys]).then( res => {
                    return orderedFor(res.rows, apiKeys, 'apiKey', true);
            });
        },
        // getUserById(userId) {
        //     return pgPool.query(`
        //         select * from users where id=$1`, [userId]).then( res => {
        //             return humps.camelizeKeys(res.rows[0]);
        //     });
        // },
        getUsersByIds(userIds) {
            return pgPool.query(`
                select * from users where id=ANY($1)`, [userIds]).then( res => {
                    return orderedFor(res.rows, userIds, 'id', true);
            });
        },
        // getContests(user) {
        //     return pgPool.query(`
        //         select * from contests where created_by=$1`, [user.id]).then( res => {
        //             return humps.camelizeKeys(res.rows);
        //     });
        // },
        getContestsForUserIds(userIds) {
            return pgPool.query(`
                select * from contests where created_by=ANY($1)`, [userIds]).then( res => {
                    return orderedFor(res.rows, userIds, 'createdBy', false);
            });
        },
        // getNames(contest) {
        //     return pgPool.query(`
        //         select * from names where contest_id=$1`, [contest.id]).then( res => {
        //             return humps.camelizeKeys(res.rows);
        //     });
        // },
        getNamesForContestIds(contestIds) {
            return pgPool.query(`
                select * from names where contest_id=ANY($1)`, [contestIds]).then( res => {
                    return orderedFor(res.rows, contestIds, 'contestId', false);
            });
        },
        /*
        1) Create view in PostGreSQL

        Create view total_votes_by_name as
         select id as name_id,
         (select count(up) from votes v where v.name_id=n.id and up=true) as up,
         (select count(up) from votes v where v.name_id=n.id and up=false) as down
        from names n;

        2) Query in GraphQL
        query MyContests {
            me(key: "4242") {
                id
                email
                fullName
                contests {
                title
                names {
                    label
                    createdBy {
                    fullName
                    }
                totalVotes {
                    up
                    down
                }
                }
                }
            }
            }
        */
        getTotalVotesByNameIds(nameIds) {
            return pgPool.query(`
                select name_id, up, down from total_votes_by_name where name_id=ANY($1)`, [nameIds]).then( res => {
                    return orderedFor(res.rows, nameIds, 'nameId', true);
            });
        },
        //Mutation
        addNewContest({apiKey, title, description}) {
            return pgPool.query(`
                insert into contests(code, title, description, created_by) values ($1, $2, $3,
                    (select id from users where api_key=$4))
                returning *
            `, [slug(title), title, description, apiKey]).then(res => {
                return humps.camelizeKeys(res.rows[0]);
            });
        },
        //Union
        getActivitiesForUserIds(userIds) {
            return pgPool.query(`
                select created_by, created_at, label, '' as title, 'name' as activity_type
                from names where created_by=ANY($1)
                union
                select created_by, created_at, '' as label, title, 'contest' as activity_type
                from contests where created_by=ANY($1)`, [userIds]).then( res => {
                    return orderedFor(res.rows, userIds, 'createdBy', false);
            });
        },
    };
}