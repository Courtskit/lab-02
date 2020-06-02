'use strict'

// array of all animals
let allHornAnimals = [];
// constructor of horn animals
function hornAnimal(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.keyword = obj.keyword;
  this.horns = obj.horns;
  allHornAnimals.push(this);
}
//  render animals image title and description
hornAnimal.prototype.render = function () {
  console.log('in the render function')
  // grabbing ID from HTML
  const myTemplate = $('#photo-template').html();

  // putting jquery template into new section
  const $newSection = $(`<section class='animal'>${myTemplate}</section>`);

  // fill the h2 with the title
  $newSection.find('h2').text(this.title);

  // fill the p with the description
  $newSection.find('h3').text(this.description);

  // fill the h2 with the keyword
  $newSection.find('h4').text(this.keyword);

  // fill the p with the horns
  $newSection.find('p').text(this.horns);

  // fill the src of the img to the image_url
  $newSection.find('img').attr('src', this.image_url);

  // append to the DOM
  $('main').append($newSection);
}

function dropDown() {

  let keywords = [];
  //grab drop down ID

  allHornAnimals.forEach((hornAnimal, i) => {
    let nameOfKey = hornAnimal.keyword;
    // ! - does the opposite
    if (!keywords.includes(nameOfKey)) {
      keywords.push(nameOfKey);
    }

  })
  // const menu = $('#dropDownMenu').html();
  for (let i = 0; i < keywords.length; i++) {
    let nameOfKeyword = keywords[i];
    const $dropList = $(`<option value=${nameOfKeyword}>${nameOfKeyword}</option>`);
    $('#dropDownMenu').append($dropList);
  }
}


// I need to get the page-1.json and make new object instances with it
$.ajax('data/page-1.json', { method: 'GET', dataType: 'JSON' })
  .then(animal => {
    animal.forEach(value => {
      new hornAnimal(value).render();
    })
    dropDown();
    // if keyword equals blank.. append it
  });
// data does not exist down here


//add event listener to dropdown
$('#dropDownMenu').on('change', function () {
  $('.animal').remove();
  allHornAnimals.forEach(hornAnimal => {
    if (hornAnimal.keyword === this.value) {
      hornAnimal.render();
    }
  })
});
