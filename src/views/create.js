'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';
import {
    UPDATE_NUMBER_OF_GUESTS,
    RENDER_RECEIPT,
    RENDER_DISHES
} from '../constants.js';

export default async (container, dinnerModel) => {
    const createTemplate = await loadTemplate('create');
    const receiptTemplate = await loadTemplate('receipt');
    const dishesTemplate = await loadTemplate('dishes');

    // Render create template
    container.innerHTML = Mustache.render(createTemplate, {
        numberOfGuests: dinnerModel.getNumberOfGuests(),
    });

    const plusButton = container.querySelector('#plusButton');
    const minusButton = container.querySelector('#minusButton');
    const numberOfGuests = container.querySelector('#numberOfGuests');
    const searchField = container.querySelector('#search');
    const receiptNode = container.querySelector('#receipt');
    const dishesNode = container.querySelector('#dishes');
    const optionsNode = container.querySelector('#selectType');

    // Initial render
    const menu = await dinnerModel.getFullMenu();
    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
        title: 'Receipt',
        menu: menu.menuDishes.length !== 0? menu.menuDishes : {title: 'pending', cost: 0},
        total: menu.total,
    });

    // Initial render
    const dishType = optionsNode.options[optionsNode.options.selectedIndex].text;
    dishesNode.innerHTML = Mustache.render(dishesTemplate, {
        dishes: await dinnerModel.getAllDishes(dishType),
    });

    const update = payload => {
        const {type, arg} = payload;
        console.log({type, arg});
        switch(type) {
            case UPDATE_NUMBER_OF_GUESTS:
                numberOfGuests.innerHTML = dinnerModel.getNumberOfGuests();
                break;
            case RENDER_RECEIPT:
                dinnerModel.getFullMenu()
                .then(menu => {
                    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
                        title: 'Receipt',
                        menu: menu.menuDishes.length !== 0? menu.menuDishes : {title: 'pending', cost: 0},
                        total: menu.total,
                    });
                });
                break;
            case RENDER_DISHES:
                dinnerModel.getAllDishes(arg.dishType, arg.query)
                .then(dishes => {
                    dishesNode.innerHTML = Mustache.render(dishesTemplate, {
                        numberOfGuests: dinnerModel.getNumberOfGuests(),
                        dishes,
                    });
                });
                break;
        }
    };

    dinnerModel.addObserver('createView', update);
    return {plusButton, minusButton, searchField, optionsNode};
};
