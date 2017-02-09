'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const template = await loadTemplate('about');
    container.innerHTML = Mustache.render(template, {
        title: 'About',
    });

    const update = (payload) => {};
    dinnerModel.addObserver('aboutView', update);
    return {};
};
