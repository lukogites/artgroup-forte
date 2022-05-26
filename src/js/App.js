import { Menu } from "./Menu.js";

// Media queries
const mqLgDown = window.matchMedia('(max-width: 991.98px)');
const mqLgUp = window.matchMedia('(min-width: 992px)');
const mqXlDown = window.matchMedia('(max-width: 1199.98px)');
const mqXlUp = window.matchMedia('(min-width: 1200px)');

// Other elements
const header = document.querySelector('.header');


function sliceIntoChunks([...arr], chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function wrapElements(parent, wrappingElementClass, size) {
    let childrens = document.querySelector(parent).children;
    let arrayChunks = sliceIntoChunks(childrens, size);
    $(arrayChunks).each(function (index, element) {
        $(element).wrapAll(`<div class="${wrappingElementClass}"></div>`);
    });
}

class App {
    constructor() {
        this.init();
        const menu = new Menu();
    }

    init() {
        this.zoomText();
        this.changeHeaderClassOnScroll();
        this.scrollSpy();
        this.toggleSearchBox();
        this.collapseCards();
    }

    changeHeaderClassOnScroll() {
        let initScrollPos = document.documentElement.scrollTop;
        if (initScrollPos > 100) {
            header.classList.add('is-scrolled');
        }

        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            if (scrollPos > 100) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }
        });
    }

    smoothScrollToAnchor() {
        let url = window.location.hash;
        if (url) {
            window.scrollTo(0, 0);
            $('html, body').animate({
                scrollTop: $(url).offset().top - 200
            }, 1000);
        }
    }

    zoomText() {
        const fontZoomIn = document.querySelector('.font-zoom__in');
        const fontZoomOut = document.querySelector('.font-zoom__out');

        fontZoomIn.addEventListener('click', () => {
            document.documentElement.classList.add('has-large-font');
        });

        fontZoomOut.addEventListener('click', () => {
            document.documentElement.classList.remove('has-large-font');
        });

    }

    scrollSpy() {
        const spyNav = document.querySelector(".nav-sticky");
        const sections = [...document.querySelectorAll("section.scroll-section")];

        const spyItem = (entries, observer) => {
            entries.forEach((entry) => {
                const { id } = entry.target;
                const spy = spyNav.querySelector(`[href="#${id}"`);

                spy.classList.remove("is-active");
                if (!entry.isIntersecting) return;
                spy.classList.add("is-active");
            });
        };

        const observer = new IntersectionObserver(spyItem, {
            rootMargin: "-18% 0% -82% 0%",
            root: document
        });

        sections.forEach((article) => observer.observe(article));
    }

    toggleSearchBox() {
        const searchBoxTrigger = $('.search-box-button');
        const searchBox = $('.search-box');

        searchBoxTrigger.on('click', function () {
            searchBox.toggleClass('is-active');
            searchBox.find('input').focus();
        });
    }

    collapseCards() {
        const cards = $('.collapse-card');

        cards.each(function (index, element) {
            $(element).on('click', function () {
                let target = $(this).data('collapse-target');
                if (target !== undefined) {
                    let that = $(this);

                    if (!that.hasClass('is-active')) {
                        cards.removeClass('is-active');
                        that.addClass('is-active');
                    } else {
                        that.removeClass('is-active');
                    }

                    $('div.collapse-card__hidden').not(`#${target}`).slideUp(120);
                    $(`#${target}`).delay(60).slideToggle(120);
                };
            });
        });

        if (mqXlUp.matches) {
            wrapElements('.collapse-cards', 'collapse-cards__row', 6);
        }

        if (mqXlDown.matches) {
            wrapElements('.collapse-cards', 'collapse-cards__row', 4);
        }

        mqXlUp.addListener(function (mq) {
            if (mq.matches) {
                let cardRows = $('.collapse-cards__row');
                cardRows.children().unwrap();
                wrapElements('.collapse-cards', 'collapse-cards__row', 6);
            }
        });

        mqXlDown.addListener(function (mq) {
            if (mq.matches) {
                let cardRows = $('.collapse-cards__row');
                cardRows.children().unwrap();
                wrapElements('.collapse-cards', 'collapse-cards__row', 4);
            }

        });
    }
}

const app = new App;
