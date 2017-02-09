'use strict';

import R from 'ramda';

import {
    UPDATE_NUMBER_OF_GUESTS,
    RENDER_RECEIPT,
    RENDER_DISHES
} from '../constants.js';

export default class {
    constructor(dishes, numberOfGuests = 3) {
        this.numberOfGuests = numberOfGuests;
        this.dishes = dishes;
        this.observers = new Map(); // view -> update(arg)
        this.menu = {}; // type -> id
    }

    addObserver(key, value) {
        this.observers.set(key, value);
        console.log('SIZE', this.observers.size);
    }

    notifyObservers(arg) {
        this.observers.forEach((value, key) => {
            console.log('About to call...', key);
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

    // returns id of dish
    getSelectedDish(type) {
        return this.menu[type];
    }

    // returns dish info for every
    // dish on menu.
    getFullMenu() {
        const menuDishes = [];
        const numberOfGuests = this.getNumberOfGuests();
        Object.keys(this.menu).forEach(key => {
            const dish = this.getDish(this.menu[key]);
            const cost = dish.ingredients.reduce((state, next) => {
                return state + next.price;
            }, 0) * numberOfGuests;
            menuDishes.push(Object.assign(dish, {cost}));
        });
        return menuDishes;
    }

    getAllIngredients() {
        let ingredients = [];
        Object.keys(this.menu).forEach(key => {
            const dish = this.getDish(this.menu[key]);
            ingredients = ingredients.concat(dish.ingredients);
        });
        return ingredients;
    }

    getTotalMenuPrice() {
        const ingredients = this.getAllIngredients();
        const numberOfGuests = this.getNumberOfGuests();
        let sum = 0;
        Object.keys(ingredients).forEach(key => {
            sum += ingredients[key].price * numberOfGuests;
        });
        return sum;
    }



    addDishToMenu(id) {
        this.menu[this.getDish(id).type] = id;
        console.log('MENU', this.menu);
        this.notifyObservers({type: RENDER_RECEIPT});
    }

    removeDishFromMenu(id) {
        const {type} = this.getDish(id);
        if(this.menu[type] === id) {
            delete this.menu[type];
        }
        this.notifyObservers({type: RENDER_RECEIPT});
    }

    getAllDishes(type, filter) {
        return this.dishes.filter((dish) => {
	        let found = true;
		    if(filter){
			    found = false;
			    dish.ingredients.forEach((ingredient) => {
				    if(ingredient.name.indexOf(filter) != -1) {
					    found = true;
				    }
			    });
			    if(dish.name.indexOf(filter) != -1) {
				    found = true;
			    }
		    }
	  	    return dish.type === type && found;
	    });
    }

    getDish(id) {
        for(let key in this.dishes){
            if(this.dishes[key].id == id) {
                return this.dishes[key];
            }
		}
    }
}
