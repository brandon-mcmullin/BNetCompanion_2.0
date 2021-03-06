(function() {
	var _sandbox = null;
	var _menuContainer;
	var _menuItems = null;
	
	BCNavMenuWidget = function(sandbox) {
		_sandbox = sandbox;
		_menuItems = bcMenuButtons;
		_menuContainer = document.getElementById('bc-bottom-nav');
		_sandbox.on(_menuContainer, '.bc-nav-item', 'click',openTargetPage);
	};
	
	BCNavMenuWidget.prototype.render = function() {
		_menuItems.forEach(function(btn) {
			renderMenuButton(btn);
		});
	};
	
	var renderMenuButton = function(btn) {
		var btnBox = _menuContainer.appendChild(document.createElement('li'));
		btnBox.className = 'bc-nav-item ';
		btnBox.setAttribute('data-page-ref', btn.targetPage);
	
		if ( btn.rootPage ) {
			btnBox.className += ' bc-nav-active';
		}
	
		var img = btnBox.appendChild(document.createElement('img'));
		img.src = 'images/' + btn.title + ( btn.rootPage ? '-selected' : '' ) + '.png';
	
		btnBox.appendChild(document.createElement('br'));
	
		btnBox.appendChild(document.createTextNode(btn.title));
	};
	
	var openTargetPage = function() {
	
		_sandbox.removeClass('.bc-nav-active', 'bc-nav-active');
		
		//set thumbnails to default
		var imgs = _menuContainer.getElementsByTagName('img');
		for ( var i = 0; i < imgs.length; i++ ) {
			imgs[i].src = imgs[i].src.replace('-selected','');
		}
	
		this.className += ' bc-nav-active';
		
		var img = this.getElementsByTagName('img')[0];
		img.src = img.src.replace('.','-selected.');
		
		_sandbox.openPage(this.getAttribute('data-page-ref'));
	};
	
})();