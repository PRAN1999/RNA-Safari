/* global safari */
/* global safari_e */
/* global $ */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';
import store from './configureStore';
import './index.css';

function injectApp(items) {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "RNAExtension");
    document.body.appendChild(newDiv);
    
    ReactDOM.render(
        <Provider store={store} >
            <App className='visible-extension' redditData={items}/>
        </Provider>, 
        newDiv);
    registerServiceWorker();
}

function createToggleButton() {
    const newDiv = document.createElement("a");
    newDiv.innerHTML = "Toggle RNA";
    newDiv.style.marginRight = '1em';
    newDiv.style.marginLeft = '0.5em';
    newDiv.style.cursor = 'pointer';
    document.querySelector('#header-bottom-right').prepend(newDiv);

    let visible = true;
    newDiv.addEventListener('click', function() {
        visible = !visible;
        const application = $('#RNAExtension');
        if(!visible)
            application.animate({
                opacity: 0.0,
                right: "-300px",
            }, 1000);
        else
            application.animate({
                opacity: 1.0,
                right: "0px",
            }, 1000);
    });
}

console.log('Rendering App with ' + safari_e.message);
renderRNA(safari_e.message);

function renderRNA(data) {
    injectApp(data);
    createToggleButton();
}