var getURL = function(url){
	ajax({ url: url, type: 'json' }, function(data) {
		var use = [];

		for(var i = 0; i < 10; i++) {
			use.push(data.titles[i].replace(/^\s+|\s+$/g,'')   + '\n\n');
		}

	   	simply.scrollable(true);
	   	simply.title('ABC News');
	   	simply.body(use.join().replace(/,/g, ''));
	 });
}

getURL('http://pebblenews.tamara.cool');