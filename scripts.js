// Início do adicionar tarefas
const taskRemove = document.querySelector('#task-remove');
var lastId = 0;

function add_task_inner(id, title, time, descr) {
  let task_outer = document.createElement('div');
  let task_inner = document.createElement('div');
  let task_info = document.createElement('div');
  let task_input = document.createElement('input');
  let task_title = document.createElement('strong');
  let task_time = document.createElement('span');
  let task_descr = document.createElement('a');
  let task_remove = taskRemove.cloneNode(true);

  task_input.type = 'checkbox';

  task_outer.classList.add('task-item');
  task_inner.classList.add('task-daily');
  task_info.classList.add('task-info');
  task_descr.classList.add('task-observation');
  task_remove.style.display = 'block';
  task_input.classList.add('task-checkbox');


  task_title.textContent = title + ' - ';
  task_time.textContent = time;
  task_descr.textContent = descr;

  task_remove.addEventListener('click', () => {
    var savedItems = JSON.parse(localStorage.getItem('savedItems'));
    savedItems.filter((value, index, array) => {
      if (value.id == id) {
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    task_outer.parentElement.removeChild(task_outer);
  });

  task_info.appendChild(task_input);
  task_info.appendChild(task_title);
  task_info.appendChild(task_time);
  task_inner.appendChild(task_info);
  task_inner.appendChild(task_remove);
  task_outer.appendChild(task_inner);
  task_outer.appendChild(task_descr);

  return task_outer;
}

function add_task(id, title, time, descr) {

  var hour = time.split(':')[0];
  var task = add_task_inner(id, title, time, descr);

  if (hour >= 4 && hour <= 11) {
    let list = document.querySelector('.task-container-morning');
    list.appendChild(task);
    return 'morning';
  } else if (hour >= 12 && hour <= 19) {
    let list = document.querySelector('.task-container-afternoon');
    list.appendChild(task);
    return 'afternoon';
  } else {
    let list = document.querySelector('.task-container-night');
    list.appendChild(task);
    return 'night';
  }
}

// Fim do adicionar tarefas

// Início da logica dos botões

const buttonMorning = document.querySelector('.button-morning');
const buttonAfternoon = document.querySelector('.button-afternoon');
const buttonNight = document.querySelector('.button-night');

const titleMorining = document.querySelector('.title-morning');
const titleAfternoon = document.querySelector('.title-afternoon');
const titleNight = document.querySelector('.title-night');
const titleAdd = document.querySelector('.title-add');

const buttonAdd = document.querySelector('.button-add');

const taskContainer = document.querySelector('.task-container');
const taskContainerMorning = document.querySelector('.task-container-morning');
const taskContainerAfternoon = document.querySelector('.task-container-afternoon');
const taskContainerNight = document.querySelector('.task-container-night');

const buttonSection = document.querySelector('.button-section');
const addContainer = document.querySelector('.add-container');
const clockButton = document.querySelector('.clock-button');
const clockTitle = document.querySelector('.clock-title');
const clockDescription = document.querySelector('.clock-description');

const hourButton = document.querySelector('#hours');
const minuteButton = document.querySelector('#minutes');
const hourPicker = document.querySelector('#hour-picker');
const minutePicker = document.querySelector('#minute-picker');
const items = document.querySelectorAll('.item');

const menuIcons = document.querySelector('.menu-icon');
const menuMain = document.querySelector('.menu-main');
const menuClose = document.querySelector('.menu-close');

const menuAbout = document.querySelector('.menu-about');
const aboutUs = document.querySelector('.about-us');
const aboutClose = document.querySelector('.about-close');

menuIcons.addEventListener('click', () => {
  menuMain.classList.add('flex');
});

menuClose.addEventListener('click', () => {
  menuMain.classList.remove('flex');
});

menuAbout.addEventListener('click', () => {
  aboutUs.classList.add('flex');
});

aboutClose.addEventListener('click', () => {
  menuMain.classList.remove('flex');
  aboutUs.classList.remove('flex');
});


buttonMorning.addEventListener('click', () => {
  document.body.classList.remove('body-afternoon');
  document.body.classList.remove('body-night');
  document.body.classList.add('body-morning');
  document.body.classList.remove('body-add');

  buttonMorning.classList.toggle('hidden')
  buttonAfternoon.classList.remove('hidden')
  buttonNight.classList.remove('hidden')

  titleMorining.classList.remove('hidden');
  titleAfternoon.classList.add('hidden');
  titleNight.classList.add('hidden');
  titleAdd.classList.add('hidden');

  taskContainerMorning.classList.remove('hidden')
  taskContainerAfternoon.classList.add('hidden')
  taskContainerNight.classList.add('hidden')
  
});

buttonAfternoon.addEventListener('click', () => {
  document.body.classList.remove('body-morning');
  document.body.classList.remove('body-night');
  document.body.classList.add('body-afternoon');
  document.body.classList.remove('body-add');

  buttonMorning.classList.remove('hidden')
  buttonAfternoon.classList.toggle('hidden')
  buttonNight.classList.remove('hidden')

  titleMorining.classList.add('hidden');
  titleAfternoon.classList.remove('hidden');
  titleNight.classList.add('hidden');
  titleAdd.classList.add('hidden');

  taskContainerMorning.classList.add('hidden')
  taskContainerAfternoon.classList.remove('hidden')
  taskContainerNight.classList.add('hidden')
});

buttonNight.addEventListener('click', () => {
  document.body.classList.remove('body-morning');
  document.body.classList.remove('body-afternoon');
  document.body.classList.add('body-night');
  document.body.classList.remove('body-add');

  buttonMorning.classList.remove('hidden')
  buttonAfternoon.classList.remove('hidden')
  buttonNight.classList.toggle('hidden')

  titleMorining.classList.add('hidden');
  titleAfternoon.classList.add('hidden');
  titleNight.classList.remove('hidden');
  titleAdd.classList.add('hidden');

  taskContainerMorning.classList.add('hidden')
  taskContainerAfternoon.classList.add('hidden')
  taskContainerNight.classList.remove('hidden')
});

buttonAdd.addEventListener('click', () => {
  document.body.classList.remove('body-morning');
  document.body.classList.remove('body-afternoon');
  document.body.classList.remove('body-night');
  document.body.classList.add('body-add');

  taskContainerMorning.classList.add('hidden');
  taskContainerAfternoon.classList.add('hidden');
  taskContainerNight.classList.add('hidden');

  titleMorining.classList.add('hidden');
  titleAfternoon.classList.add('hidden');
  titleNight.classList.add('hidden');
  titleAdd.classList.remove('hidden');

  buttonSection.classList.add('hidden');
  addContainer.classList.remove('hidden');
});

clockButton.addEventListener('click', () => {
  var thisId = lastId;
  lastId++;

  var clockTime = hourButton.textContent.trim() + ':' + minuteButton.textContent.trim();
  var whereToSwitch = add_task(thisId, clockTitle.value, clockTime, clockDescription.value);

  var savedItems = JSON.parse(localStorage.getItem('savedItems'));
  savedItems.push({
    id: thisId,
    title: clockTitle.value,
    time: clockTime,
    descr: clockDescription.value
  });
  localStorage.setItem('savedItems', JSON.stringify(savedItems));

  switch (whereToSwitch) {
    case 'morning':
      taskContainerMorning.classList.remove('hidden');

      document.body.classList.remove('body-afternoon');
      document.body.classList.remove('body-night');
      document.body.classList.add('body-morning');
      document.body.classList.remove('body-add');

      titleMorining.classList.remove('hidden');
      titleAfternoon.classList.add('hidden');
      titleNight.classList.add('hidden');
      break;
    case 'afternoon':
      taskContainerAfternoon.classList.remove('hidden');

      document.body.classList.add('body-afternoon');
      document.body.classList.remove('body-night');
      document.body.classList.remove('body-morning');
      document.body.classList.remove('body-add');

      titleMorining.classList.add('hidden');
      titleAfternoon.classList.remove('hidden');
      titleNight.classList.add('hidden');
      break;
    case 'night':
      taskContainerNight.classList.remove('hidden');

      document.body.classList.remove('body-afternoon');
      document.body.classList.add('body-night');
      document.body.classList.remove('body-morning');
      document.body.classList.remove('body-add');

      titleMorining.classList.add('hidden');
      titleAfternoon.classList.add('hidden');
      titleNight.classList.remove('hidden');
      titleAdd.classList.add('hidden');
      break;
  }

  titleAdd.classList.add('hidden');
  addContainer.classList.add('hidden');
  buttonSection.classList.remove('hidden');
  addContainer.classList.add('hidden');
});

// Fim das logicas dos botões

// Inicio das logicas do relogio

function timePickerClose() {
  var activeBtns = document.querySelectorAll('.time-btn.active');
  activeBtns.forEach(function(activeBtn) {
    activeBtn.classList.remove('active');
  });
  var activePickers = document.querySelectorAll('.time-picker.active');
  activePickers.forEach(function(activePicker) {
    activePicker.classList.remove('active');
  });  
}

hourButton.addEventListener('click', () => {
  var shouldOpen = !hourPicker.classList.contains('active');
  if (hourPicker.classList.contains('active') || minutePicker.classList.contains('active')) {
    timePickerClose();
  }
  if (shouldOpen) {
    hourButton.classList.add('active');
    hourPicker.classList.add('active');
  }
});

minuteButton.addEventListener('click', () => {
  var shouldOpen = !minutePicker.classList.contains('active');
  if (hourPicker.classList.contains('active') || minutePicker.classList.contains('active')) {
    timePickerClose();
  }
  if (shouldOpen) {
    minuteButton.classList.add('active');
    minutePicker.classList.add('active');
  }
});

items.forEach(function(item) {
  item.addEventListener('click', () => {
    var activeBtn = document.querySelector('.time-btn.active');
    var activeItems = document.querySelectorAll('.item.active');
    activeItems.forEach(function(activeItem) {
      activeItem.classList.remove('active');
    });
    activeBtn.textContent = item.textContent;
    timePickerClose();
  });
});

// Fim das logicas do relogio

document.addEventListener('DOMContentLoaded', () => {
  var savedItems = localStorage.getItem('savedItems');
  if (savedItems !== null) {
    JSON.parse(savedItems).forEach(function(item) {
      add_task(item.id, item.title, item.time, item.descr);
    });
  } else {
    localStorage.setItem('savedItems', JSON.stringify([]));
  }
});
