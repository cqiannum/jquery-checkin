/*
 * jquery-validator
 * https://github.com/cqian/jquery-validator
 *
 * Copyright (c) 2013 cqian
 * Licensed under the MIT license.
 */

(function($, document, window, undefined) {

  //Optional, but considered best practice by some
  "use strict";

  //verify constructor
  function Verify(options) {

      this.options = options;
      this.messages = this.options.messages;
      this.validations = this.options.validations;

      this.messages = {
        defaultMessage: "This value seems to be invalid.",
        type: {
            email: "This value should be a valid email.",
            url: "This value should be a valid url.",
            urlstrict: "This value should be a valid strict url.",
            number: "This value should be a valid number.",
            digits: "This value should be a valid digits.",
            dateIso: "This value should be a valid date (YYYY-MM-DD).",
            alphanum: "This value should be alphanumeric.",
            phone: "This value should be a valid phone number."
        },
        notnull: "This value should not be null",
        notblank: "This value should not be blank.",
        required: "This value is required.",
        regexp: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "This value is too short. It shold have %s characters or more.",
        maxlength: "This value is too long. Tt should have %s characters or less." 
      };


      this.init();

  }

  Verify.prototype = {

    constructor: Verify,

    //verify list, built-in functions
    verifies: {
        type: function ( val, type ) {
            var regExp;

            switch ( type ) {
                case 'number':
                    regExp = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
                    break;
                case 'digits':
                    regExp = /^\d+$/;
                    break;
                case 'alphanum':
                    regExp = /^\w+$/;
                    break;
                case 'email':
                    regExp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
                    break;
          
                case 'url':
                    val = new RegExp( '(https?|s?ftp|git)', 'i' ).test( val ) ? val : 'http://' + val;
                    break;
                    
                case 'urlstrict':
                    regExp = /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
                    break;
                case 'dateIso':
                    regExp = /^(\d{4})\D?(0[1-9]|1[0-2])\D?([12]\d|0[1-9]|3[01])$/;
                    break;
                case 'phone':
                    regExp = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
                    break;
                default:
                    return false;
            }

            // test regExp if not null
            return val !== '' ? regExp.test( val ) : false;
        },

        min: function(val, min) {
            return Number(val) >= min;
        },

        max: function(val, max) {
            return Number(val) >= max;
        },

        range: function(val, arrayRange) {
            return val >= arrayRange[0] && val <= arrayRange[1];
        },

        regexp: function(val, regExp, self) {
            return new RegExp(regExp, self.options.regexpFlag || '').test(val);
        },

        //will work on all inputs, val is object for checkboxes
        required: function(val) {

            //for chaeckboxes and select multiples. Check there is at lesat one required value.
            if(typeof val === 'object') {
                for(var i in val) {
                    if(this.required(val[i])) {
                        return true;
                    }
                }

                return false;
            }

            return this.notnull(val) && this.notblank(val);
        },


        minlength: function(val, min) {
            return val.length >= min;
        },

        maxlength: function(val, max) {
            return val.length <= max;
        },

        rangelength: function(val, arrayRange) {
            return this.minlength(val, arrayRange[0])  && this.maxlength(val, arrayRange[1]);
        },

        notnull: function(val) {
            return val.length > 0;
        },

        notblank: function(val) {
            return typeof val === 'string' && val.replace(/^\s+/g, '').replace(/\s+$/g, '') !== '';
        }

    },

    /*
    * Register custom validations and messages
    */
   
    init: function() {
        var key;

        for(key in this.validations) {
            this.addValidation(key, this.validations[key]);
        }

        for(key in this.messages) {
            this.addMessage(key, this.messages[key]);
        }
    },


    //add or override validator

    addValidation: function(name, func) {
        this.verifies[name] = func;
    },

    //add or override error message
    
    addMessage: function(key, message, type) {

        if(typeof type !== 'undefined' && type === true) {
            this.messages.type[key] = message;
            return;
        }

        if(key === 'type') {
            for(var i in message) {
                this.messages.type[i] = message[i];
            }

            return;
        }

        this.messages[key] = message;
    },

    //replace %s placeholders by real values
    
    formatMessage: function(message, args) {

        if(typeof args === 'object') {
            for(var i in args) {
                message = this.formatMessage(message, args[i]);
            }

            return message;
        }

        return typeof message === 'string' ? message.replace(new RegExp('%s', 'i'), args) : '';

    }

  };

  //validatorForm constructor
  function ValidatorForm(element, options, type) {

      this.$element = $(element);
      this.type = type;
      this.options = options;
      this.inputs = this.options.inputs;
      this.focus = this.options.focus;
      this.scrollDuration = this.options.scrollDuration;
      this.items = [];

      this.init();

  }

  ValidatorForm.prototype = {

      constructor: ValidatorForm,

      init: function() {

          var self = this;

          this.$element.find(this.inputs).each(function() {

              self.addItem(this);

          });

          this.$element.on('submit.' + this.type, false, $.proxy(this.focus, this));
      },

      focus: function() {
          var valid = true, item;

          this.focuseField = false;

          for(item = 0; item < this.items.length; item++) {
              if(typeof this.items[item] !== 'undefined' && this.items[item].validate() === false) {
                  valid = false;

                  if(!this.focuseField && this.focus === 'first' || this.focus === 'last') {
                      this.focuseField = this.items[item].$element;
                  }
              }
          }

          //if form is invalid, focus an error fields
          if(this.focuseField && !valid) {
              if(this.scrollDuration > 0) {
                  var top, self = this;
                  //center the window on the field
                  top = this.focuseField.offset().top - $(window).height() / 2;

                  $('html, body').animate({
                      scrollTop: top
                    },
                      this.scrollDuration,
                      function() {
                          self.focuseField.focus();
                      }
                  );
              } else {
                  this.focuseField.focus();
              }
          }

          return valid;
      },

      addItem: function(elem) {

          // var $elem = $(elem),
          var fieldItem;

          if($(elem).is(this.options.removes)) {

              return false;
          }

          fieldItem = $(elem).validator(this.options);
          fieldItem.setParent(this);

          this.items.push(fieldItem);

      },

      removeItem: function(elem) {
          var validatorItem = $(elem).validator();

          //remove item if the same hash
          for(var i = 0; i < this.items.length; i++) {
              if(this.items[i].hash === validatorItem.hash) {
                  this.items[i].destroy();
                  this.items.splice(i,1);
                  return true;
              }
          }

          return false;
      },

      /*
       * public methods
       */

      reset: function() {
          var item;

          for(item=0; item < this.items.length; item++) {

              this.items[item].reset();
          }
      },

      destroy: function() {
          var item;

          for(item = 0; item < this.items.length; item++) {
              this.items[item].destroy();
          }

          this.$element.off('.' + this.type).removeData(this.type);
      }

  };

  //validatorField constructor
  function ValidatorField(element, options, type) {

      this.$element = $(element);
      this.element = element;
      this.options = options;
      this.type = type;
      this.namespace = this.options.namespace;
      this.animate = this.options.animate;
      this.animateDutation = this.options.animateDutation;
      this.errorClass = this.options.errorClass;
      this.successClass = this.options.successClass;
      this.errorMessage = this.options.errorMessage;
      this.ulTemplateClass = this.options.ulTemplateClass;
      this.errors = this.options.errors;

      this.valid = true;
      this.validatedOnce = false;
      this.isRequired = false;
      this.val = this.$element.val();
      this.constraints = {};


      this.Verify = new Verify(options);

      //if type is ValidatorFieldMultiple, just return this for ValidatorFieldMultiple clone
      if(type === 'ValidatorFieldMultiple') {
          return this;
      }


      this.init();
  }

  ValidatorField.prototype = {

      constructor: ValidatorField,

      init: function() {
          
          //overwrited validatorMultiple if radio or check inputs
          if(typeof this.isRadioOrCheckbox === 'undefined') {

              this.isRadioOrCheckbox = false;
              this.hash = this.createHash();
              this.errorClassHandler = this.errors.classHandler(this.element, this.isRadioOrCheckbox) || this.$element;
          }

          //bind html5 properties
          this.bindHtml5Constraints();

          //bind validators to field
          this.bindConstraints();

          //error ul
          this.ulErrorManagement();

          //bind events if register
          if(this.hasConstraints()) {
              this.bindValidationEvents();
          }
      },

      bindHtml5Constraints: function() {

          if(this.$element.hasClass('required') || this.$element.prop('required')) {

              this.options.required = true;
          }

          if(typeof this.$element.attr('type') !== 'undefined' && new RegExp(this.$element.attr('type'), 'i').test('email url number range')) {

              this.options.type = this.$element.attr('type');

              //number and range types could have min and/or max values
              if(new RegExp(this.options.type, 'i').test('number range')) {

                  this.options.type = 'number';

                  if(typeof this.$element.attr('min') !== 'undefined') {

                      this.options.min = this.$element.attr('min');
                  }

                  if(typeof this.$element.attr('max') !== 'undefined') {

                      this.options.max = this.$element.attr('max');
                  }
              }
          }

          if(typeof this.$element.attr('pattern') === 'string') {

              this.options.regexp = this.$element.attr('pattern');
          }
      },

      bindConstraints: function() {

          for(var constraint in this.options) {
              var collectConstraint = {};

              collectConstraint[constraint] = this.options[constraint];
              this.addConstraint(collectConstraint, true);
          }
      },

      addConstraint: function(constraint, doNotUpdateValidationEvents) {

          for(var name in constraint) {
              name = name.toLowerCase();

              if(typeof this.Verify.verifies[name] === 'function') {
                  this.constraints[name] = {
                      name: name,
                      requirements: constraint[name],
                      valid: null
                  };

                  if(name === 'required') {
                      this.isRequired = true;
                  }

                  this.addCustomConstraintMessage(name);
              }

          }

          //force field validation next chexk and reset vvalidations events
          if(typeof doNotUpdateValidationEvents === 'undefined') {
              this.bindValidationEvents();
          }
      },

      removeConstraint: function(constraint) {
          var constraintName = constraint.toLowerCase();

          delete this.constraints[constraintName];

          if(constraintName === 'required') {
              this.isRequired = false;
          }

          if(!this.hasConstraints()) {
              if(typeof this.getParent()) {
                  this.getParent().removeItem(this.$element);
                  return;
              }

              this.destroy();
              return;
          }

          this.bindValidationEvents();
      },


      addCustomConstraintMessage: function(constraint) {
          var customMessage;
              customMessage = constraint + (constraint === 'type' && typeof this.options[constraint] !== 'undefined' ? this.options[constraint].charAt(0).toUpperCase() + this.options[constraint].substr(1) : '') + 'Message';

          if(typeof this.options[customMessage] !== 'undefined') {

              this.Verify.addMessage(constraint === 'type' ? this.options[constraint] : constraint, this.options[customMessage], constraint === 'type');
          }

      },

      // bind validation events on a field
      bindValidationEvents: function() {
          var triggers;
          this.valid = null;
          this.$element.addClass(this.namespace).addClass(this.options.skin);

          //remove binded events
          this.$element.off('.' + this.type);

          //alaways bind keyup event. when field is invalid
          triggers = (!this.options.trigger ? '' : this.options.trigger) + (new RegExp('keyup', 'i').test(this.options.trigger) ? '' : ' keyup');
          //alaways bind change event, when a select is invalid
          if(this.$element.is('select')) {
              triggers += new RegExp('change', 'i').test(triggers) ? '' : ' change';
          }

          triggers = triggers.replace(/^\s+/g, '').replace(/\s+$/g, '');
          this.$element.on((triggers + ' ').split(' ').join('.' + this.type + ' '), false, $.proxy(this.eventValidation, this));

      },

      eventValidation: function(event) {
          var val = this.getValue();

          if(event.type === 'keyup' && !/keyup/i.test(this.options.trigger) && !this.validatedOnce) {
              return true;
          }

          if(event.type === 'change' && !/change/i.test(this.options.trigger) && !this.validatedOnce) {
              return true;
          }

          //start validation process
          if(!this.isRadioOrCheckbox && this.getLength(val) < this.options.validationMinlength && !this.validatedOnce) {
              return true;
          }

          this.validate();
      },

      //validate a field
      validate: function(errorPop) {
          var value = this.getValue(), valid = null;

           if(!this.existConstraints()) {
              return null;
           } 

           //not validate a field already validated and unchanged
           if(!this.needToValidation(value)) {
              return this.valid;
           }

           valid = this.applyValidation();

           if(typeof errorPop !== 'undefined' ? errorPop : this.options.showErrors) {
              this.manageValidationResult();
           }

           return valid;
      },

      //loop through every fields validators add errors after unvalid fields
      applyValidation: function() {
          var valid = null;

          for(var constraint in this.constraints) {
              var result = this.Verify.verifies[this.constraints[constraint].name](this.val, this.constraints[constraint].requirements, this);

              if(result === false) {
                  valid = false;
                  this.constraints[constraint].valid = valid;
              } else if(result === true) {
                  this.constraints[constraint].valid = true;
                  valid = (valid !== false); 
              }

              return valid;
          }
      },

      /*
       * fired when all validators have be executed return true or false if field
       * is valid or not, display errors messages below failed fields
       */
      manageValidationResult: function() {
          var valid = null, constraint;

          for(constraint in this.constraints) {
              if(this.constraints[constraint].valid === false) {
                  this.manageError(this.constraints[constraint]);
                  valid = false;
              } else if(this.constraints[constraint].valid === true) {
                  this.removeError(this.constraints[constraint].name);
                  valid = (valid !== false);
              }
          }

          this.valid = valid;

          if(this.valid === true) {
              this.removeAllErrors();
              this.errorClassHandler.removeClass(this.errorClass).addClass(this.successClass);
              return true;
          } else if(this.valid === false) {
              this.errorClassHandler.removeClass(this.successClass).addClass(this.errorClass);
              return false;
          }

          //remove ul and li errors if no li inside
          if(this.ulError && (this.ulError).children().length === 0) {
              this.removeAllErrors();
          }

          return valid;
      },

      //return constraints if it's exist
      existConstraints: function() {
          var constraint;

          for(constraint in this.constraints) {
              return true;
          }

          return false;

      },

      //check if value has changed since prvious validation
      needToValidation: function(val) {
          if(!this.options.validateIfUnchanged && this.val === val && this.valid !== null && this.validatedOnce) {
              return false;
          }

          this.val = val;
          return this.validatedOnce = true;
      }, 

      //add error messages 
      manageError: function(constraint) {
          var message, constraintName,liClass,liError = {};

              constraintName = constraint.name;
              liClass = this.errorMessage !== false ? 'custom-error-message' : constraintName;
              message = this.errorMessage !== false ? this.errorMessage : (constraint.name === 'type' ? 
                this.Verify.messages[constraintName][constraint.requirements] : (typeof this.Verify.messages[constraintName] === 'undefined' ? 
                  this.Verify.messages.defaultMessage : this.Verify.formatMessage(this.Verify.messages[constraintName], constraint.requirements)));

          //add liError if not shown
          if(!$(this.ulError + ' .' + liClass).length) {
              liError[liClass] = message;
              this.addError(liError);
          }

          //display container
          if(!$(this.ulError).length) {
              this.manageErrorContainer();
          }

          if(constraint.name === 'required' && this.getValue() !== null && this.getValue.length > 0) {
              return;
          } else if(this.isRequired && constraint.name !== 'required' && (this.getValue() === null || this.getValue().length === 0)) {
              this.removeError(constraint.name);
              return;
          }

      },

      //create ul error container
      manageErrorContainer: function() {
          var errorContainer, ulTemplate;

              errorContainer = this.options.errorContainer || this.options.errors.container(this.element, this.isRadioOrCheckbox);
              ulTemplate = this.animate ? this.ulTemplate.show() : this.ulTemplate;

              if(typeof errorContainer !== 'undefined') {
                  $(errorContainer).append(ulTemplate);
                  return;
              }

            //  !this.isRadioOrCheckbox ? this.$element.after(ulTemplate) : this.$element.parent().after(ulTemplate);
              if(!this.isRadioOrCheckbox) {
                  this.$element.after(ulTemplate);
              } else {
                  this.$element.parent().after(ulTemplate);
              }
      },

      //add li error
      addError: function(error) {
          for(var constraint in error) {
              var liTemplate = $(this.options.errors.errorsElem).addClass(constraint);

              $(this.ulError).append(this.animate ? $(liTemplate).html(error[constraint]).hide().fadeIn(this.options.animateDutation) : $(liTemplate).html(error[constraint]));
          }
      },

      //remove li and ul error
      removeError: function(constraintName) {
          var liError = this.ulError + ' .' + constraintName, that = this;

          // this.animate ? $(liError).fadeOut(this.animateDutation, function() {
          //     $(this).remove();
          //     if(that.ulError && $(that.ulError).children().length === 0) {
          //         that.removeAllErrors();
          //     }
          // }) : $(liError).remove();
          if(this.animate) {
              $(liError).fadeOut(this.animateDutation, function() {
                  $(this).remove();
                  if(that.ulError && $(that.ulError).children().length === 0) {
                      that.removeAllErrors();
                  }
              });
          } else {
              $(liError).remove();
          }
      },

      //manage ul error container
      ulErrorManagement: function() {
          this.ulError = '#' + this.hash;
          this.ulTemplate = $(this.options.errors.errorsWrap).attr('id', this.hash).addClass(this.ulTemplateClass);
      },

      //generate hash, used for ul error
      createHash: function() {
          return 'validator-' + (Math.random() + '').substring(2);
      },

      //remove all ul li errors
      removeAllErrors: function() {
          // this.animate ? $(this.ulError).fadeOut(this.animateDutation, function() {
          //     $(this).remove();
          // }) : $(this.ulError).remove();
          if(this.animate) {
              $(this.ulError).fadeOut(this.animateDutation, function() {
                  $(this).remove();
              });
          } else {
              $(this.ulError).remove();
          }
      },

      hasConstraints: function() {
          for(var constraint in this.constraints) {
              return true;
          }

          return false;
      },

      // isValid: function() {
      //     return this.validate(false);
      // },

      /*
       * public methods
       *
       */
      
      //get the length of a given value 
      getLength: function(val) {

          if(!val || !val.hasOwnProperty('length')) {
              return 0;
          }

          return val.length;
      },

      //get value
      getValue: function() {

          return this.$element.data('value') || this.$element.val();
      },

      setParent: function(elem) {
          this.$parent = $(elem);

      },

      getParent: function() {

        return this.$parent;
      },

      getHash: function() {
          return this.hash;
      },

      reset: function() {
          this.valid = null;
          this.removeAllErrors();
          this.validatedOnce = false;
          this.errorClassHandler.removeClass(this.successClass).removeClass(this.errorClass);

          for(var constraint in this.constraints) {
              this.constraints[constraint].valid = null;
          }

          return this;
      },

      destroy: function() {
          this.$element.removeClass(this.namespace).removeClass(this.options.skin);
          this.reset().$element.off('.' + this.type).removeData(this.type);
      }

  };

  //ValidatorFieldMultiple constructor
  function ValidatorFieldMultiple(element, options, type) {
      this.element = element;
      this.$element = $(element);
      this.options = options;
      this.group = this.options.group || false;
      this.isRadioOrCheckbox = true;
      this.namespace = this.options.namespace;

      this.initMultiple();
      this.inheritance();
      this.Verify = new Verify(options);

      //call ValidatorField constructor
      this.init();

  }

  ValidatorFieldMultiple.prototype = {
      constructor: ValidatorFieldMultiple,

      initMultiple: function() {
          this.hash = this.getName();
          this.isRadio = this.$element.is('input[type=radio]');
          this.isCheckbox = this.$element.is('input[type=checkbox]');
          this.siblings = this.group ? '[data-group="' + this.group + '"]' : 'input[name="' + this.$element.attr('name') + '"]';
          this.errorClassHandler = this.options.errors.classHandler(this.element, this.isRadioOrCheckbox) || this.$element.parent();
      }, 

      inheritance: function() {
          var clone, property;

          clone = new ValidatorField(this.element, this.options, ValidatorFieldMultiple);

          for(property in clone) {
              if(typeof this[property] === 'undefined') {
                  this[property] = clone[property];
              }
          }

      }, 

      getName: function() {
          if(this.group) {
              return 'validator-' + this.group;
          }

          if(typeof this.$element.attr('name') === 'undefined') {
              throw "A radio or checkbox input must have data-group attribute or a name to be validate";
          }

          return 'validator-' + this.$element.attr('name').replace(/(:|\.|\[|]\])/g, '');
      },

      getValue: function() {
          if(this.isRadio) {
              return $(this.siblings + ':checked').val();
          }

          if(this.isCheckbox) {
              var values = [];

              $(this.siblings + ':checked').each(function() {
                  values.push($(this).val());
              });

              return values;
          }
      },

      bindValidationEvents: function() {
          var self = this, triggers;

          this.valid = null;
          this.$element.addClass(this.namespace);
          this.$element.off('.' + this.type);

          triggers = (!this.options.trigger ? '' : this.options.trigger) + (new RegExp('change', 'i').test(this.options.trigger) ? '' : ' change');

          triggers = triggers.replace(/^\s+/g, '').replace(/\s+$/g, '');

          $(this.siblings).each(function() {
              $(this).on(triggers.split(' ').join('.' + self.type + ' '), false, $.proxy(self.eventValidation, self));
          });
      }
  };
  

  /*
   * The main constructor
   */

  var Validator = $.validator = function(element, options) {

      this.$element = $( element );
      this.element = element;
      this.newInstance = null;

      this.options = $.extend(true, {}, Validator.defaults, options, $(this).data());
      this.namespace = this.options.namespace;
      this.inputs = this.options.inputs;
      this.removes = this.options.removes;
      this.radioOrCheckbox = this.options.radioOrCheckbox;

      this.init();

  };

  Validator.prototype = {

      constructor: Validator,

      init: function() {

          this.whichType(this.element);
          return this.newInstance;
      },

      whichType: function(elem) {
          var $elem = $(elem), createInstance = null;

          if($elem.is('form') || $elem.data('bind') === true) {
              createInstance = this.bind($elem, 'validatorForm');
          } else if ($elem.is(this.inputs) && !$elem.is(this.removes)) {
              createInstance = this.bind($elem, !$elem.is(this.radioOrCheckbox) ? 'validatorField' : 'validatorFieldMultiple');
          }

          this.newInstance = createInstance;
          //return this.newInstance;

      },

      bind: function(elem, type) {
          var validatorInstance; 
        
            switch (type) {

              case 'validatorForm':
                  validatorInstance= new ValidatorForm(elem, this.options, 'validatorForm');
                  break;
              case 'validatorField':
                  validatorInstance = new ValidatorField(elem, this.options, 'validatorField');
                  break;
              case 'validatorFieldMultiple':
                  validatorInstance = new ValidatorFieldMultiple(elem, this.options, 'validatorFieldMultiple');
                  break;
              default:
                  return;

            }
          
          return validatorInstance;

      },


      distroy: function() {


      }

  };

  Validator.defaults = {

      namespace: 'validator',
      skin: null,
      successClass: 'validator_success',
      errorClass: 'validator_error',
      inputs: 'input, textarea, select',
      radioOrCheckbox: 'input[type=radio], input[type=checkbox]',
      removes: 'input[type=hidden], input[type=file]',
      trigger: false,
      animate: true,
      animateDutation: 300,
      scrollDuration: 500,
      focus: 'first',                             //first || last || none
      validationMinlength: 3,
      validateIfUnchanged: false,
      errorMessage: false,
      showErrors: true,
      errors: {
          errorsWrap: '<ul></ul>',
          errorsElem: '<li></li>',
          classHandler: function() {},
          container: function() {}
      },
      ulTemplateClass: 'validator-error-list',
      validations: {},
      messages: {}

  };

  $.fn.validator = function(options) {

      if (typeof options === 'string') {
          var method = options;
          var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;


          return this.each(function() {

              var api = $.data(this, 'validator');
              if (typeof api[method] === 'function') {
                  api[method].apply(api, method_arguments);
              }

          });
      } else {
          return this.each(function() {

              if(!$.data(this, 'validator')) {

                  $.data(this, 'validator', new Validator(this, options));

              }
          });

      }

  };

})(jQuery, document, window);
