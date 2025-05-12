function createTags(tag,text,myClass){
    let element = document.createElement(tag);

    if(element){
        element.classList = myClass;
        element.innerHTML = text;
    }
    return element
}

function selectTags(tag,value){
    let element = document.querySelector(tag);

    if(element){
            element.value = value;
    }
}

export { createTags , selectTags}