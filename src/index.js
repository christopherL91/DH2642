'use strict';

import 'babel-polyfill';

import axios from 'axios';

import page from 'page';

import {loadTemplate} from './utils/templates.js';

// Model
import DinnerModel from './models/dinner.js';

// Views
import createView from './views/create.js';
import descriptionView from './views/description.js';
import confirmationView from './views/confirmation.js';
import aboutView from './views/about.js';
import homeView from './views/home.js';
import printView from './views/print.js';
import notfoundView from './views/notfound.js';
import errorView from './views/error.js';

// Controllers
import HomeController from './controllers/home.js';
import CreateController from './controllers/create.js';
import ConfirmationController from './controllers/confirmation.js';
import PrintController from './controllers/print.js';
import DescriptionController from './controllers/description.js';
import AboutController from './controllers/about.js';
import ErrorController from './controllers/error.js';

// Data
import {dishes} from './data/dishes.js';

// API util
import API from './utils/api.js';

const appNode = document.getElementById('app');
const viewNode = appNode.querySelector('#view');

// Create new API
const api = API(axios.create({
    baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/',
    timeout: 5000,
    headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
}));

document.addEventListener('DOMContentLoaded', async () => {
    const dinnerModel = new DinnerModel(api);

    page('/',  async (ctx) => {
        try {
            const view = await homeView(viewNode, dinnerModel);
            const homeController = new HomeController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    page('/about', async (ctx) => {
        try {
            const view = await aboutView(viewNode, dinnerModel);
            const aboutController = new AboutController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    page('/create', async (ctx) => {
        try {
            const view = await createView(viewNode, dinnerModel);
            const createController = new CreateController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    // description view
    page('/create/:id', async (ctx) => {
        try {
            const {id} = ctx.params;
            const view = await descriptionView(id, viewNode, dinnerModel);
            const descriptionController = new DescriptionController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    page('/confirm', async (ctx) => {
        try {
            const view = await confirmationView(viewNode, dinnerModel);
            const confirmationController = new ConfirmationController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    page('/print', async (ctx) => {
        try {
            const view = await printView(viewNode, dinnerModel);
            const printController = new PrintController(view, dinnerModel);
        } catch(err) {
            // handle error
            const view = await errorView(err, dinnerModel);
            const errorController = new ErrorController(view, dinnerModel);
        }
    });

    page('*', async (ctx) => {
        const view = notfoundView(viewNode, dinnerModel);
    });

    page({hashbang:true});
});
