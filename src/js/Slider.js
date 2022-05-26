export class Slider {
    constructor() {
        this.init();
    }

    init() {
        const slider = new Swiper('.slider', {
            effect: 'fade',
            autoplay: {
                delay: 4000,
            },
            speed: 1000,
            simulateTouch: false,
            pagination: {
                el: '.slider__pagination',
                clickable: true,
                modifierClass: 'slider__pagination-',
                bulletClass: 'slider__pagination_bullet',
                bulletActiveClass: 'slider__pagination_bullet--active'
            }
        });
    }
}