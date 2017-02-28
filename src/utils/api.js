'use strict';

import R from 'ramda';

const encodeQueryData = (data) => {
    const ret = [];
    for(const [key, value] of Object.entries(data)) {
        if(value) {
            const val = value.replace(/\s/g, '+');
            const q = `${encodeURIComponent(key)}=${val}`;
            ret.push(q);
        }
    }
    return ret.join('&');
};

const getType = (dishTypes) => {
    if(dishTypes.includes('appetizer')) {
        return 'appetizer';
    } else if (dishTypes.includes('dessert')) {
        return 'dessert';
    } else {
        return 'main course';
    }
};

export default (client) => {
    const cache = new Map();

    const query = (type, query) => {
        const q = encodeQueryData({query, type});
        const url = `recipes/search/?${q}`;
        return client.get(url).then(response => {
            const {results} = response.data; // result from search
            const ids = R.pluck('id')(results);
            return Promise.all(ids.map(recipeInfo));
        }).catch(err => alert(err.toString()));
    };

    const recipeInfo = (id) => {
        if(cache.has(id)) {
            return Promise.resolve(cache.get(id));
        } else {
            const url = `recipes/${id}/information?includeNutrition=true`;
            return client.get(url)
                .then(response => {
                    const data = response.data;
                    const type = getType(data.dishTypes); // Monkey patch!
                    const instructions = data.instructions;
                    const shortInstructions = instructions? `${instructions.substring(0, 100)}...`: null;
                    const dish = Object.assign(response.data, {type, shortInstructions});
                    cache.set(id, dish);
                    return dish;
                }).catch(err => alert(err.toString()));
        }
    };
    return {query, recipeInfo};
};
