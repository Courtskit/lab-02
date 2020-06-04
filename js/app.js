'use strict'

// array of all animals
let allHornAnimals = [];
let allHornAnimals2 = [];
let page1 = true;
let page2 = false;
// constructor of horn animals
function HornAnimal(obj, array) {
  this.image_url = obj.image_url;
  this.name = obj.title;
  this.body = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  array.push(this);
}

HornAnimal.prototype.toMustacheTemplate = function () {
  // get template from html
  let template = $('#photo-template').html();
  // use mustache to get html by merging the template with the data
  let html = Mustache.render(template, this);

  $('main').append(html);
}

function dropDown() {

  let keywords = [];
  //grab drop down ID

  allHornAnimals.forEach((HornAnimal) => {
    let nameOfKey = HornAnimal.keyword;
    // ! - does the opposite
    if (!keywords.includes(nameOfKey)) {
      keywords.push(nameOfKey);
    }
  })

  // add event listener to dropdown
  $('#dropDownMenu').on('change', function () {
    $('.animal').remove();
    allHornAnimals.forEach(HornAnimal => {
      if (HornAnimal.keyword === this.value) {
        HornAnimal.toMustacheTemplate();
      }
    })

    allHornAnimals2.forEach(HornAnimal => {
      if (HornAnimal.keyword === this.value) {
        HornAnimal.toMustacheTemplate();
      }
    })
  });

  allHornAnimals2.forEach((HornAnimalValue) => {
    let nameOfKey2 = HornAnimalValue.keyword;
    // ! - does the opposite
    if (!keywords.includes(nameOfKey2)) {
      keywords.push(nameOfKey2);
    }
  })

  // const menu = $('#dropDownMenu').html();
  for (let i = 0; i < keywords.length; i++) {
    let nameOfKeyword = keywords[i];
    const $dropList = $(`<option value=${nameOfKeyword}>${nameOfKeyword}</option>`);
    $('#dropDownMenu').append($dropList);
  }
}

// sort the images by their names
$('#name-sort').on('click', function () {
  $('.animal').remove();

  if (this.value === 'names') {

    if (page1) {
      allHornAnimals.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
      allHornAnimals.forEach(animal => animal.toMustacheTemplate());
    } else if (page2) {
      allHornAnimals2.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
      allHornAnimals2.forEach(animal => animal.toMustacheTemplate());
    }
  }
})


// sort the images by their number of horns
$('#horn-sort').on('click', function () {
  $('.animal').remove();

  if (this.value === 'horns') {

    if (page1) {
      allHornAnimals.sort((a, b) => {
        if (a.horns > b.horns) {
          return -1;
        } else if (a.horns < b.horns) {
          return 1;
        } else {
          return 0;
        }
      });
      allHornAnimals.forEach(animal => animal.toMustacheTemplate());
    } else if (page2) {
      allHornAnimals2.sort((a, b) => {
        if (a.horns > b.horns) {
          return -1;
        } else if (a.horns < b.horns) {
          return 1;
        } else {
          return 0;
        }
      });
      allHornAnimals2.forEach(animal => animal.toMustacheTemplate());
    }
  }
})

// page left  
$('#allHornAnimalsButton').click(() => {
  page1 = true;
  page2 = false;
  $('.animal').remove();
  allHornAnimals.forEach(animal => animal.toMustacheTemplate())
})

// page right
$('#allHornAnimals2Button').click(() => {
  page1 = false;
  page2 = true;
  $('.animal').remove();
  allHornAnimals2.forEach(animal => animal.toMustacheTemplate())
})


$.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(animal => {
    animal.forEach(hornAnim => {
      new HornAnimal(hornAnim, allHornAnimals);
    })
    allHornAnimals.forEach(value => {
      // will create html
      let animalHtml = value.toMustacheTemplate();
      // append to the section
      $('main').append(animalHtml)
    });
  });

$.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
  .then(animal => {
    animal.forEach(hornAnim => {
      new HornAnimal(hornAnim, allHornAnimals2);
    })
    allHornAnimals2.forEach(value => {
      // will create html
      let animalHtml = value.toMustacheTemplate();
      // append to the section
      $('main').append(animalHtml)
    });
    dropDown()
  });






