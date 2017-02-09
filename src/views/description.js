'use strict';

import Mustache from 'mustache';

import {loadTemplate} from '../utils/templates.js';

import {RENDER_RECEIPT} from '../constants.js';

export default async (id, container, dinnerModel) => {
    const descriptionTemplate = await loadTemplate('description');
    const receiptTemplate = await loadTemplate('receipt');
    const ingredientsTemplate = await loadTemplate('ingredients');

    // The selected dish based on the url
    const dish = dinnerModel.getDish(id);

    // Render description template
    container.innerHTML = Mustache.render(descriptionTemplate, {dish});

    const receiptNode = container.querySelector('#receipt');
    const ingredientsNode = container.querySelector('#ingredients');
    const addDishButton = container.querySelector('#addDishButton');
    const backButton = container.querySelector('#backButton');

    // Initial render
    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
        title: `Ingredients For ${dinnerModel.getNumberOfGuests()} people`,
        menu: dinnerModel.getFullMenu() || {name: 'pending', cost: 0},
        total: dinnerModel.getTotalMenuPrice(),
    });

    ingredientsNode.innerHTML = Mustache.render(ingredientsTemplate, {
        ingredients: dish.ingredients,
        total: dinnerModel.getTotalIngredientsPrice(id),
    });

    const update = (payload) => {
        const {type, arg} = payload;
        console.log({type, arg});
        switch(type) {
            case RENDER_RECEIPT:
                console.log('fullmenu', dinnerModel.getFullMenu());
                receiptNode.innerHTML = Mustache.render(receiptTemplate, {
                    title: 'Receipt',
                    menu: dinnerModel.getFullMenu(),
                    total: dinnerModel.getTotalMenuPrice(),
                });
                break;
        }
    };

    dinnerModel.addObserver('descriptionView', update);
    return {addDishButton, backButton};
};
