import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _numPages;

  addHanderClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('button');

      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      if (!isFinite(goToPage) || goToPage > this._numPages || goToPage < 1)
        return;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currentPage = this._data.page;

    if (currentPage === 1 && this._numPages > 1) {
      return this._generateMarkupNextButton(currentPage);
    }

    if (currentPage === this._numPages && this._numPages > 1) {
      return this._generateMarkupPrevButton(currentPage);
    }

    if (currentPage < this._numPages) {
      return [
        this._generateMarkupPrevButton(currentPage),
        this._generateMarkupNextButton(currentPage),
      ].join('');
    }

    return '';
  }

  _generateMarkupNextButton(currentPage) {
    return `<button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
  _generateMarkupPrevButton(currentPage) {
    return `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>`;
  }
}

export default new PaginationView();
