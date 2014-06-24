Hydra.setTestFramework(jasmine);
describe('Checkbox Module Spec', function () {
  var oModule;
  Hydra.module.test('checkbox-module', function (oMod) {
    oModule = oMod;
  });
  it('should check that it works', function () {
    var checkBox;
    jasmine.getFixtures().fixturesPath = 'spec/fixtures';
    jasmine.getFixtures().load('form.html');
    oModule.init();
    checkBox = document.getElementById('check');
    oModule.callbacks.click_checkbox.call(checkBox);
    expect(checkBox.classList.contains('hidden')).toBeTruthy();
  });
});