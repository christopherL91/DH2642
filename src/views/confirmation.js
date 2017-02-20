'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const confirmationTemplate = await loadTemplate('confirmation');

    // Initial render
    const menu = await dinnerModel.getFullMenu();
    container.innerHTML = Mustache.render(confirmationTemplate, {
        title: `My Dinner: ${dinnerModel.getNumberOfGuests()} people`,
        menu: menu.menuDishes.length !== 0? menu.menuDishes : {title: 'pending', cost: 0},
        total: menu.total,
    });

    const backButton = container.querySelector('#backButton');

    const update = payload => {};
    dinnerModel.addObserver('confirmationView', update);
    return {backButton};
};
