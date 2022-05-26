export class Menu {
    constructor() {
        this.toggleMenu();
        // this.activeSubMenu();
    }

    toggleMenu() {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.header__nav-wrapper');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
        });
    }

    activeSubMenu() {
        const menuItemsWithSubmenu = document.querySelectorAll('.header__menu-item.has-dropdown');
        [...menuItemsWithSubmenu].forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                el.lastElementChild.classList.toggle('is-active');
            })
        });
    }
}