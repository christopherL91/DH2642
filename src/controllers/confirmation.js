'use strict';

export default (view, dinnerModel) => {
    view.backButton.addEventListener('click', () => {
        history.back();
    });
};
