const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


const options = {weekday : 'long', month : "short", day : "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function addToDo(toDo, id, done, trash){

    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


document.addEventListener("keyup", function(event){
    //if we press enter, enter key code is 13
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            
            //add item to local storage
            //this code must be added where the list array is updated
            localStorage.setItem("TODO", JSON.stringify(LIST));

            //increment the id for the next item
            id++;
        }
        input.value = "";
    }
});

// complete to do
function completeToDo(element){
      element.classList.toggle(CHECK);
      element.classList.toggle(UNCHECK);
      element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

      LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeTodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked elemnet inside the list
    const elementJob = element.attributes.job.value;  //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeTodo(element);
    }

    //add item to local storage
    //this code must be added where the list array is updated
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
