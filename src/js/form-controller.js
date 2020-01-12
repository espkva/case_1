module.exports = function FormController(elem, onSubmit) {
  this.elem = elem;
  this.onSubmit = onSubmit;

  const CLASSNAMES = {
    INVALID: 'input--invalid-value',
    REQUIRED: 'input--missing-value',
    FOCUS: 'input--focus'
  }

  // Set novalidate if JS is enabled
  elem.setAttribute('novalidate','');
  elem.addEventListener('submit', submit);
  
  const inputs = [];
  for (let formElement of this.elem.elements) {
    // Filter out only relevant DOM-elements (input, select, textarea)
    if (['input','select','textarea'].includes(formElement.nodeName.toLowerCase())) {
      // Add validation listeners
      formElement.addEventListener('keyup', validateInput.bind(this, formElement));
      formElement.addEventListener('change', validateInput.bind(this, formElement));
      inputs.push(formElement);
    }
  }
  
  function validate() {    
    return inputs.filter(input => !validateInput(input)).length == 0;
  }
  
  function validateInput(inputElement) {
    // TODO: Create validation library/utils - easier to test
    let parent = inputElement.parentNode;
    let value = inputElement.value ? inputElement.value.trim() : null;
    let required = inputElement.getAttribute('required');
    let type = inputElement.getAttribute('type');
    let min = inputElement.getAttribute('minlength');
    let max = inputElement.getAttribute('maxlength');
    let pattern = inputElement.getAttribute('pattern');

    parent.classList.remove(CLASSNAMES.INVALID);
    parent.classList.remove(CLASSNAMES.REQUIRED);
    
    if (required && !value) {
      parent.classList.add(CLASSNAMES.REQUIRED);
      return false;
    } else if (!required && !value) {
      return true;
    }


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (type === 'email' && !re.test(value.toLowerCase())) {
      parent.classList.add(CLASSNAMES.INVALID);
      return false;
    }

    if ((min && value.length < min) || (max && value.length > max)) {
      parent.classList.add(CLASSNAMES.INVALID);
      return false;
    }

    return true;
  }

  function submit(event) {
    event.preventDefault();
    if (validate()) {
      let body = {};
      inputs.forEach(input => {
        body[input.getAttribute('name')] = input.value;
      });
      onSubmit(body);
    }
  }
}