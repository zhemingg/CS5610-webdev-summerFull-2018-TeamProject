(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Observable'), require('rxjs/observable/EmptyObservable')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Observable', 'rxjs/observable/EmptyObservable'], factory) :
	(factory((global['ng-masonry-grid'] = {}),global.core,global.common,global.Observable,global.EmptyObservable));
}(this, (function (exports,core,common,Observable,EmptyObservable) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shailendra Kumar <shailu.snist@gmail.com>
 * @ignore
 */
var NgMasonryGridService = (function () {
    function NgMasonryGridService(_platformId) {
        this._platformId = _platformId;
        this.items = [];
        this.itemsCount = 0;
        this.itemsRenderedCount = 0;
        this.isAnimate = false;
        this.docElem = window.document.documentElement;
        /**
         * Default animation options of grid items on scroll
         */
        this.animationDefaults = {
            animationEffect: 'effect-1',
            // default animation effect-1
            // Minimum and a maximum duration of the animation (random value is chosen)
            minDuration: 0,
            maxDuration: 0,
            // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
            // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport.
            // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
            viewportFactor: 0
        };
        /**
         * Default masonry options
         */
        this.masonryDefaults = {
            // Set default itemSelector: mandatory
            itemSelector: '[ng-masonry-grid-item], ng-masonry-grid-item, [ng-masonry-grid-item].animate, ng-masonry-grid-item.animate',
            initLayout: false,
            addStatus: 'append' // 'prepend' or 'add' or 'reorder'
        };
        this._onScrollHandler = this._onScrollFn.bind(this);
        this._onResizeHandler = this._resizeHandler.bind(this);
    }
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype.getViewportH = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ client = this.docElem['clientHeight'], /** @type {?} */
        inner = window['innerHeight'];
        if (client < inner) {
            return inner;
        }
        else {
            return client;
        }
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype.scrollY = /**
     * @return {?}
     */
    function () {
        return window.pageYOffset || this.docElem.scrollTop;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    NgMasonryGridService.prototype.getOffset = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        var /** @type {?} */ offsetTop = 0, /** @type {?} */ offsetLeft = 0;
        do {
            if (!isNaN(el.offsetTop)) {
                offsetTop += el.offsetTop;
            }
            if (!isNaN(el.offsetLeft)) {
                offsetLeft += el.offsetLeft;
            }
        } while (el = el.offsetParent);
        return {
            top: offsetTop,
            left: offsetLeft
        };
    };
    /**
     * @param {?} el
     * @param {?=} h
     * @return {?}
     */
    NgMasonryGridService.prototype.inViewport = /**
     * @param {?} el
     * @param {?=} h
     * @return {?}
     */
    function (el, h) {
        if (h === void 0) { h = 0; }
        var /** @type {?} */ elH = el.offsetHeight, /** @type {?} */
        scrolled = this.scrollY(), /** @type {?} */
        viewed = scrolled + this.getViewportH(), /** @type {?} */
        elTop = this.getOffset(el).top, /** @type {?} */
        elBottom = elTop + elH;
        // if 0, the element is considered in the viewport as soon as it enters.
        // if 1, the element is considered in the viewport only when it's fully inside
        // value in percentage (1 >= h >= 0)
        // h = h || 0;
        return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
    };
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    NgMasonryGridService.prototype.extend = /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        for (var /** @type {?} */ key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };
    /**
     * Initialize and extend all options
     * @param {?} el
     * @param {?} masonryOptions
     * @param {?=} useAnimation
     * @param {?=} animationOptions
     * @param {?=} useImagesLoaded
     * @return {?}
     */
    NgMasonryGridService.prototype.init = /**
     * Initialize and extend all options
     * @param {?} el
     * @param {?} masonryOptions
     * @param {?=} useAnimation
     * @param {?=} animationOptions
     * @param {?=} useImagesLoaded
     * @return {?}
     */
    function (el, masonryOptions, useAnimation, animationOptions, useImagesLoaded) {
        this.useAnimation = useAnimation;
        this.el = el;
        this.isAnimate = this.useAnimation || (animationOptions ? true : false);
        this.useImagesLoaded = useImagesLoaded;
        this.masonryOptions = this.extend(this.masonryDefaults, masonryOptions);
        this.animationOptions = this.extend(this.animationDefaults, animationOptions);
        return this._init();
    };
    /**
     * @param {?} _element
     * @param {?} options
     * @return {?}
     */
    NgMasonryGridService.prototype.initializeMasonry = /**
     * @param {?} _element
     * @param {?} options
     * @return {?}
     */
    function (_element, options) {
        var /** @type {?} */ Masonry = require('masonry-layout');
        return new Masonry(_element, options);
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype._init = /**
     * @return {?}
     */
    function () {
        if (this.isAnimate) {
            // add animation effect
            this.el.classList.add(this.animationOptions.animationEffect);
        }
        // get imagesloaded libary instance
        if (this.useImagesLoaded) {
            this.imagesLoaded = require('imagesloaded');
        }
        // check if browser and then intialize Masonry
        if (common.isPlatformBrowser(this._platformId)) {
            return this._initMasonry();
        }
        return null;
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype._initMasonry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // initialize masonry
        this._msnry = this.initializeMasonry(this.el, this.masonryOptions);
        // use animation options if useAnimation is true
        if (this.isAnimate && this._msnry) {
            // animate on scroll the items inside the viewport
            window.addEventListener('scroll', this._onScrollHandler, false);
            window.addEventListener('resize', this._onResizeHandler, false);
            /**
                   * Remove scroll animations to remove conflicts between Masonry Transitions and Scroll Animations
                   */
            this._msnry.on('layoutComplete', function (items) {
                Array.prototype.slice.call(_this.el.children).forEach(function (element) {
                    element.classList.remove('animate');
                });
            });
            this._msnry.on('removeComplete', function (items) {
                Array.prototype.slice.call(_this.el.children).forEach(function (element) {
                    element.classList.remove('animate');
                });
                _this._msnry.layout();
            });
        }
        return this._msnry;
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype._onScrollFn = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ self = this;
        if (!this.didScroll) {
            this.didScroll = true;
            setTimeout(function () { self._scrollPage(); }, 100);
        }
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype._scrollPage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ self = this;
        var /** @type {?} */ items = this._msnry.items.map(function (item) { return item.element; });
        if (items.length) {
            items.forEach(function (el, i) {
                if (_this.inViewport(el, self.animationOptions.viewportFactor)) {
                    // setTimeout( () => {
                    var /** @type {?} */ perspY = _this.scrollY() + _this.getViewportH() / 2;
                    self.el.style.WebkitPerspectiveOrigin = '50% ' + perspY + 'px';
                    self.el.style.MozPerspectiveOrigin = '50% ' + perspY + 'px';
                    self.el.style.perspectiveOrigin = '50% ' + perspY + 'px';
                    if (self.animationOptions.minDuration && self.animationOptions.maxDuration) {
                        var /** @type {?} */ randDuration = (Math.random() * (self.animationOptions.maxDuration - self.animationOptions.minDuration)
                            + self.animationOptions.minDuration) + 's';
                        el.style.WebkitAnimationDuration = randDuration;
                        el.style.MozAnimationDuration = randDuration;
                        el.style.animationDuration = randDuration;
                    }
                    el.classList.add('animate');
                    // }, 25 );
                }
                else {
                    el.classList.remove('animate');
                }
            });
        }
        this.didScroll = false;
    };
    /**
     * @return {?}
     */
    NgMasonryGridService.prototype._resizeHandler = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ self = this;
        Array.prototype.slice.call(this.el.children).forEach(function (element) {
            element.classList.remove('animate');
        });
        /**
         * @return {?}
         */
        function delayed() {
            self._scrollPage();
            self.resizeTimeout = null;
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(delayed, 500);
    };
    /**
     * Check if total grid items are redered in the DOM
     * @return {?}
     */
    NgMasonryGridService.prototype._checkTotalRendered = /**
     * Check if total grid items are redered in the DOM
     * @return {?}
     */
    function () {
        ++this.itemsRenderedCount;
        if (this.itemsRenderedCount === this.itemsCount) {
            window.removeEventListener('scroll', this._onScrollHandler, false);
        }
    };
    /**
     * On Destroy remove Scroll and Resize event Listeners
     * @return {?}
     */
    NgMasonryGridService.prototype.onDestory = /**
     * On Destroy remove Scroll and Resize event Listeners
     * @return {?}
     */
    function () {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        window.removeEventListener('resize', this._onResizeHandler, false);
    };
    /**
     * Remove scroll animations
     * @return {?}
     */
    NgMasonryGridService.prototype.removeAnimation = /**
     * Remove scroll animations
     * @return {?}
     */
    function () {
        if (this.isAnimate) {
            Array.prototype.slice.call(this.el.children).forEach(function (element) {
                element.classList.remove('animate');
            });
        }
    };
    /**
     * Add Each grid item to Masonry based on Masony addStatus property
     * @param {?} element Element - Grid item
     * @return {?}
     */
    NgMasonryGridService.prototype.add = /**
     * Add Each grid item to Masonry based on Masony addStatus property
     * @param {?} element Element - Grid item
     * @return {?}
     */
    function (element) {
        var _this = this;
        var /** @type {?} */ addStatus = this.masonryOptions.addStatus.toLowerCase();
        // set margin bottom of gutter value.
        if (this.masonryOptions.gutter) {
            element.style.marginBottom = this.masonryOptions.gutter + 'px';
        }
        if (this.el.hasChildNodes() && this.el.contains(element)) {
            this.el.removeChild(element);
        }
        if (this.useImagesLoaded) {
            setTimeout(function () {
                _this.imagesLoaded(element, function (instance) {
                    ++_this.itemsRenderedCount;
                    _this.items.push(element);
                    // append or prepend based on masonry option
                    if (addStatus === 'prepend') {
                        if (_this._msnry.items.length !== 0) {
                            _this.el.insertBefore(element, _this._msnry.items[0].element);
                        }
                        else {
                            _this.el.appendChild(element);
                        }
                    }
                    else if (addStatus === 'append') {
                        _this.el.appendChild(element);
                    }
                    else {
                        _this.el.appendChild(element);
                    }
                    setTimeout(function () {
                        if (addStatus === 'prepend') {
                            if (_this._msnry.items.length !== 0) {
                                _this._msnry.prepended(element);
                            }
                            else {
                                _this._msnry.appended(element);
                            }
                        }
                        else if (addStatus === 'append') {
                            _this._msnry.appended(element);
                        }
                        else {
                            _this._msnry.addItems(element);
                        }
                        _this._msnry.layout();
                    }, 0);
                });
            }, 0);
        }
        else {
            setTimeout(function () {
                ++_this.itemsRenderedCount;
                _this.items.push(element);
                if (addStatus === 'prepend') {
                    if (_this._msnry.items.length !== 0) {
                        _this.el.insertBefore(element, _this._msnry.items[0].element);
                        // this._msnry.prepended(itemElem);
                    }
                    else {
                        _this.el.appendChild(element);
                        // this._msnry.appended(itemElem);
                    }
                }
                else if (addStatus === 'append') {
                    _this.el.appendChild(element);
                    // this._msnry.appended(itemElem);
                }
                else {
                    _this.el.appendChild(element);
                    // this._msnry.addItems(itemElem);
                }
                setTimeout(function () {
                    if (addStatus === 'prepend') {
                        if (_this._msnry.items.length !== 0) {
                            _this._msnry.prepended(element);
                        }
                        else {
                            _this._msnry.appended(element);
                        }
                    }
                    else if (addStatus === 'append') {
                        _this._msnry.appended(element);
                    }
                    else {
                        _this._msnry.addItems(element);
                    }
                    _this._msnry.layout();
                }, 50);
            }, 0);
        }
    };
    /**
     * TODO: reorder masonry items on load
     * @param {?} element
     * @return {?}
     */
    NgMasonryGridService.prototype.addOrderItem = /**
     * TODO: reorder masonry items on load
     * @param {?} element
     * @return {?}
     */
    function (element) {
        var _this = this;
        var /** @type {?} */ addStatus = this.masonryOptions.addStatus.toLowerCase();
        // set margin bottom of gutter value.
        if (this.masonryOptions.gutter) {
            element.style.marginBottom = this.masonryOptions.gutter + 'px';
        }
        if (this.useImagesLoaded) {
            setTimeout(function () {
                _this.imagesLoaded(element, function (instance) {
                });
            }, 0);
        }
        else {
            setTimeout(function () {
                if (addStatus === 'prepend') {
                    if (_this._msnry.items.length !== 0) {
                        _this.el.insertBefore(element, _this._msnry.items[0].element);
                        // this._msnry.prepended(element);
                    }
                    else {
                        _this.el.appendChild(element);
                        // this._msnry.appended(element);
                    }
                }
                else if (addStatus === 'append') {
                    _this.el.appendChild(element);
                    // this._msnry.appended(element);
                }
                else {
                    _this.el.appendChild(element);
                    // this._msnry.addItems(element);
                }
                setTimeout(function () {
                    if (_this.itemsRenderedCount === _this.itemsCount) {
                        if (addStatus === 'prepend') {
                            if (_this._msnry.items.length !== 0) {
                                _this._msnry.prepended(element);
                                _this._msnry.layout();
                            }
                            else {
                                _this._msnry.appended(element);
                                _this._msnry.layout();
                            }
                        }
                        else if (addStatus === 'append') {
                            _this._msnry.appended(element);
                            _this._msnry.layout();
                        }
                        else {
                            _this._msnry.addItems(element);
                            _this._msnry.layout();
                        }
                    }
                }, 500);
            }, 0);
        }
    };
    /**
     * Re order Masonry items to original order
     * @return {?}
     */
    NgMasonryGridService.prototype.reorderMasonryItems = /**
     * Re order Masonry items to original order
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.itemsRenderedCount === this.itemsCount) {
            var /** @type {?} */ reorderItems_1 = this.items.sort(function (a, b) {
                return a.dataset.count - b.dataset.count;
            });
            while (this.el.hasChildNodes()) {
                this.el.removeChild(this.el.lastChild);
            }
            setTimeout(function () {
                reorderItems_1.forEach(function (item) {
                    _this.el.appendChild(item);
                    _this._msnry.appended(item);
                });
                if (_this._msnry) {
                    _this._msnry.reloadItems();
                    _this._msnry.layout();
                }
            }, 100);
        }
    };
    /**
     * Set add status to Masonry before adding or appending
     * @param {?} value 'append' or 'prepend' or 'add'
     * @return {?}
     */
    NgMasonryGridService.prototype.setAddStatus = /**
     * Set add status to Masonry before adding or appending
     * @param {?} value 'append' or 'prepend' or 'add'
     * @return {?}
     */
    function (value) {
        this.masonryOptions.addStatus = value;
    };
    /**
     * Remove grid item from Masonry
     * @param {?} item Element: Removed Grid Item DOM
     * @return {?}
     */
    NgMasonryGridService.prototype.removeItem = /**
     * Remove grid item from Masonry
     * @param {?} item Element: Removed Grid Item DOM
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.removeAnimation();
        if (item) {
            item.classList.remove('animate');
            var /** @type {?} */ obsv = new Observable.Observable(function (observer) {
                var /** @type {?} */ count = item.getAttribute('data-count');
                var /** @type {?} */ index = _this._msnry.items.findIndex(function (masonryItem) {
                    return masonryItem.element.getAttribute('data-count') === count;
                });
                setTimeout(function () {
                    var /** @type {?} */ elem = _this._msnry.items[index].element;
                    _this._onTransitionEnd(observer, elem);
                    var /** @type {?} */ indx = _this.items.findIndex(function (element) {
                        return element.dataset.count === item.dataset.count;
                    });
                    _this.items.splice(indx, 1);
                }, 20);
            });
            return obsv;
        }
        return new EmptyObservable.EmptyObservable();
    };
    /**
     * Remove first grid item from the Masonry List
     * @return {?}
     */
    NgMasonryGridService.prototype.removeFirstItem = /**
     * Remove first grid item from the Masonry List
     * @return {?}
     */
    function () {
        var _this = this;
        this.removeAnimation();
        if (this._msnry.items.length) {
            this._msnry.items[0].element.classList.remove('animate');
            var /** @type {?} */ obsv = new Observable.Observable(function (observer) {
                setTimeout(function () {
                    _this._onTransitionEnd(observer, _this._msnry.items[0].element);
                    _this.items.splice(0, 1);
                }, 10);
            });
            return obsv;
        }
        return new EmptyObservable.EmptyObservable();
    };
    /**
     * Empty the Masonry list
     * @return {?}
     */
    NgMasonryGridService.prototype.removeAllItems = /**
     * Empty the Masonry list
     * @return {?}
     */
    function () {
        var _this = this;
        this.removeAnimation();
        var /** @type {?} */ obsv = new Observable.Observable(function (observer) {
            setTimeout(function () {
                var /** @type {?} */ items = [];
                _this._msnry.items.forEach(function (masonryItem, index) {
                    items.push({ element: masonryItem.element, index: index });
                    _this.addTransition(masonryItem.element);
                });
                var /** @type {?} */ elem = _this._msnry.items[_this._msnry.items.length - 1].element;
                var /** @type {?} */ transitionEnd = function () {
                    observer.next(items);
                    setTimeout(function () {
                        _this._msnry.reloadItems();
                        _this._msnry.layout();
                        _this.items = [];
                        _this.itemsCount = 0;
                        _this.itemsRenderedCount = 0;
                    }, 10);
                    elem.removeEventListener('transitionend', transitionEnd, false);
                };
                elem.addEventListener('transitionend', transitionEnd, false);
                if (_this.masonryOptions.transitionDuration === "0") {
                    transitionEnd();
                }
            }, 10);
        });
        return obsv;
    };
    /**
     * Add transition effect on DOM Node removal
     * @param {?} elem
     * @return {?}
     */
    NgMasonryGridService.prototype.addTransition = /**
     * Add transition effect on DOM Node removal
     * @param {?} elem
     * @return {?}
     */
    function (elem) {
        elem.style.transition = 'transform ' + this.masonryOptions.transitionDuration + ', opacity ' + this.masonryOptions.transitionDuration;
        elem.style.transform = 'scale(0.001)';
        elem.style.opacity = '0';
    };
    /**
     * On transition End, remove eventListener
     * @param {?} observer Subscriber<MasonryGridItem>
     * @param {?} elem
     * @return {?}
     */
    NgMasonryGridService.prototype._onTransitionEnd = /**
     * On transition End, remove eventListener
     * @param {?} observer Subscriber<MasonryGridItem>
     * @param {?} elem
     * @return {?}
     */
    function (observer, elem) {
        var _this = this;
        if (elem) {
            this.addTransition(elem);
            var /** @type {?} */ transitionEnd_1 = function () {
                var /** @type {?} */ isindex = Array.prototype.slice.call(_this.el.children).findIndex(function (element) {
                    return element.getAttribute('data-count') === elem.getAttribute('data-count');
                });
                if (isindex !== -1) {
                    observer.next({ element: elem, index: isindex });
                }
                setTimeout(function () {
                    _this._msnry.reloadItems();
                    _this._msnry.layout();
                }, 10);
                elem.removeEventListener('transitionend', transitionEnd_1, false);
            };
            elem.addEventListener('transitionend', transitionEnd_1, false);
        }
    };
    NgMasonryGridService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    NgMasonryGridService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
    ]; };
    return NgMasonryGridService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shailendra Kumar <shailu.snist@gmail.com>
 * @ignore
 */
