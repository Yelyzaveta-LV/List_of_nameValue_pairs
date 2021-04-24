// inputs
const nameValue = document.getElementById('name-value');
const nameValueList = document.getElementById('name-value-list');


// buttons
const buttonAdd = document.getElementById('add'),
    buttonSortByName = document.getElementById('sort-by-name'),
    buttonSortByValue = document.getElementById('sort-by-value'),
    buttonDelete = document.getElementById('delete'),
    buttonShowXML = document.getElementById('show-XML');



let list = new Map([]);


let addToList = () => {

    let valueInput = nameValue.value;

    let firstPart = valueInput.split('=')[0];

    let secondPart = valueInput.split('=')[1];

    if ((firstPart === '') ||
        (secondPart === '') ||
        (!isValid(firstPart)) ||
        (!isValid(secondPart)) ||
        (secondPart === undefined) ||
        (firstPart === undefined) ||
        (!firstPart.trim().length) ||
        (!secondPart.trim().length)) {
        document.getElementsByClassName('wornings')[0].style.display = "block";
        nameValueList.value = 'Please, enter a valid value';
    }
    else {
        document.getElementsByClassName('wornings')[0].style.display = "none";
        nameValue.value = '';
        nameValueList.value = '';
        let newValue = list.set(firstPart, secondPart);

        for (var [key, value] of list) {
            nameValueList.value += (key + ' = ' + value) + '\n';
        }
    }
};

let sortByValue = () => {
    let list1 = new Map();
    let title = list.values();
    console.log(title);
    title = Array.from(title);
    title.sort();
    console.log(title);
    for (var name of title) {
        for (var [key, value] of list) {
            if (name == value) {
                let newValue = list1.set(key, value);
            }
        }
    }
    list = list1;
    showOutput()
}

let sortByNameList = () => {
    let list1 = new Map()

    let titleName = list.keys();

    titleName = Array.from(titleName);

    titleName.sort();

    for (var name of titleName) {
        for (var [key, value] of list) {
            if (name == key) {
                list1.set(name, value);
            }
        }
    }

    list = list1;
    showOutput()
}

let deleteValue = () => {
    confirm(`Are you sure want delete: ' ${nameValue.value} '`)
    if (true) {
        let ondelet = nameValue.value;
        list.delete(ondelet)
        nameValue.value = '';
        showOutput()
    }
}

let showXML = () => {                               // Does not work. 
}

buttonAdd.onclick = addToList;
buttonSortByName.onclick = sortByNameList;
buttonSortByValue.onclick = sortByValue;
buttonDelete.onclick = deleteValue;
buttonShowXML.onclick = showXML;


let showOutput = () => {
    nameValueList.value = '';
    for (var [key, value] of list) {
        nameValueList.value += (key + ' = ' + value) + '\n';
    }
}


function isValid(str) {
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?@]/g.test(str);
};