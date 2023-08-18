import { MenuActions } from './keys.constants';
import {
  filterOptions,
  getActionFromKey,
  getUpdatedIndex,
  isScrollable,
  maintainScrollVisibility,
} from './shared-functions';

// // init combo
// const aria12El = document.querySelector('.js-aria12');
// const aria12Component = new ComboAria12(aria12El, options);
// aria12Component.init();

export class AutoCompleteHelpers {
  el: any;
  inputEl: any;
  listboxEl: any;
  idBase: any;
  options: any;
  filteredOptions: any;
  activeIndex: number;
  open: boolean;
  ignoreBlur: any;

  constructor(el: any, options: any) {
    this.el = el;
    this.inputEl = el.querySelector('input');
    this.listboxEl = el.querySelector('[role=listbox]');

    // data
    this.idBase = this.inputEl.id;
    this.options = options;
    this.filteredOptions = options;

    // state
    this.activeIndex = 0;
    this.open = false;
  }
  init() {
    this.inputEl.addEventListener('input', this.onInput.bind(this));
    this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
    this.inputEl.addEventListener('click', () => this.updateMenuState(true));
    this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));

    this.options.map((option, index) => {
      const optionEl = document.createElement('div');
      optionEl.setAttribute('role', 'option');
      optionEl.id = `${this.idBase}-${index}`;
      optionEl.className =
        index === 0 ? 'combo-option option-current' : 'combo-option';
      optionEl.setAttribute('aria-selected', 'false');
      optionEl.innerText = option;

      optionEl.addEventListener('click', () => {
        this.onOptionClick(index);
      });
      optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

      this.listboxEl.appendChild(optionEl);
    });
  }

  filterOptions(value: any) {
    this.filteredOptions = filterOptions(this.options, value);

    // hide/show options based on filtering
    const options = this.el.querySelectorAll('[role=option]');
    [...options].forEach((optionEl) => {
      const value = optionEl.innerText;
      if (this.filteredOptions.indexOf(value) > -1) {
        optionEl.style.display = 'block';
      } else {
        optionEl.style.display = 'none';
      }
    });
  }

  onInput() {
    const curValue = this.inputEl.value;
    this.filterOptions(curValue);

    // if active option is not in filtered options, set it to first filtered option
    if (this.filteredOptions.indexOf(this.options[this.activeIndex]) < 0) {
      const firstFilteredIndex = this.options.indexOf(this.filteredOptions[0]);
      this.onOptionChange(firstFilteredIndex);
    }

    const menuState = this.filteredOptions.length > 0;
    if (this.open !== menuState) {
      this.updateMenuState(menuState, false);
    }
  }

  onInputKeyDown(event: KeyboardEvent) {
    const { key } = event;

    const max = this.filteredOptions.length - 1;
    const activeFilteredIndex = this.filteredOptions.indexOf(
      this.options[this.activeIndex]
    );

    const action = getActionFromKey(key, this.open);

    switch (action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
        event.preventDefault();
        const nextFilteredIndex = getUpdatedIndex(
          activeFilteredIndex,
          max,
          action
        );
        const nextRealIndex = this.options.indexOf(
          this.filteredOptions[nextFilteredIndex]
        );
        return this.onOptionChange(nextRealIndex);
      case MenuActions.CloseSelect:
        event.preventDefault();
        this.selectOption(this.activeIndex);
        return this.updateMenuState(false);
      case MenuActions.Close:
        event.preventDefault();
        return this.updateMenuState(false);
      case MenuActions.Open:
        return this.updateMenuState(true);
    }
  }

  onInputBlur() {
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }

    if (this.open) {
      this.updateMenuState(false, false);
    }
  }

  onOptionChange(index: number) {
    this.activeIndex = index;
    this.inputEl.setAttribute(
      'aria-activedescendant',
      `${this.idBase}-${index}`
    );

    // update active style
    const options = this.el.querySelectorAll('[role=option]');
    [...options].forEach((optionEl) => {
      optionEl.classList.remove('option-current');
    });
    options[index].classList.add('option-current');

    if (this.open && isScrollable(this.listboxEl)) {
      maintainScrollVisibility(options[index], this.listboxEl);
    }
  }

  onOptionClick(index: number) {
    this.onOptionChange(index);
    this.selectOption(index);
    this.updateMenuState(false);
  }

  onOptionMouseDown() {
    this.ignoreBlur = true;
  }

  selectOption(index: number) {
    const selected = this.options[index];
    this.inputEl.value = selected;
    this.activeIndex = index;
    this.filterOptions(selected);

    // update aria-selected
    const options = this.el.querySelectorAll('[role=option]');
    [...options].forEach((optionEl) => {
      optionEl.setAttribute('aria-selected', 'false');
    });
    options[index].setAttribute('aria-selected', 'true');
  }

  updateMenuState(open: boolean, callFocus = true) {
    this.open = open;

    this.inputEl.setAttribute('aria-expanded', `${open}`);
    open ? this.el.classList.add('open') : this.el.classList.remove('open');
    callFocus && this.inputEl.focus();
  }
}