var NgMasonryGridComponent = (function () {
    function NgMasonryGridComponent(_platformId, _element, masonryGridService) {
        this._platformId = _platformId;
        this._element = _element;
        this.masonryGridService = masonryGridService;
        // Inputs
        this.masonryOptions = {};
        this.useAnimation = false;
        this.useImagesLoaded = false;
        // Outputs
        this.layoutComplete = new core.EventEmitter();
        this.removeComplete = new core.EventEmitter();
        this.onNgMasonryInit = new core.EventEmitter();
    }
    /**
     * @return {?}
     */
    NgMasonryGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.add('grid');
        this.initializeMasonry();
    };
    /**
     * @return {?}
     */
    NgMasonryGridComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        // initialize masonry after View Initialization
        // this.initializeMasonry();
    };
    /**
     * @return {?}
     */
    NgMasonryGridComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._msnry) {
            this._msnry.destroy();
            this.masonryGridService.onDestory();
        }
    };
    /**
     * @return {?}
     */
    NgMasonryGridComponent.prototype.layout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this._msnry.layout();
        }, 50);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NgMasonryGridComponent.prototype.remove = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this._msnry.remove(element);
        this.layout();
    };
    /**
     * @param {?} element
     * @return {?}
     */
    NgMasonryGridComponent.prototype.add = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        this.masonryGridService.add(element);
    };
    /**
     * @return {?}
     */
    NgMasonryGridComponent.prototype.initializeMasonry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // initialize Masonry with Animation effects
        this._msnry = this.masonryGridService
            .init(this._element.nativeElement, this.masonryOptions, this.useAnimation, this.scrollAnimationOptions, this.useImagesLoaded);
        // Bind to Masonry events
        this._msnry.on('layoutComplete', function (items) {
            _this.layoutComplete.emit(items);
        });
        this._msnry.on('removeComplete', function (items) {
            _this.removeComplete.emit(items);
        });
        this._msnry.removeAnimation = function () {
            _this.masonryGridService.removeAnimation();
        };
        this._msnry.setAddStatus = function (value) {
            _this.masonryGridService.setAddStatus(value);
        };
        this._msnry.removeItem = function (item) {
            return _this.masonryGridService.removeItem(item);
        };
        this._msnry.removeFirstItem = function () {
            return _this.masonryGridService.removeFirstItem();
        };
        this._msnry.removeAllItems = function () {
            return _this.masonryGridService.removeAllItems();
        };
        this._msnry.reOrderItems = function () {
            return _this.masonryGridService.reorderMasonryItems();
        };
        // emit Masonry Initialization event
        this.onNgMasonryInit.emit(this._msnry);
        this.layout();
    };
    NgMasonryGridComponent.decorators = [
        { type: core.Component, args: [{
                    selector: '[ng-masonry-grid], ng-masonry-grid',
                    template: '<ng-content></ng-content>',
                    styles: [
                        "\n\t\t:host {\n\t\t\tdisplay: block;\n\t\t}\n\t"
                    ]
                },] },
    ];
    /** @nocollapse */
    NgMasonryGridComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
        { type: core.ElementRef, },
        { type: NgMasonryGridService, },
    ]; };
    NgMasonryGridComponent.propDecorators = {
        "masonryOptions": [{ type: core.Input },],
        "useAnimation": [{ type: core.Input },],
        "scrollAnimationOptions": [{ type: core.Input },],
        "useImagesLoaded": [{ type: core.Input },],
        "layoutComplete": [{ type: core.Output },],
        "removeComplete": [{ type: core.Output },],
        "onNgMasonryInit": [{ type: core.Output },],
    };
    return NgMasonryGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shailendra Kumar <shailu.snist@gmail.com>
 * @ignore
 */
