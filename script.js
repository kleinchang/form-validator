
var some_function = function(someVar) {
    return function curried_func(e) {
        // do something here
        console.log('some_function: ' + someVar)
        r.innerText = someVar
    }
}

function onDragStart(param1, evt) {
    console.log('some_function 3: ' + c.value)
    r.innerText = param1
}

const c = document.getElementById('currency-one')
c.addEventListener('change', /*update*/ (evt) => onDragStart(c.value, evt) /*some_function(c.value)*/
    /*(someVar) => {
        return function curried_func(e) {
            // do something here
            console.log('some_function: ' + someVar)
            r.innerText = someVar
        }
    }*/



)
const r = document.getElementById('rate')


function update() {
    console.log('some_function 2: ' + c.value)
    r.innerText = c.value
}

const u = document.getElementById('username')
const e = document.getElementById('email')
const p = document.getElementById('password')


function formSubmit(event) {
    //alert('form submit');
    event.preventDefault();

    console.log(c.value)
    r.innerText = c.value

    //checkRequired([u, e, p])
    //checkLength(u, 3, 10)

    // fetch("https://open.exchangerate-api.com/v6/latest")
    // .then(response => { console.log(response); return response.json() })
    // .then(data => {
    //     console.log(data)
    //     console.log(data.rates[data.base_code])
    //     console.log(data.rates['AED'])
    // })

    const data = getLatest()
    //data.then(value => { console.log(value) })
    //console.log(data)
    setTimeout(() => { console.log(data.then(value => { console.log(value) })) }, 1000)
}

async function getLatest() {
    const response = await fetch("https://open.exchangerate-api.com/v6/latest")
    const data = await response.json()
    return data
}

function checkRequired(inputs) {
    inputs.forEach(element => {
        if (element.value.trim() === '') {
            showError(element, element + ' is empty')
        }
    });
}

function showError(input, message) {
    alert(message)
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        alert(input.value.length + ' < ' + min)
    }
    else if (input.value.length > max) {
        alert(input.value.length + ' > ' + max)
    }
    else {
        alert('success')
    }
}


const f = document.getElementById('form')
f.addEventListener('submit', formSubmit)


const words = ['one', 'two', 'three']
function pickWord() {
    return words[Math.floor(Math.random() * words.length)]
}
let randomWord = pickWord()

let time = 10
const t = document.getElementById('time')
const random_number = document.getElementById('random')
const timeInterval = setInterval(() => {
    //localStorage.getItem('difficulty')
    t.innerText = --time + 's' + getDifficulity()
    random_number.innerText = randomWord // pickWord() //words[Math.floor(Math.random() * words.length)]
    // if (time === 3) {
    //     clearInterval(timeInterval)
    // }
}, 1000)

function getDifficulity() {
    var result = localStorage.getItem('difficulty')
    localStorage.setItem('difficulty', 'normal')
    return result
}

const text = document.getElementById('text')
text.focus()
text.addEventListener('input', e => {
    console.log(e.target.value)
    console.log(randomWord)
    if (e.target.value === randomWord) {
        randomWord = pickWord()
    }
})

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

// Store listitems
const listItems = [];
let dragStartIndex;

  const draggable_list = document.getElementById('draggable-list');
  createList();

  // Insert list items into DOM
function createList() {
    [...richestPeople]
      .map(a => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
      .forEach((person, index) => {
        const listItem = document.createElement('li');
  
        listItem.setAttribute('data-index', index);
  
        listItem.innerHTML = `
          <span class="number">${index + 1}</span>
          <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
          </div>
        `;
  
        listItems.push(listItem);
  
        draggable_list.appendChild(listItem);
      });
  
    addEventListeners();
  }

  function addEventListeners() {
    const dragListItems = document.querySelectorAll('.draggable-list li');
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
      });

      const draggables = document.querySelectorAll('.draggable');
      draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
      });    
  }

  function dragStart() {
    console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }
  
  function dragEnter() {
    console.log('Event: ', 'dragenter');
    this.classList.add('over');
  }
  
  function dragLeave() {
    console.log('Event: ', 'dragleave');
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    console.log('Event: ', 'dragover');
    e.preventDefault();
  }
  
  function dragDrop() {
    console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
  }
  
  // Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
  