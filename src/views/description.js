'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

import {RENDER_RECEIPT} from '../constants.js';

export default async (id, container, dinnerModel) => {
    const descriptionTemplate = await loadTemplate('description');
    const receiptTemplate = await loadTemplate('receipt');
    const ingredientsTemplate = await loadTemplate('ingredients');

    // The selected dish based on the url
    const dish = await dinnerModel.getDish(id);

    // Render description template
    container.innerHTML = Mustache.render(descriptionTemplate, {dish});

    const receiptNode = container.querySelector('#receipt');
    const ingredientsNode = container.querySelector('#ingredients');
    const addDishButton = container.querySelector('#addDishButton');
    const backButton = container.querySelector('#backButton');

    // Initial render
    const menu = await dinnerModel.getFullMenu();
    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
        title: `Ingredients For ${dinnerModel.getNumberOfGuests()} people`,
        menu: menu.menuDishes.length !== 0? menu : {title: 'pending', cost: 0},
        total: menu.total,
    });

    ingredientsNode.innerHTML = Mustache.render(ingredientsTemplate, {
        ingredients: dinnerModel.getIngredients(dish),
        total: ingredients.cost,
    });

    const update = payload => {
        const {type, arg} = payload;
        console.log({type, arg});
        switch(type) {
            case RENDER_RECEIPT:
                dinnerModel.getFullMenu()
                .then(menu => {
                    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
                        title: `Ingredients For ${dinnerModel.getNumberOfGuests()} people`,
                        menu: menu.menuDishes.length !== 0? menu : {title: 'pending', cost: 0},
                        total: menu.total,
                    });
                });
                break;
        }
    };

    dinnerModel.addObserver('descriptionView', update);
    return {addDishButton, backButton};
};
