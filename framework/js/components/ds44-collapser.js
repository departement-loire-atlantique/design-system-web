// Collapser ds44
(function (window) {
    function ds44() {
        var _ds44 = {};

        // Composant expandable
        _ds44.expandable = function (querySelector) {
            const toggler = document.querySelectorAll(querySelector); // element(s) by id or class css
            let currentElementOpened = null;

            //Bind event on click
            toggler.forEach((element) => {
                element.addEventListener('click', () => {
                    showCurrentBlocExpandable(element);
                })
            });

            let showCurrentBlocExpandable = function (element) {
                const panel = element.nextElementSibling;

                currentElementOpened = element;
                element.classList.toggle('show');
                panel.style.maxHeight = (panel.style.maxHeight) ? null : panel.scrollHeight + 60 + "px";
                element.setAttribute('aria-expanded', 'true');
                hideAllOtherBlock();
            }

            let hideAllOtherBlock = function () {
                const elementsToHide = document.querySelectorAll(querySelector + '.show');
                elementsToHide.forEach((elementToHide) => {
                    if (elementToHide !== currentElementOpened) {
                        let panel = elementToHide.nextElementSibling;
                        elementToHide.classList.remove('show');
                        panel.style.maxHeight = null;
                        elementToHide.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        };

        // Composant popup
        _ds44.popup = function () {
            const modalComponents = document.querySelectorAll('[data-js="ds44-modal"]');

            //Bind les événements pour chacun des boutons
            modalComponents.forEach((button) => {
                button.addEventListener('click', () => {
                    const modalId = (button.dataset.target) ? button.dataset.target : null;
                    const modal = document.querySelector(modalId);
                    if (modal) {
                        _getFocusOnPopup(modal);
                        modal.classList.toggle('is-visible');
                        const closeButton = modal.querySelector('[data-js="ds44-modal-action-close"]');
                        closeButton.addEventListener('click', () => {
                            _closePopup();
                        });

                        modal.addEventListener('click', (event) => {
                            if(modal == event.target){
                                _closePopup();
                            }
                        });
                    }
                })
            });

            //Bind événement lié au document ( bouton échap )
            window.document.addEventListener("keyup", (e) => {
                if (e.key === "Escape") {
                    _closePopup();
                }
            });

            let _closePopup = function () {
                const currentModal = document.querySelector('.is-visible');
                if (currentModal) {
                    currentModal.classList.toggle('is-visible');
                }

                let allOtherField = document.querySelectorAll('input, button, textarea, a, select');
                allOtherField.forEach((element) => {
                    element.tabIndex = element.oldTabIndex
                });

            }

            let _getFocusOnPopup = function (modal) {
                let firstField = modal.querySelector('input, button, textarea, a, select');
                let allFields = modal.querySelectorAll('input, button, textarea, a, select');
                let tabIndex = 1;

                disableTabIndex();
                setIndexForModalElements();
                firstField.focus();

                modal.addEventListener('focusout', dontAllowFocusOnOtherElements);

                function disableTabIndex() {
                    var allOtherField = document.querySelectorAll('input, button, textarea, a, select');
                    allOtherField.forEach((element) => {
                        element.oldTabIndex = element.tabIndex;
                        element.tabIndex = 0;
                    });
                }

                function setIndexForModalElements() {
                    allFields.forEach((element) => {
                        element.tabIndex = tabIndex++;
                    });
                }

                function dontAllowFocusOnOtherElements(event) {
                    event.stopPropagation();

                    if (!modal.contains(event.relatedTarget) || event.relatedTarget == null) {
                        firstField.focus();
                        return false;
                    }
                    modal.focus();
                }
            }
        };

        _ds44.setFocus = function (selector, params) {
            document.getElementsByTagName('body')[0].classList.add('fullHeight');
            let elementToFocus = (typeof selector === "string") ? document.querySelector(selector) : selector;

            //Selon la configuration , on va autorisé le masquage du focus soit au click soit via le bouton échap
            if (params) {
                function escapeFunction(evt) {
                    evt = evt || window.event;
                    if (evt.keyCode == 27) {
                        deleteExistingFocus();
                        document.removeEventListener('keydown', escapeFunction);
                    }
                };
                document.addEventListener('keydown', escapeFunction);
            }

            //Pour ne pas effectuer un focus sur une des divs de focus
            if (elementToFocus.classList.contains('focus-background')) {
                return;
            }

            let offsetElement = getOffset(elementToFocus);

            deleteExistingFocus();

            function deleteExistingFocus() {
                let existingDiv = document.querySelectorAll('.focus-background');

                if (existingDiv.length) {
                    existingDiv.forEach((divToDelete) => {
                        divToDelete.parentNode.removeChild(divToDelete);
                    });
                    document.getElementsByTagName('body')[0].classList.remove('fullHeight');
                }

            }

            function getOffset(el) {
                var _x = 0;
                var _y = -el.clientTop;
                while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                    _x += el.offsetLeft - el.scrollLeft;
                    _y += el.offsetTop - el.scrollTop;
                    el = el.offsetParent;
                }
                return {top: _y - window.scrollY, left: _x - window.scrollX};
            }

            function createDiv(styles) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("focus-background");
                styles = Object.keys(styles).reduce((acc, key) => {
                    acc[key] = styles[key] + 'px';
                    return acc;
                }, {});
                Object.assign(newDiv.style, styles);
                return newDiv;
            }

            const newDivLeft = createDiv({
                top: 0,
                bottom: 0,
                left: 0,
                width: offsetElement.left
            });

            const newDivTop = createDiv({
                top: 0,
                height: offsetElement.top,
                left: offsetElement.left,
                width: elementToFocus.offsetWidth
            });

            const newDivRight = createDiv({
                top: 0,
                bottom: 0,
                left: offsetElement.left + elementToFocus.offsetWidth,
                right: 0
            });

            const newDivBottom = createDiv({
                top: offsetElement.top + elementToFocus.offsetHeight,
                bottom: 0,
                left: offsetElement.left,
                width: elementToFocus.offsetWidth,
            });

            document.body.appendChild(newDivLeft);
            document.body.appendChild(newDivTop);
            document.body.appendChild(newDivRight);
            document.body.appendChild(newDivBottom);
        }

        return _ds44;
    }

// On rend accessible notre librairie
    if (typeof (window.ds44) === 'undefined') {
        window.ds44 = ds44();
    }
})(window); // Création de la closure en passant en paramètre le scope global


//Initialisation des composants collapse
ds44.expandable('.ds44-collapser_button');
//Initialisation des composants de popup
/*
Utilisation :
sur un lien, ou bouton ou autre élément html , ajouter ces deux attributs :
data-js="ds44-modal" data-target="#ds44-modal-exemple"

data-js="ds44-modal" , permet de définir l'élément qui servira à afficher la popup lors d'un clic
data-target="#ds44-modal-exemple" , permet de définir la popup, via un id ou une class css unique /!\
 */
ds44.popup();

/*
Utilisation du composant de mise en avant
indiquer le sélecteur en paramètre ( id/class )
le second paramètre permet d'activer le bouton echap
true ou false
*/
ds44.setFocus('#focusable', true);

//Démonstration sur l'événement click, met en avant l'élément sur lequel on a cliqué
/*
document.addEventListener('click', function (e) {

    e.preventDefault();
    let element = e.target;
    ds44.setFocus(element, true);

}, true);
*/
