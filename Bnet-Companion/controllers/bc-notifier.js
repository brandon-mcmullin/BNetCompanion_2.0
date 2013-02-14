/*
	Content script for putting in-window notifications out when new items are discovered.
*/

(function() {
	var $j = jQuery.noConflict();
	
	BcNotifierWidget = function(sandbox) {
		//_sandbox = sandbox;
	};
	
	BcNotifierWidget.prototype.notify = function() {
		var notification = document.createElement('div');
		notification.className = 'bc-notification';
		
		var closeBtn = notification.appendChild(document.createElement('span'));
		closeBtn.textContent = 'X';
		closeBtn.className = ' bc-close-notification-btn ';
		
		var virgil = notification.appendChild(document.createElement('span'));
		virgil.className = 'bc-vergil';
		
		var msg = notification.appendChild(document.createElement('p'));
		msg.textContent = 'New items detected...';
		
		document.body.insertBefore(notification, document.body.firstChild);
		
		$j(closeBtn).click(function(e) {
			$j(notification).fadeOut('slow').promise(function() {
				$j(notification).remove();
			});
		});
		
		setTimeout(function() {
			$j(notification).fadeOut('slow').promise(function() {
				$j(notification).remove();
			});
		}, 4000);
		
		setTimeout(playVergil, 1000);
		
	};
	
	var playVergil = function(pos) {
		var position = pos || 0;
		if ( position < bcVergilAnimap.length ) {
			var vergil = document.getElementsByClassName('bc-vergil')[0];
			
			if ( vergil ) {
				vergil.style.backgroundPosition = ( - (bcVergilAnimap[position].x) * 55 ) + "px 0px";
			}
			
			console.log('here is what is animating: ' + ( - (bcVergilAnimap[position].x) * 55));
			setTimeout(function() {
				playVergil(++position);
			}, bcVergilAnimap[position].ms);
		}
	};
	
})();

notifier = new BcNotifierWidget();