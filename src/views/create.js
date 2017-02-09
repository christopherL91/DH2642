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
    const modalTemplate = await loadTemplate('modal');

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
    const modalNode = container.querySelector('#modal');

    // Initial render
    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
        title: 'Receipt',
        menu: dinnerModel.getFullMenu() || {name: 'pending', cost: 0},
    });

    // Initial render
    dishesNode.innerHTML = Mustache.render(dishesTemplate, {
        dishes: dinnerModel.getAllDishes('starter'),
    });

    // Initial render
    modalNode.innerHTML = Mustache.render(modalTemplate, {
        name: 'kalle',
    });

    const update = (payload) => {
        const {type, arg} = payload;
        console.log({type, arg});
        switch(type) {
            case UPDATE_NUMBER_OF_GUESTS:
                numberOfGuests.innerHTML = dinnerModel.getNumberOfGuests();
                break;
            case RENDER_RECEIPT:
                console.log('fullmenu', dinnerModel.getFullMenu());
                receiptNode.innerHTML = Mustache.render(receiptTemplate, {
                    title: 'Receipt',
                    menu: dinnerModel.getFullMenu(),
                    total: dinnerModel.getTotalMenuPrice(),
                });
                break;
            case RENDER_DISHES:
                dishesNode.innerHTML = Mustache.render(dishesTemplate, {
                    numberOfGuests: dinnerModel.getNumberOfGuests(),
                    dishes: dinnerModel.getAllDishes('starter', arg),
                });
                break;
        }
    };

    dinnerModel.addObserver('createView', update);
    return {plusButton, minusButton, searchField};
};