var NgMasonryGridDirective = (function () {
    function NgMasonryGridDirective(_element, _parent, platformId, masonryGridService) {
        this._element = _element;
        this._parent = _parent;
        this.platformId = platformId;
        this.masonryGridService = masonryGridService;
    }
    /**
     * @return {?}
     */
    NgMasonryGridDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this._parent.add(this._element.nativeElement);
    };
    /**
     * Add Masonry grid item after view initialization
     */
    /**
     * Add Masonry grid item after view initialization
     * @return {?}
     */
    NgMasonryGridDirective.prototype.ngAfterViewInit = /**
     * Add Masonry grid item after view initialization
     * @return {?}
     */
    function () {
        if (common.isPlatformBrowser(this.platformId)) {
            this.masonryGridService.itemsCount++;
            // set count attribute for every grid item
            this._element.nativeElement.setAttribute('data-count', this.masonryGridService.itemsCount);
            // if (this.masonryGridService.masonryOptions.horizontalOrder) {
            //   this.masonryGridService.addOrderItem(this._element.nativeElement);
            // } else {
            //   this._parent.add(this._element.nativeElement);
            // }
            this._parent.add(this._element.nativeElement);
            this.watchForHtmlChanges();
        }
    };
    /**
     * @return {?}
     */
    NgMasonryGridDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * When HTML in brick changes dynamically, observe that and change layout
     * @return {?}
     */
    NgMasonryGridDirective.prototype.watchForHtmlChanges = /**
     * When HTML in brick changes dynamically, observe that and change layout
     * @return {?}
     */
    function () {
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        if (MutationObserver) {
            /**
             * Watch for any changes to subtree
             */
            var /** @type {?} */ self_1 = this;
            var /** @type {?} */ observer = new MutationObserver(function (mutations, observerFromElement) {
                self_1._parent.layout();
            });
            // define what element should be observed by the observer
            // and what types of mutations trigger the callback
            observer.observe(this._element.nativeElement, {
                subtree: true,
                childList: true
            });
        }
    };
    NgMasonryGridDirective.decorators = [
        { type: core.Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[ng-masonry-grid-item], ng-masonry-grid-item'
                },] },
    ];
    /** @nocollapse */
    NgMasonryGridDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: NgMasonryGridComponent, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return NgMasonryGridComponent; }),] },] },
        { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
        { type: NgMasonryGridService, },
    ]; };
    return NgMasonryGridDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Shailendra Kumar <shailu.snist@gmail.com>
 * @ignore
 */
