'use strict';

import page from 'page';

import {loadTemplate} from './utils/templates.js';

// Model
import DinnerModel from './models/dinner.js';

// Views
import createView from './views/create.js';
import aboutView from './views/about.js';
import homeView from './views/home.js';
import notfoundView from './views/notfound.js';

// Controllers
import HomeController from './controllers/home.js';
import CreateController from './controllers/create.js';

// Data
import {dishes} from './data/dishes.js';

const appNode = document.getElementById('app');
const viewNode = appNode.querySelector('#view');

document.addEventListener('DOMContentLoaded', () => {
    const dinnerModel = new DinnerModel(dishes);

    page('/', async (ctx) => {
        console.log('index');
        const view = await homeView(viewNode, dinnerModel);
        const homeController = new HomeController(view, dinnerModel);
    });

    page('/about', async (ctx) => {
        console.log('about');
        const view = await aboutView(viewNode, dinnerModel);
    });

    page('/create', async (ctx) => {
        console.log('create');
        const view = await createView(viewNode, dinnerModel);
        const createController = new CreateController(view, dinnerModel);
    });

    page('/create/:id', async (ctx) => {
        const {id} = ctx.params;
        const view = await createView(viewNode, dinnerModel);
    });

    page('*', async (ctx) => {
        console.log('not found');
        const view = notfoundView(viewNode, dinnerModel);
    });

    page({hashbang:true});
});
