angular.module('stockApp').filter('translate', translateFilter);

translateFilter.$inject = ['TranslationService'];

function translateFilter(TranslationService) {
	return (input) => TranslationService.translate(input);
}