var NgMasonryGridModule = (function () {
    function NgMasonryGridModule() {
    }
    NgMasonryGridModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    exports: [NgMasonryGridComponent, NgMasonryGridDirective],
                    declarations: [NgMasonryGridComponent, NgMasonryGridDirective],
                    providers: [NgMasonryGridService]
                },] },
    ];
    /** @nocollapse */
    NgMasonryGridModule.ctorParameters = function () { return []; };
    return NgMasonryGridModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Masonry Grid item
 */
var MasonryGridItem = (function () {
    function MasonryGridItem() {
    }
    return MasonryGridItem;
}());
/**
 * Masonry Options
 * @record
 */

/**
 * Masonry Object
 */
var Masonry = (function () {
    function Masonry(selector, options) {
    }
    
    return Masonry;
}());
/**
 * Scroll Animation options
 * @record
 */

/**
 * interface for an image currently loading or completed
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

exports.NgMasonryGridModule = NgMasonryGridModule;
exports.NgMasonryGridComponent = NgMasonryGridComponent;
exports.NgMasonryGridDirective = NgMasonryGridDirective;
exports.NgMasonryGridService = NgMasonryGridService;
exports.Masonry = Masonry;
exports.MasonryGridItem = MasonryGridItem;

Object.defineProperty(exports, '__esModule', { value: true });

})));
