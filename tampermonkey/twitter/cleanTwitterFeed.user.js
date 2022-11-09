// ==UserScript==
// @name         A Clean Twitter Feed!
// @namespace    cleanTwitterFeed.user.js
// @version      1.3.0
// @description  Elon Musk wishes he hired me...
// @author       HBIDamian
// @updateURL    https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @downloadURL  https://github.com/IdioticBuffoonery/Browser-Styles-and-Scripts/raw/main/tampermonkey/twitter/cleanTwitterFeed.user.js
// @match        *://*.twitter.com/*
// @icon         https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/768px-Twitter-logo.svg.png
// @grant        none
// ==/UserScript==

(function() {
    var ss = document.styleSheets[0];
    ss.insertRule('::-webkit-scrollbar {width:10px; height:10px;}', 0);
    ss.insertRule('::-webkit-scrollbar-corner {background: rgb(29, 155, 240); height: unset; width: unset;}', 0);
    ss.insertRule('::-webkit-scrollbar-track {background: rgb(29, 155, 240);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb {background: rgb(7, 82, 133);}', 0);
    ss.insertRule('::-webkit-scrollbar-thumb:hover {background: rgb(13, 116, 186);}', 0);
    'use strict';
    const phrasesToRemove = [
        'Carol Vorderman',
        'Manchester United',
        'Elon Musk',
        'Matt Hancock',
        '#imaceleb'
    ];

    const promotedPhrases = [
        'Promoted',
        'Advertisment'
    ];

    takeOutTheTrash();
    setInterval(takeOutTheTrash, 0);

    function takeOutTheTrash(){
        if(document.querySelector('[data-testid="sidebarColumn"]')){
            document.querySelector('[data-testid="sidebarColumn"]').remove();
        }
        if(document.querySelector('[data-testid="primaryColumn"]')){
            document.querySelector('[data-testid="primaryColumn"]').style.setProperty("max-width", "100%", "important");
        }
        if(!(window.location.pathname.startsWith('/messages'))) {
            if(document.getElementsByClassName('r-1ye8kvj')){
                // a class within primaryColumn with max-width.
                Array.from(document.getElementsByClassName('r-1ye8kvj'))
                    .forEach(elm => elm.style.setProperty("max-width", "unset", "important"));
            }
        }
        if(document.querySelector('[aria-label="Timeline: Your Home Timeline"]')){
            document.querySelector('[aria-label="Timeline: Your Home Timeline"]').parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('[aria-label="Timeline: Explore"]')){
            document.querySelector('[aria-label="Timeline: Explore"]').parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('[aria-label="Timeline: Notifications"]')){
            document.querySelector('[aria-label="Timeline: Notifications"]').parentElement.parentElement.parentElement.parentElement.style.maxWidth = "100%";
        }
        if(document.querySelector('svg[aria-label="Verified account"]')){
            Array.from(document.querySelectorAll('svg[aria-label="Verified account"]'))
                .forEach(rmElm => rmElm.remove());
        }
        for (let i = 0; i < phrasesToRemove.length; ++i) {
            Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
                .filter(elm => elm.textContent.includes(phrasesToRemove[i]))
                .forEach(rmElm => rmElm.parentElement.parentElement.parentElement.remove())
        }
        for (let ii = 0; ii < promotedPhrases.length; ++ii) {
            Array.from(document.querySelectorAll('[data-testid="placementTracking"]'))
                .filter(elm => elm.textContent.includes(promotedPhrases[ii]))
                .forEach(rmElm => rmElm.parentElement.parentElement.remove());
        }
    }
})();
