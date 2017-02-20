'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const template = await loadTemplate('notfound');
    container.innerHTML = Mustache.render(template);

    const update = payload => {};
    dinnerModel.addObserver('notfoundView', update);
    return {};
};
