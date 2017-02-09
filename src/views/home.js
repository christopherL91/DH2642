'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const template = await loadTemplate('home');
    container.innerHTML = Mustache.render(template, {
        title: 'Home',
    });

    const update = (payload) => {};
    dinnerModel.addObserver('homeView', update);
    return {};
};
