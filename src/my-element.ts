import { LitElement, PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AutoCompleteStyles } from './autocomplete.styles';
import { AutoCompleteHelpers } from './aria-combobox.prototype';

// just an example array
const options = [
  'Apple',
  'Apricot',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Date',
  'Durian',
  'Eggplant',
  'Fig',
  'Grape',
  'Guava',
  'Huckleberry',
];

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more';

  @property({ type: Array, attribute: 'data-options' })
  options: string[] = [];

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    super.firstUpdated(_changedProperties);

    const aria12El = this.shadowRoot?.querySelector('.js-aria12');
    const aria12Component = new AutoCompleteHelpers(aria12El, options);
    aria12Component.init();
    this.requestUpdate();
  }

  render() {
    return html`
    <label for="combo3" class="combo-label">ARIA 1.2 Combobox pattern (with filtering)</label>
  <div class="combo js-aria12">
    <input
      aria-activedescendant=""
      aria-autocomplete="list"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-controls="listbox3"
      role="combobox" 
      id="combo3"
      class="combo-input"
      type="text">
    <div class="combo-menu" role="listbox" id="listbox3"></div>
  </div>
    `;
  }

  static styles = [AutoCompleteStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
