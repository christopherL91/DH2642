'use strict';

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

// Controllers
import HomeController from './controllers/home.js';
import CreateController from './controllers/create.js';
import ConfirmationController from './controllers/confirmation.js';
import PrintController from './controllers/print.js';
import DescriptionController from './controllers/description.js';
import AboutController from './controllers/about.js';

// Data
import {dishes} from './data/dishes.js';

const appNode = document.getElementById('app');
const viewNode = appNode.querySelector('#view');

document.addEventListener('DOMContentLoaded', () => {
    const dinnerModel = new DinnerModel(dishes);

    page('/', async (ctx) => {
        const view = await homeView(viewNode, dinnerModel);
        const homeController = new HomeController(view, dinnerModel);
    });

    page('/about', async (ctx) => {
        const view = await aboutView(viewNode, dinnerModel);
        const aboutController = new AboutController(view, dinnerModel);
    });

    page('/create', async (ctx) => {
        const view = await createView(viewNode, dinnerModel);
        const createController = new CreateController(view, dinnerModel);
    });

    // description view
    page('/create/:id', async (ctx) => {
        const {id} = ctx.params;
        const view = await descriptionView(id, viewNode, dinnerModel);
        const descriptionController = new DescriptionController(view, dinnerModel);
    });

    page('/confirm', async (ctx) => {
        const view = await confirmationView(viewNode, dinnerModel);
        const confirmationController = new ConfirmationController(view, dinnerModel);
    });

    page('/print', async (ctx) => {
        const view = await printView(viewNode, dinnerModel);
        const printController = new PrintController(view, dinnerModel);
    });

    page('*', async (ctx) => {
        console.log('not found');
        const view = notfoundView(viewNode, dinnerModel);
    });

    page({hashbang:true});
});
