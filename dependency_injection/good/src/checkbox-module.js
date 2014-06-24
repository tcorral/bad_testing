Hydra.module.register('checkbox-module', ['jQuery'], function ($) {
  return {
    check: null,
    callbacks: {
      'click_checkbox': function () {
        this.classList.add('hidden');
      }
    },
    init: function () {
      this.check = document.getElementById('check');
      debugger;
      $(this.check).click(this.callbacks.click_checkbox);
    }
  };
});