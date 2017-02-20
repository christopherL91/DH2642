'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (error, dinnerModel) => {
    const template = await loadTemplate('error');
    document.body.innerHTML = Mustache.render(template, {
        title: 'Error',
        message: error.toString(),
    });
    console.error(error);

    const update = payload => {};
    dinnerModel.addObserver('errorView', update);
    return {};
};
