// news item list
(function() {
	BCNewsList = function(storedList) {
		this.keys = new Array();
		this.items = {};
		
		if ( storedList ) {
			this.keys = storedList.keys;
			this.items = storedList.items;
		}
		
	};
	
	BCNewsList.prototype.getKeys = function() {
		return this.keys;
	};
	
	// sorts the list of keys then returns the top one
	BCNewsList.prototype.getLatestEntry = function() {
		this.keys = this.keys.sort(sortKeys);
		return this.keys[0];
	};
	
	BCNewsList.prototype.add = function(item) {
	    if (!item.title || !item.pubDate || !item.url || !item.source) {
	        return;
	    }
		var key = item.source[0] + '-';
		key += new Date(item.pubDate);
		
		if ( !this.items[key] ) {
			this.items[key] = item;
			this.keys.push(key);
		}
	};
	
	BCNewsList.prototype.item = function(key) {
		return this.items[key];
	};
	
	BCNewsList.prototype.itemAt = function(index) {
		return this.items[this.keys[index]];
	};
	
	var sortKeys = function(a,b) {
		
		var dateA = a.replace(/^[bty]-/,'');
		dateA = new Date(dateA);
		
		var dateB = b.replace(/^[bty]-/,'');
		dateB = new Date(dateB);
		
		return dateB - dateA;
	};
	
})();