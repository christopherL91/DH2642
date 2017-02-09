'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const printTemplate = await loadTemplate('print');

    container.innerHTML = Mustache.render(printTemplate, {
        title: `My Dinner: ${dinnerModel.getNumberOfGuests()} people`,
        menu: dinnerModel.getFullMenu() || {name: 'pending', cost: 0},
        total: dinnerModel.getTotalMenuPrice(),
    });

    const printButton = container.querySelector('#printButton');
    const backButton = container.querySelector('#backButton');

    const update = (payload) => {};
    dinnerModel.addObserver('printView', update);
    return {printButton, backButton};
};
