class Slider {
    constructor(
        sliderContainer,
        sliderItems,
        bulletsControlContainer,
        arrowRight,
        arrowLeft
    ) {
        // 1) get the container of slider
        this.sliderContainer = document.querySelector(sliderContainer);
        // 2) get the slider items
        this.sliderItems = document.querySelectorAll(sliderItems);
        this.sliderTracker = {};
        this.sliderItems.forEach(
            (el) => (this.sliderTracker[+el.dataset["order"]] = el)
        );
        // 3) get the slider bullets controls
        this.bullets = document.querySelector(bulletsControlContainer);
        // 4) get the slider arrows controls
        this.arrowRight = document.querySelector(arrowRight);
        this.arrowLeft = document.querySelector(arrowLeft);
        // 5) define an event listener to two arrows
        this.arrowRight.addEventListener(
            "click",
            this.arrowRightHandler.bind(this)
        );
        this.arrowLeft.addEventListener(
            "click",
            this.arrowLeftHandler.bind(this)
        );
        // 6) define an event listener to bullets
        this.bullets.addEventListener("click", this.bulletsHandler.bind(this));
    }

    arrowRightHandler() {
        // get the goTo dataset
        let goTo = +this.arrowRight.dataset["goto"];
        // check if the item is the last
        if (goTo == this.sliderItems.length) {
            // disable
            return;
        }
        // add class right to goTo slide - 1
        this.sliderTracker[goTo - 1].classList.remove("slider__item--shown");
        this.sliderTracker[goTo - 1].classList.add("slider__item--right");
        // add class shown to goTo
        this.sliderTracker[goTo].classList.remove("slider__item--left");
        this.sliderTracker[goTo].classList.add("slider__item--shown");
        // active the correct bullet
        this.bulletsActivation(goTo);
        // increase arrow right  goTo dataset
        this.arrowRight.dataset["goto"]++;
        // icrease arrow left goTo dataset
        this.arrowLeft.dataset["goto"]++;
        // check both arrows if the slide is the end of elements and add class to it
        this.checkIfDisabled();
    }

    arrowLeftHandler() {
        // get the goTo dataset
        let goTo = +this.arrowLeft.dataset["goto"];
        // check if the item is the last
        if (goTo < 0) {
            // disable
            return;
        }
        // add class right to goTo slide - 1
        this.sliderTracker[goTo + 1].classList.remove("slider__item--shown");
        this.sliderTracker[goTo + 1].classList.add("slider__item--left");
        // add class shown to goTo
        this.sliderTracker[goTo].classList.remove("slider__item--right");
        this.sliderTracker[goTo].classList.add("slider__item--shown");
        // active the correct bullet
        this.bulletsActivation(goTo);
        // increase arrow right  goTo dataset
        this.arrowRight.dataset["goto"]--;
        // icrease arrow left goTo dataset
        this.arrowLeft.dataset["goto"]--;
        // check both arrows if the slide is the end of elements and add class to it
        this.checkIfDisabled();
    }

    checkIfDisabled() {
        if (+this.arrowRight.dataset["goto"] == this.sliderItems.length)
            this.arrowRight.classList.add("disabled");
        else this.arrowRight.classList.remove("disabled");
        if (+this.arrowLeft.dataset["goto"] < 0)
            this.arrowLeft.classList.add("disabled");
        else this.arrowLeft.classList.remove("disabled");
    }

    bulletsActivation(goTo) {
        this.bullets.querySelectorAll(".bullets__item").forEach((el) => {
            el.classList.remove("active");
            if (+el.dataset["slider"] == goTo) el.classList.add("active");
        });
    }

    bulletsHandler(e) {
        if (e.target.closest("li")) {
            let toGo = +e.target.closest("li").dataset["slider"];
            let activeSlide = this.getActivatedBulletSlider();

            console.log(`active: ${activeSlide}`, `To Go: ${toGo}`);

            if (activeSlide > toGo) {
                this.goBack(activeSlide, toGo);
            }

            if (activeSlide < toGo) {
                this.goForward(activeSlide, toGo);
            }

            // for (let i = start; start > end; i--) {
            //     console.log(this.sliderTracker[i], i , i -1);
            // }
        }
    }

    goBack(activeSlide, toGo) {
        for (let i = activeSlide; i > toGo; i--) {
            console.log(this.sliderTracker[i], i, i - 1);
            this.sliderTracker[i].classList.remove(
                "slider__item--shown"
            );
            this.sliderTracker[i].classList.add(
                "slider__item--left"
            );
            this.sliderTracker[i - 1].classList.remove(
                "slider__item--right"
            );
            this.sliderTracker[i - 1].classList.add(
                "slider__item--shown"
            );

            this.bulletsActivation(i-1);

            this.arrowRight.dataset["goto"] = i;
            this.arrowLeft.dataset["goto"] = i - 2;

        }
        this.checkIfDisabled();
    }

    goForward(activeSlide, toGo) {
        for (let i = activeSlide; i < toGo; i++) {
            console.log(this.sliderTracker[i], i, i - 1);
            this.sliderTracker[i].classList.remove(
                "slider__item--shown"
            );
            this.sliderTracker[i].classList.add(
                "slider__item--right"
            );
            this.sliderTracker[i + 1].classList.remove(
                "slider__item--left"
            );
            this.sliderTracker[i + 1].classList.add(
                "slider__item--shown"
            );

            this.bulletsActivation(i+1);

            this.arrowRight.dataset["goto"] = i + 2;
            this.arrowLeft.dataset["goto"] = i;

        }
        this.checkIfDisabled();
    }

    getActivatedBulletSlider() {
        for (const el of this.bullets.querySelectorAll(".bullets__item")) {
            if (el.classList.contains("active")) {
                return +el.dataset["slider"];
            }
        }
    }
}

const slider = new Slider(
    ".slider__items",
    ".slider__item",
    ".bullets__items",
    ".arrow-right",
    ".arrow-left"
);