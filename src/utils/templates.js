'use strict';

export const loadTemplate = (name) => {
    const BASE = 'src/partials';
    return fetch(`${BASE}/${name}.mustache`)
        .then(res => res.text());
};
