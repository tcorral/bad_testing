Hydra.module.register('checkbox-module', ['jQuery'], function ($) {
  return {
    check: null,
    init: function () {
      this.check = document.getElementById('check');
      $(this.check).click(function () {
        this.classList.add('hidden');
      });
    }
  };
});