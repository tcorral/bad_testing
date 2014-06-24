describe('Checkbox Module Spec', function () {
  it('should check that it works', function () {
    var checkBox;
    jasmine.getFixtures().fixturesPath = 'spec/fixtures';
    jasmine.getFixtures().load('form.html');
    Hydra.module.start('checkbox-module');
    checkBox = document.getElementById('check');
    $(checkBox).trigger('click');
    expect(checkBox.classList.contains('hidden')).toBeTruthy();
  });
});