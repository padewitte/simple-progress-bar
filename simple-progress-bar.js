/**
 * A progress bar implementation with Custom Element V1.
 *
 */

function convertToNumberIfPossible(value) {
  var ret = value;

  if (!Number.isNaN(parseInt(value, 2))) {
    ret = parseInt(value, 2);
  }
  return ret;
}

function camelCase(input) {
  return input.toLowerCase().replace(/-(.)/g, (match, group1) => {
    return group1.toUpperCase();
  });
}

class SimpleProgressBar extends HTMLElement {

  constructor(self) {
    console.log('Constructing a new progress bar');
    self = super(self);
    // click event does not catch a middle button click in firefox
    self.addEventListener('mouseup', e => {
      console.log(e);
      // If left button we increase the limit, otherwise we decrease it.
      if (e.button === 0) {
        self.increaseLimit();
      } else {
        self.decreaseLimit();
      }
      e.preventDefault();
      return false;
    });
    self.connected = false;
    return self;
  }

  // Tells the element which attributes to observer for changes
  // This is a feature added by Custom Elements
  static get observedAttributes() {
    return ['max', 'current'];
  }

  // Get the initial value of foo or use a fallback
  connectedCallback() {
    console.log('Connected callback');
    this.max = this.getAttribute('max') || 3;
    this.current = this.getAttribute('current') || 0;
    this.connected = true;
    this.render();
  }

  disconnectedCallback() {
    // Called every time the element is removed from the DOM.
    console.log('nothing currenlty done at deconnexion');
  }

  adoptedCallback() {
    console.log('nothing currently done at adoption');
    // Called if the element has been moved into a new document
  }

  // When an attribute is updated, check if the value is different
  // If so, call our setter
  attributeChangedCallback(name, oldVal, newVal) {
    console.log('Attribute change callback', name, newVal, 'was', oldVal);
    if (convertToNumberIfPossible(oldVal) !== convertToNumberIfPossible(newVal)) {
      this['_' + camelCase(name)] = convertToNumberIfPossible(newVal);
      this.updateRendering();
      this.dispatchEvent(new CustomEvent(name + 'Change', { detail: { value: newVal } }));
    }
  }

  updateAttribute(att, value, defaultValue) {
    console.log('Updating attribute', att, value);
    if (value !== undefined && value !== null) {
      const assignedValue = convertToNumberIfPossible(value);

      this['_' + camelCase(att)] = assignedValue;
      this.updateRendering();
      this.setAttribute(att, assignedValue);
    } else {
      const assignedValue = convertToNumberIfPossible(defaultValue);

      this['_' + camelCase(att)] = assignedValue;
      this.updateRendering();
      this.setAttribute(att, assignedValue);
    }
  }

  get max() {
    return this._max;
  }

  set max(value) {
    this.updateAttribute('max', value, 3);

  }

  get current() {
    return this._current;
  }

  set current(value) {
    this.updateAttribute('current', value, 0);
  }

  getRatio() {
    if (this._current === 0) {
      return 0;
    }
    return Math.min(100, (parseInt(this._current, 2) * 100) / parseInt(this._max, 2));
  }

  updateRendering() {
    console.log('Updating rendering');
    if (this.connected === true) {
      this.querySelector('#barStatus').style.width = this.getRatio() + '%';
      this.querySelector('#legenda').innerText = this._current + '/' + this._max;
      if (this.getRatio() >= 100) {
        this.dispatchEvent(new CustomEvent('limit-reach', {
          detail: {
            txt: 'Limit reach',
            current: this.current,
            max: this.max
          }
        }));
      } else {
        this.dispatchEvent(new CustomEvent('under-limit', {
          detail: {
            txt: 'Under limit',
            current: this.current,
            max: this.max
          }
        }));
      }
    }
  }

  render() {
    console.log('Rendering the custome element');
    this.innerHTML = `
      <style>
        #progressBar {
            position: relative;
            width: 100%;
            height: 30px;
            background-color: rgb(100, 108, 119);
            /*text-align: center;*/
            display: flex;
            align-items: center;
            z-index: 1;
        }
        #barStatus {
            position: absolute;
            width: 1px;
            left: 0;
            top: 0;
            height: 100%;
            background-color: rgba(0, 0, 255, 0.5);
            transition: width 2s;
            z-index: 4;
        }
        #legenda {
            color: #ffffff;
            padding: 5px;
            margin: auto;
            z-index: 5;
        }
      </style>
        <div id="progressBar">
            <div id="legenda">${this._current}/${this._max}</div>
            <div id="barStatus"></div>
      </div>`;
    window.setTimeout(() => {
      this.updateRendering();
    }, 10);
  }

  increaseLimit() {
    this.max = parseInt(this.max, 2) + 1;
  }

  decreaseLimit() {
    if (this.max > 0) {
      this.max = parseInt(this.max, 2) - 1;
    }
  }

  increase() {
    this.current++;
  }

  decrease() {
    this.current--;
  }
}

if (!window.customElements.get('simple-progress-bar')) {
  window.customElements.define('simple-progress-bar', SimpleProgressBar);
}

export default SimpleProgressBar;
