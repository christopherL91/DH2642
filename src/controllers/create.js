'use strict';

import {RENDER_DISHES} from '../constants.js';

export default (view, dinnerModel) => {
    view.plusButton.addEventListener('click', () => {
        console.log('add guest');
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() + 1);
    });

    view.minusButton.addEventListener('click', () => {
        console.log('remove guest');
        dinnerModel.setNumberOfGuests(dinnerModel.getNumberOfGuests() - 1);
    });

    view.searchField.addEventListener('input', (e) => {
        const filter = e.target.value;
        dinnerModel.notifyObservers({type: RENDER_DISHES, arg: filter});
    });

    // Install modal
    $('#modal').modal({
    dismissible: false,
    ready: (modal, trigger) => {
        const {id} = trigger[0].dataset;
        console.log(id);
        const confirmButton = $('#confirm-modal');
        confirmButton.one('click', () => {
            dinnerModel.addDishToMenu(id);
        });
    },
    complete: () => {
        console.log('closed');
    }
    });
};
