Hydra.module.register('checkbox-module', function () {
  return {
    check: null,
    init: function () {
      this.check = document.getElementById('check');
      $(this.check).bind('click', function () {
        this.classList.add('hidden');
      });
    }
  };
});