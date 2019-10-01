module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor: (rows, collection, field, singleOject) => {
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
  },
  slug: str => {
    return str.toLowerCase().replace(/[\s\W-]+/,'-');  //replace all spaces and non-word character with a dash
  }
};
