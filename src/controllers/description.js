'use strict';

export default (view, dinnerModel) => {
    view.addDishButton.addEventListener('click', (e) => {
        const {id} = e.srcElement.dataset;
        dinnerModel.addDishToMenu(id);
        history.back();
    });

    view.backButton.addEventListener('click', () => {
        history.back();
    });
};
