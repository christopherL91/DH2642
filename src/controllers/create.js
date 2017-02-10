'use strict';

import {RENDER_DISHES} from '../constants.js';

export default (view, dinnerModel) => {
    // Initialize select options
    //$('#selectType').material_select();

    // When select options change
    $('#selectType').on('change', () => {
        const dishType = $('#selectType :selected').text();
        const arg = {dishType, filter: ''};
        dinnerModel.notifyObservers({type: RENDER_DISHES, arg});
    });

    view.plusButton.addEventListener('click', () => {
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() + 1);
    });

    view.minusButton.addEventListener('click', () => {
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() - 1);
    });

    view.searchField.addEventListener('input', (e) => {
        const filter = e.target.value;
        const dishType = $('#selectType :selected').text();
        const arg = {filter, dishType};
        dinnerModel.notifyObservers({type: RENDER_DISHES, arg});
    });
};
