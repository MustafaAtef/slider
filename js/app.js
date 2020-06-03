class Slider {
    constructor(sliderContainer, options) {
        // define a property to check if there is an error in any point and stop work
        this.error = 0;
        // 1) get slider container element
        this.sliderContainer = document.querySelector(sliderContainer);
        // define controls property
        this.controls = options.controls;
        this.slidingWay = options.slidingWay || "slider";
        // 2) handle the slider base on options
        this.sliderHandler();
    }

    sliderHandler() {
        if (!this.controls || !this.slidingWay) {
            this.error = 1;
            return;
        }
        if (
            this.controls.indexOf("arrows") !== -1 ||
            this.controls.indexOf("bullets") !== -1
        ) {
            let sliderItems = this.sliderContainer.querySelectorAll(
                ".slider__item"
            );
            this.sliderItemsLength = sliderItems.length;
            this.sliderTracker = {};
            for (let i = 0; i < this.sliderItemsLength; i++) {
                sliderItems[i].dataset.order = i;
                this.sliderTracker[i] = sliderItems[i];
            }
            let controlElem = document.createElement("div");
            controlElem.classList.add("slider-controls");
            if (this.controls.indexOf("arrows") !== -1) {
                const arrowElement = this.createArrowElement();
                controlElem.appendChild(arrowElement.container);
                this.arrowRight = arrowElement.rightArrow;
                this.arrowLeft = arrowElement.leftArrow;
                if (this.slidingWay == "slider") {
                    for (let i = 0; i < this.sliderItemsLength; i++) {
                        if (i == 0)
                            this.sliderTracker[i].classList.add(
                                "slider__item--shown"
                            );
                        else
                            this.sliderTracker[i].classList.add(
                                "slider__item--left"
                            );
                    }
                } else if (this.slidingWay == "fade") {
                    for (let i = 0; i < this.sliderItemsLength; i++) {
                        if (i == 0) {
                            this.sliderTracker[i].classList.add(
                                "slider__item--fade",
                                "slider__fade--in"
                            );
                        } else {
                            this.sliderTracker[i].classList.add(
                                "slider__item--fade"
                            );
                        }
                    }
                }
                this.arrowRight.addEventListener(
                    "click",
                    this.sliderArrowRightHandler.bind(this)
                );
                this.arrowLeft.addEventListener(
                    "click",
                    this.sliderArrowLeftHandler.bind(this)
                );
            }
            if (this.controls.indexOf("bullets") !== -1) {
                let bulletsContainer = this.createBulletElement();
                controlElem.appendChild(bulletsContainer.bulletsContainer);
                this.bulletsList = bulletsContainer.bulletsList;
                if (this.slidingWay == "slider") {
                    for (let i = 0; i < this.sliderItemsLength; i++) {
                        if (i == 0)
                            this.sliderTracker[i].classList.add(
                                "slider__item--shown"
                            );
                        else
                            this.sliderTracker[i].classList.add(
                                "slider__item--left"
                            );
                    }
                } else if (this.slidingWay == "fade") {
                    for (let i = 0; i < this.sliderItemsLength; i++) {
                        if (i == 0)
                            this.sliderTracker[i].classList.add(
                                "slider__item--fade",
                                "slider__fade--in"
                            );
                        else
                            this.sliderTracker[i].classList.add(
                                "slider__item--fade"
                            );
                    }
                    bulletsContainer.bulletsList.addEventListener(
                        "click",
                        this.bulletsHandler.bind(this)
                    );
                }
                bulletsContainer.bulletsList.addEventListener(
                    "click",
                    this.bulletsHandler.bind(this)
                );
            }

            this.sliderContainer.appendChild(controlElem);
        }
    }

    createArrowElement() {
        let sliderControlsArrows = document.createElement("div");
        sliderControlsArrows.classList.add("slider__controls--arrows");
        let arrowRightElem = document.createElement("div");
        arrowRightElem.classList.add("arrow-right");
        arrowRightElem.dataset["goto"] = 1;
        let arrowRightImg = document.createElement("img");
        arrowRightImg.src = "./images/arrow_right.svg";
        let arrowLeftElem = document.createElement("div");
        arrowLeftElem.classList.add("arrow-left");
        arrowLeftElem.dataset["goto"] = -1;
        let arrowLeftImg = document.createElement("img");
        arrowLeftImg.src = "./images/arrow_left.svg";
        arrowLeftElem.appendChild(arrowLeftImg);
        arrowRightElem.appendChild(arrowRightImg);
        sliderControlsArrows.appendChild(arrowRightElem);
        sliderControlsArrows.appendChild(arrowLeftElem);

        return {
            container: sliderControlsArrows,
            rightArrow: arrowRightElem,
            leftArrow: arrowLeftElem,
        };
    }

    createBulletElement() {
        let sliderControlsBullet = document.createElement("div");
        sliderControlsBullet.classList.add(".slider__controls--bullets");
        let bulletsList = document.createElement("ul");
        bulletsList.classList.add("bullets__items");
        let bulletsLi = ``;
        for (let i = 0; i < this.sliderItemsLength; i++) {
            if (i == 0)
                bulletsLi += `<li class="bullets__item active" data-slider="${i}"></li>`;
            else
                bulletsLi += `<li class="bullets__item" data-slider="${i}"></li>`;
        }
        bulletsList.innerHTML = bulletsLi;
        sliderControlsBullet.appendChild(bulletsList);
        return {
            bulletsContainer: sliderControlsBullet,
            bulletsList,
        };
    }

    sliderArrowRightHandler() {
        // get the goTo dataset
        let goTo = +this.arrowRight.dataset["goto"];
        // check if the item is the last
        if (goTo == this.sliderItemsLength) {
            // disable
            return;
        }
        if (this.slidingWay == "slider") {
            // add class right to goTo slide - 1
            this.sliderTracker[goTo - 1].classList.remove(
                "slider__item--shown"
            );
            this.sliderTracker[goTo - 1].classList.add("slider__item--right");
            // add class shown to goTo
            this.sliderTracker[goTo].classList.remove("slider__item--left");
            this.sliderTracker[goTo].classList.add("slider__item--shown");
        } else if (this.slidingWay == "fade") {
            this.sliderTracker[goTo - 1].classList.remove("slider__fade--in");
            this.sliderTracker[goTo].classList.add("slider__fade--in");
        }

        // active the correct bullet
        if (this.controls.indexOf("bullets") !== -1)
            this.bulletsActivation(goTo);
        // increase arrow right  goTo dataset
        this.arrowRight.dataset["goto"]++;
        // icrease arrow left goTo dataset
        this.arrowLeft.dataset["goto"]++;
        // check both arrows if the slide is the end of elements and add class to it
        this.checkIfDisabled();
    }

    sliderArrowLeftHandler() {
        // get the goTo dataset
        let goTo = +this.arrowLeft.dataset["goto"];
        // check if the item is the last
        if (goTo < 0) {
            // disable
            return;
        }
        if (this.slidingWay == "slider") {
            // add class right to goTo slide - 1
            this.sliderTracker[goTo + 1].classList.remove(
                "slider__item--shown"
            );
            this.sliderTracker[goTo + 1].classList.add("slider__item--left");
            // add class shown to goTo
            this.sliderTracker[goTo].classList.remove("slider__item--right");
            this.sliderTracker[goTo].classList.add("slider__item--shown");
        } else if (this.slidingWay == "fade") {
            this.sliderTracker[goTo + 1].classList.remove("slider__fade--in");
            this.sliderTracker[goTo].classList.add("slider__fade--in");
        }
        // active the correct bullet
        if (this.controls.indexOf("bullets") !== -1)
            this.bulletsActivation(goTo);
        // increase arrow right  goTo dataset
        this.arrowRight.dataset["goto"]--;
        // icrease arrow left goTo dataset
        this.arrowLeft.dataset["goto"]--;
        // check both arrows if the slide is the end of elements and add class to it
        this.checkIfDisabled();
    }

    checkIfDisabled() {
        if (+this.arrowRight.dataset["goto"] == this.sliderItemsLength)
            this.arrowRight.classList.add("disabled");
        else this.arrowRight.classList.remove("disabled");
        if (+this.arrowLeft.dataset["goto"] < 0)
            this.arrowLeft.classList.add("disabled");
        else this.arrowLeft.classList.remove("disabled");
    }

    bulletsActivation(goTo) {
        this.bulletsList.querySelectorAll(".bullets__item").forEach((el) => {
            el.classList.remove("active");
            if (+el.dataset["slider"] == goTo) el.classList.add("active");
        });
    }

    bulletsHandler(e) {
        if (e.target.closest("li")) {
            let toGo = +e.target.closest("li").dataset["slider"];
            let activeSlide = this.getActivatedBulletSlider();
            if (activeSlide > toGo) {
                this.goBack(activeSlide, toGo);
            }

            if (activeSlide < toGo) {
                this.goForward(activeSlide, toGo);
            }
        }
    }

    goBack(activeSlide, toGo) {
        if (this.slidingWay == "slider") {
            for (let i = activeSlide; i > toGo; i--) {
                this.sliderTracker[i].classList.remove("slider__item--shown");
                this.sliderTracker[i].classList.add("slider__item--left");
                this.sliderTracker[i - 1].classList.remove(
                    "slider__item--right"
                );
                this.sliderTracker[i - 1].classList.add("slider__item--shown");

                this.bulletsActivation(i - 1);

                if (this.controls.indexOf("arrows") !== -1) {
                    this.arrowRight.dataset["goto"] = i;
                    this.arrowLeft.dataset["goto"] = i - 2;
                }
            }
        } else if (this.slidingWay == "fade") {
            this.sliderTracker[activeSlide].classList.remove(
                "slider__fade--in"
            );
            this.sliderTracker[toGo].classList.add("slider__fade--in");
            this.bulletsActivation(toGo);
            if (this.controls.indexOf("arrows") !== -1) {
                this.arrowRight.dataset["goto"] = toGo + 1;
                this.arrowLeft.dataset["goto"] = toGo - 1;
            }
        }

        this.checkIfDisabled();
    }

    goForward(activeSlide, toGo) {
        if (this.slidingWay == "slider") {
            for (let i = activeSlide; i < toGo; i++) {
                this.sliderTracker[i].classList.remove("slider__item--shown");
                this.sliderTracker[i].classList.add("slider__item--right");
                this.sliderTracker[i + 1].classList.remove(
                    "slider__item--left"
                );
                this.sliderTracker[i + 1].classList.add("slider__item--shown");

                this.bulletsActivation(i + 1);
                if (this.controls.indexOf("arrows") !== -1) {
                    this.arrowRight.dataset["goto"] = i + 2;
                    this.arrowLeft.dataset["goto"] = i;
                }
            }
        } else if (this.slidingWay == "fade") {
            this.sliderTracker[activeSlide].classList.remove(
                "slider__fade--in"
            );
            this.sliderTracker[toGo].classList.add("slider__fade--in");
            this.bulletsActivation(toGo);
            if (this.controls.indexOf("arrows") !== -1) {
                this.arrowRight.dataset["goto"] = toGo + 1;
                this.arrowLeft.dataset["goto"] = toGo - 1;
            }
        }

        this.checkIfDisabled();
    }

    getActivatedBulletSlider() {
        for (const el of this.bulletsList.querySelectorAll(".bullets__item")) {
            if (el.classList.contains("active")) {
                return +el.dataset["slider"];
            }
        }
    }
}

const slider = new Slider(".slider", {
    controls: ["arrows", "bullets"],
    slidingWay: "fade",
});
