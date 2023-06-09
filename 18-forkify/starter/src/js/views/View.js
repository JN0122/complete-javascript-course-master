import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render recived object to the DOM
   * @param {object | object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] If false, create makrup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Obejct} View instance
   * @author Jakub Niewelt
   * @todo Finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (render === false) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currentElements[i];

      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    this._clear();

    this._parentEl.insertAdjacentHTML(
      'afterbegin',
      `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div>`
    );
  }

  renderError(msg = this._errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${msg}</p>
  </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
