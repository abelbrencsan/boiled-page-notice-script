# Boiled Page notice script

A simple, lightweight and customizable notice JavaScript module for Boiled Page frontend framework that can be used notifications, consents, etc...

## Install

Place `notice.js` to `/assets/js` directory and add its path to `scripts` variable in `gulpfile.js` to be combined with other scripts. You can also find two related SCSS packages, a notice and a consent component that work well with this JavaScript module.

- Notice list component: <https://www.github.com/abelbrencsan/boiled-page-notice-list-component>
- Consent list component: <https://www.github.com/abelbrencsan/boiled-page-consent-list-component>

## Usage

To create a new notice instance, call `Notice` constructor the following way:

```js
// Create new notice instance
var notice = new Notice(options);

// Initialize notice instance
notice.init();
```

## Options

Available options for accordion constructor:

Option| Type | Default | Required | Description
------|------|---------|----------|------------
`element` | Object | null | Yes | Wrapper element that contains content of the notice.
`dismissTrigger` | Object | null | No | Element that dismisses notice on click.
`acceptTrigger` | Object | null | No | Element that accepts notice on click.
`initCallback` | Function | null | No | Callback function after notice is initialized.
`dismissCallback` | Function | null | No | Callback function after notice is dismissed.
`acceptCallback` | Function | null | No | Callback function after notice is accepted.
`closeCallback` | Function | null | No | Callback function after notice is closed.
`removeCallback` | Function | null | No | Callback function after notice is removed.
`destroyCallback` | Function | null | No | Callback function after notice is destroyed.
`isClosingClass` | String | 'is-closing' | No | Class added to element when notice is closing.

## Methods

### Initialize notice

`init()` - Initialize notice. It adds events to handle notice.

### Close notice

`close()` - Close notice, call `remove()` method after closing animation is finished.

### Remove notice

`remove()` - Remove notice from the DOM.

### Dismiss notice

`dismiss()` - Set notice as dismissed.

### Accept notice

`accept()` - Set notice as accepted.

### Destroy notice

`destroy()` - Destroy notice. It removes all related events.