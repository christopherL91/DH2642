'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

export default async (container, dinnerModel) => {
    const printTemplate = await loadTemplate('print');

    const menu = await dinnerModel.getFullMenu();
    container.innerHTML = Mustache.render(printTemplate, {
        title: `My Dinner: ${dinnerModel.getNumberOfGuests()} people`,
        menu: menu.menuDishes.length !== 0? menu.menuDishes : {title: 'pending', cost: 0},
        total: menu.total,
    });

    const printButton = container.querySelector('#printButton');
    const backButton = container.querySelector('#backButton');

    const update = payload => {};
    dinnerModel.addObserver('printView', update);
    return {printButton, backButton};
};
