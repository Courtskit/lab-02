'use strict'

// array of all animals
let allHornAnimals = [];
let allHornAnimals2 = [];

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
  // return
  return html;
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

    // allHornAnimals2.forEach(value => {
    //   // will create html
    //   let animalHtml = value.toMustacheTemplate();
    //   // append to the section
    //   $('main').append(animalHtml)
    // });
    dropDown()
  });









//  render animals image title and description
// HornAnimal.prototype.render = function () {
//   console.log('in the render function')
//   // grabbing ID from HTML
//   const myTemplate = $('#photo-template').html();

//   // putting jquery template into new section
//   const $newSection = $(`<section class='animal'>${myTemplate}</section>`);

//   // fill the h2 with the title
//   $newSection.find('h2').text(this.title);

//   // fill the p with the description
//   $newSection.find('h3').text(this.description);

//   // fill the h2 with the keyword
//   $newSection.find('h4').text(this.keyword);

//   // fill the p with the horns
//   $newSection.find('p').text(this.horns);

//   // fill the src of the img to the image_url
//   $newSection.find('img').attr('src', this.image_url);

//   // append to the DOM
//   $('main').append($newSection);
// }


// WRAP AJAX IN FUNCTION

// // I need to get the page-1.json and make new object instances with it
// $.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
//   .then(animal => {
//     animal.forEach(value => {
//       new HornAnimal(value, allHornAnimals);
//     })
//     // dropDown();
//     // if keyword equals blank.. append it
//   });
// // data does not exist down here
// $.ajax('data/page-2.json', { method: 'GET', dataType: 'JSON' })
//   .then(animal => {
//     animal.forEach(value => {
//       new HornAnimal(value, allHornAnimals2);
//     })
//     dropDown();
//     // if keyword equals blank.. append it
//   });


// add event listener to dropdown
// $('#dropDownMenu').on('change', function () {
//   $('.animal').remove();
//   allHornAnimals.forEach(HornAnimal => {
//     if (HornAnimal.keyword === this.value) {
//       HornAnimal.render();
//     }
//   })
// });


$('.allHornAnimalsButton').click(() => {
  $('main').empty();
console.log('button1')
  allHornAnimals.forEach(value => {
    // will create html
    let animalHtml = value.toMustacheTemplate();
    // append to the section
    $('main').append(animalHtml)
  });

})


$('.allHornAnimals2Button').click(() => {
  $('main').empty();
console.log('button2')
  allHornAnimals2.forEach(value => {
    // will create html
    let animalHtml = value.toMustacheTemplate();
    // append to the section
    $('main').append(animalHtml)
  });

})

