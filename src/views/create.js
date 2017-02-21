'use strict';

import Mustache from 'mustache';
import Spinner from 'spin.js';

import {loadTemplate} from '../utils/templates.js';
import {
    UPDATE_NUMBER_OF_GUESTS,
    RENDER_RECEIPT,
    RENDER_DISHES,
} from '../constants.js';

const opts = {
    lines: 13, // The number of lines to draw
    length: 28, // The length of each line
    width: 14, // The line thickness
    radius: 42, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000', // #rgb or #rrggbb or array of colors
    opacity: 0.25, // Opacity of the lines
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    speed: 1, // Rounds per second
    trail: 48, // Afterglow percentage
    fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: true, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    position: 'absolute', // Element positioning
};

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
    const spinnerNode = container.querySelector('#spinner');

    // Spinning wheel
    const spinner = new Spinner(opts).spin(spinnerNode); //.spinn(node) or .stop()

    // Initial render
    const menu = await dinnerModel.getFullMenu();
    receiptNode.innerHTML = Mustache.render(receiptTemplate, {
        title: 'Receipt',
        menu: menu.menuDishes.length !== 0? menu.menuDishes : {title: 'pending', cost: 0},
        total: menu.total,
    });

    // Initial render
    const dishType = optionsNode.options[optionsNode.options.selectedIndex].text;
    dinnerModel.getAllDishes(dishType)
        .then(dishes => {
            spinner.stop();
            dishesNode.innerHTML = Mustache.render(dishesTemplate, {
                dishes,
            });
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
                spinner.spin(spinnerNode);
                dinnerModel.getAllDishes(arg.dishType, arg.query)
                .then(dishes => {
                    spinner.stop();
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
