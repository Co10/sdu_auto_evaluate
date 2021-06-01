// ==UserScript==
// @name         SDU_Auto_Valuate
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  evaluate all, SDU
// @author       You
// @match        http://bkjws.sdu.edu.cn/f/common/main
// @grant        none
// ==/UserScript==
(function(){
    'use strict';
    var css = '#F__king_Div{display:block;position:fixed;top:50%;z-index:10000; margin:auto;}#F__king_Click_It{width:60px;height:60px;border-radius:50%!important;color:white;border:none;background-color:#1e7cce47;box-shadow:0 0 8px 0 grey;margin:10px;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
})();

(function() {
    'use strict';
    const valueList = ["5.0", "10.0", "课程难度适中", "很满意", "推荐"];
    const valueText = ["很好", "非常满意", "很不错", "值得推荐"];

    function createEle(type, id, cla, father, intxt) {
        if (type) {
            var a = document.createElement(type);
            if (id) a.setAttribute("id", id);
            if (cla)   a.setAttribute("class", cla);
            if (intxt)  a.innerText = intxt;
            if (father) father.appendChild(a);
            return a;
        }
        return undefined;
    }

    var clickDiv = createEle("div", "F__king_Div", undefined, document.body, undefined);
    var clickB = createEle("button", "F__king_Click_It",undefined, clickDiv ,"Click");
    clickB.addEventListener('click', clickAll);

    var delay = ms => new Promise(res => setTimeout(res, ms));

    async function clickAll() {
        for (var i of document.getElementsByClassName('jrwjButton')) {
            if (+i.parentElement.previousSibling.innerText < 1) {
                i.click();
                await delay(2000);
                autoClickIt();
                await delay(1000);
                submit();
                await delay(1500);
                closeSubmit();
                await delay(2000);
                returnList();
                await delay(2000);
            }
        }
        alert('all done');
    }


    function submit() {
        document.getElementsByClassName('aui_state_highlight')[0].click();
    }
    function closeSubmit() {
        document.getElementsByClassName('aui_close')[0].click();
    }
    function returnList() {
        document.getElementById('fhButtonId').click();
    }

    function autoClickIt() {
        for(var i of document.getElementsByClassName("radio")) {
            var it = i.children[0].children[0];
            for (var j of valueList) {
                if (it.value === j) {
                    it.click();  it.checked=true; break;
                }
            }
        }
        document.getElementById('wjtxFormId').lastElementChild.children[0].lastElementChild.lastElementChild.children[0].innerText = valueText[Math.floor(Math.random() * valueText.length)];
        document.getElementById('tjButtonId').click();
    }
})();