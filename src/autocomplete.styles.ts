import { css } from 'lit';

export const AutoCompleteStyles = css`
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  font-family: "Segoe UI", SegoeUI, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 120%;
  line-height: 1.4;
  margin: 0;
  padding: 2em;
}

.combo {
  display: block;
  margin-bottom: 1.5em;
  max-width: 400px;
  position: relative;
}

.combo::after {
  border-bottom: 2px solid rgba(0,0,0,.5);
  border-right: 2px solid rgba(0,0,0,.5);
  content: '';
  display: block;
  height: 12px;
  pointer-events: none;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0, -65%) rotate(45deg);
  width: 12px;
}

.input-wrapper {
  border-radius: 4px;
}

.combo-input {
  background-color: #f5f5f5;
  border: 2px solid rgba(0,0,0,.5);
  border-radius: 4px;
  display: block;
  font-size: 1em;
  min-height: calc(1.4em + 26px);
  padding: 12px 16px 14px;
  text-align: left;
  width: 100%;
}

select.combo-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.open .combo-input {
  border-radius: 4px 4px 0 0;
}

.combo-input:focus {
  border-color: #0067b8;
  box-shadow: 0 0 4px 2px #0067b8;
  outline: 5px solid transparent;
}

.combo-label {
  display: block;
  font-size: 20px;
  font-weight: 100;
  margin-bottom: 0.25em;
}

.combo-menu {
  background-color: #f5f5f5;
  border: 1px solid rgba(0,0,0,.42);
  border-radius: 0 0 4px 4px;
  display: none;
  max-height: 300px;
  overflow-y:scroll;
  left: 0;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 100;
}

.open .combo-menu {
  display: block;
}

.combo-option {
  padding: 10px 12px 12px;
}

.combo-option.option-current,
.combo-option:hover {
  background-color: rgba(0,0,0,0.1);
}

.combo-option.option-selected {
  padding-right: 30px;
  position: relative;
}

.combo-option.option-selected::after {
  border-bottom: 2px solid #000;
  border-right: 2px solid #000;
  content: '';
  height: 16px;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%) rotate(45deg);
  width: 8px;
}
`;
