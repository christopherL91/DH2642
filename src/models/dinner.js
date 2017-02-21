'use strict';

import R from 'ramda';

import {
    UPDATE_NUMBER_OF_GUESTS,
    RENDER_RECEIPT,
    RENDER_DISHES,
} from '../constants.js';

// According to the spec
const COST_PER_INGREDIENT = 1;

export default class {
    constructor(api, numberOfGuests = 3) {
        this.numberOfGuests = numberOfGuests;
        this.api = api;
        this.observers = new Map(); // view -> update(arg)
        this.menu = {}; // type -> id
    }

    addObserver(key, value) {
        this.observers.set(key, value);
    }

    notifyObservers(arg) {
        this.observers.forEach((value, key) => {
            value(arg);
        });
    }

    setNumberOfGuests(numberOfGuests) {
        if(numberOfGuests > 0) {
            this.numberOfGuests = numberOfGuests;
            this.notifyObservers({type: UPDATE_NUMBER_OF_GUESTS});
        }
    }

    getNumberOfGuests() {
        return this.numberOfGuests;
    }

    getSelectedDish(type) {
        return this.menu[type];
    }

    // returns dish info for every
    // dish on menu.
    async getFullMenu() {
        const menuDishes = [];
        let total = 0;
        for(const [key, value] of Object.entries(this.menu)) {
            const dish = await this.getDish(value);
            const {cost} = this.getIngredients(dish);
            total += cost;
            menuDishes.push(Object.assign(dish, {cost}));
        }
        return {total, menuDishes};
    }

    // dish -> ingredients + cost
    getIngredients(dish) {
        const numberOfGuests = this.getNumberOfGuests();
        let total = 0;
        const ingredients = dish.extendedIngredients.map((ingredient) => {
            const cost = ingredient.amount * COST_PER_INGREDIENT;
            total += cost;
            return Object.assign(ingredient, {cost});
        });
        return Object.assign(ingredients, {cost: total});
    }

    async getAllIngredients() {
        const ingredients = [];
        for(const [key, value] of Object.entries(this.menu)) {
            const dish = await this.getDish(value);
            ingredients.push(this.getIngredients(dish));
        }
        return ingredients;
    }

    async addDishToMenu(id) {
        const {type} = await this.getDish(id);
        this.menu[type] = id;
        this.notifyObservers({type: RENDER_RECEIPT});
    }

    async removeDishFromMenu(id) {
        const {type} = await this.getDish(id);
        if(this.menu[type] === id) {
            delete this.menu[type];
        }
        this.notifyObservers({type: RENDER_RECEIPT});
    }

    async getAllDishes(type, query) {
        return this.api.query(type, query);
    }

    async getDish(id) {
        return this.api.recipeInfo(id);
    }
}
