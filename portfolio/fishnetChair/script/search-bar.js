let header = document.querySelector('.site-header');
let submitBtn = header.querySelector('.search-submit');
let menuItems = header.querySelectorAll('.main-menu-item');
let logo = header.querySelector('.logo');
let searchIcon = header.querySelector('.search-icon');
let searchBar = header.querySelector('.search-bar');
let searchInput = header.querySelector('.search-input')

let showSearchBar = function () {
    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.toggle('hidden');
    }
    searchIcon.classList.toggle('hidden');
    searchBar.classList.toggle('hidden');
}

let exit = function (evt) {
    let target = event.target;
    if (evt.keyCode == 27 || evt.type == 'click') {
        if (target.id != 'search-bar' && target.id != 'search-icon' && target.id != 'search-input') {
            for (let i = 0; i < menuItems.length; i++) {
                menuItems[i].classList.remove('hidden');
            }
            searchIcon.classList.remove('hidden');
            searchBar.classList.add('hidden');
            searchInput.value = '';
        }
    }
}

searchIcon.addEventListener('click', showSearchBar);
document.addEventListener('click', exit);
document.addEventListener('keyup', exit);
