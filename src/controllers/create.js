'use strict';

import Rx from 'rx-dom';

import {RENDER_DISHES} from '../constants.js';

export default (view, dinnerModel) => {

    // When select options change
    $('#selectType').on('change', () => {
        const dishType = $('#selectType :selected').text();
        const arg = {dishType, query: ''};
        dinnerModel.notifyObservers({type: RENDER_DISHES, arg});
    });

    view.plusButton.addEventListener('click', () => {
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() + 1);
    });

    view.minusButton.addEventListener('click', () => {
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() - 1);
    });

    const throttledInput = Rx.DOM.input(view.searchField)
        .pluck('target','value')
        .debounce(500)
        .distinctUntilChanged();

    throttledInput.subscribe(query => {
        const dishType = $('#selectType :selected').text();
        const arg = {query, dishType};
        dinnerModel.notifyObservers({type: RENDER_DISHES, arg});
    });
};
