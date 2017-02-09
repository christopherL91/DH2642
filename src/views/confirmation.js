'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const confirmationTemplate = await loadTemplate('confirmation');

    container.innerHTML = Mustache.render(confirmationTemplate, {
        title: `My Dinner: ${dinnerModel.getNumberOfGuests()} people`,
        menu: dinnerModel.getFullMenu() || {name: 'pending', cost: 0},
        total: dinnerModel.getTotalMenuPrice(),
    });

    const backButton = container.querySelector('#backButton');

    const update = (payload) => {};
    dinnerModel.addObserver('confirmationView', update);
    return {backButton};
};
