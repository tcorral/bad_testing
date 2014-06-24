Hydra.module.register('checkbox-module', function () {
  return {
    check: null,
    callbacks: {
      'click_checkbox': function () {
        this.classList.add('hidden');
      }
    },
    init: function () {
      this.check = document.getElementById('check');
      $(this.check).bind('click', this.callbacks.click_checkbox);
    }
  };
});