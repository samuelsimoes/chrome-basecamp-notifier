BasecampNotifier.Notification = (function(){

	// Module
	var m = {};

	m.listenUpdates = function(user, account)
	{
		var basecamp_events_uri = 'https://basecamp.com/'+account.id+'/api/v1/events.json',
		    headers = { "Authorization":  "Bearer "+user.token.key };

		/**
		 * Get the cached notifications for set header field 'If-Modified-Since' for increase 
		 * performance.
		 */
		var cached_updates = m.getCachedUpdates(account.id);
		if(cached_updates) headers["If-Modified-Since"] = cached_updates.last_modified;

		$.ajax({
			url: basecamp_events_uri,
			headers: headers,
			dataType: "json",
			success: function(data, status, xhr)
			{
				localStorage.setItem('bn_valid_token', JSON.stringify(true));

				if(xhr.status == 304)
				{
					new_items = null;
				}
				else if(data != null)
				{
					new_items = m.cacheUpdates(user, account.id, {last_modified: xhr.getResponseHeader('Last-Modified'), items: data});
				}
				else
				{
					console.log(xhr.status);
					localStorage.setItem('bn_valid_token', JSON.stringify(false))
				}

				m.notify(new_items, account);
			}
		});
	};

	/**
	 * Store in localStorage the quantity of items defined in 'BasecampNotifier.cache_qty'.
	 */
	m.cacheUpdates = function(user, account_id, data)
	{
		var account_cached_updates = m.getCachedUpdates(account_id),
		    received_ws = [],
		    next = false,
		    registers_qty = BasecampNotifier.cache_qty;

		for (i=0; i < registers_qty; i++)
		{
			/**
			 * Workaround for verify if the event belongs to the user authenticated.
			 * The event Creator ID attached in don't match with ID of user received in
			 * the process of authorization.
			 */
			var user_name = user.identity.first_name+" "+user.identity.last_name;

			if(data.items[i].creator.name != user_name)
			{
				received_ws.push(data.items[i]);
			}
			else
			{
				// Next!
				registers_qty++;
			}

			/**
			 * Stop the loop when reach in the last item of received data from webservice
			 * or the 'received_ws' array reach the size defined in 'BasecampNotifier.cache_qty'.
			 */
			if(i == registers_qty || (i == (data.items.length-1))) break;
		}

		/**
		 * If existed updates in cache, the var 'new_itens' store the diff between
		 * cache and the new data received from webserive.
		 */
		if(account_cached_updates)
		{
			var new_items = diffCache(received_ws, account_cached_updates.items);
		}
		else
		{
			var new_items = false;
		}

		// Store cache.
		localStorage.setItem(
			'bn_updates_'+account_id,
			JSON.stringify({ items: received_ws, last_modified: data.last_modified }
		));

		return new_items;
	};

	m.getCachedUpdates = function(account_id)
	{
		var account_update = JSON.parse(localStorage.getItem('bn_updates_'+account_id));

		if(!account_update) return false;

		return account_update;
	};

	m.updateUnreadItems = function(new_items)
	{
		var unread_items = (localStorage.getItem('bn_unread_items')) ? JSON.parse(localStorage.getItem('bn_unread_items')) : [];

		$.each(new_items, function(i, new_item){
			unread_items.push(new_item.id);
		});

		localStorage.setItem('bn_unread_items', JSON.stringify(unread_items));
	};

	/**
	 * Responsible function for update the icon badge with the quantity of unread items.
	 */
	m.updateBadge = function(new_items)
	{
		var cached_items_count = (typeof localStorage['bn_unread_updates_count']!="undefined") ? parseInt(localStorage['bn_unread_updates_count']) : 0;
		var news_items_count = new_items.length;
		
		var total_count = cached_items_count + news_items_count;

		localStorage['bn_unread_updates_count'] = total_count;
		chrome.browserAction.setBadgeText({text: total_count.toString()});
	};

	/**
	 * Função responsável por notificar os updates.
	 * @return void
	 */
	m.notify = function(new_items, account)
	{
		// Caso a quantidade novos itens seja 10 (primeira carga), não notifica.
		if(!!new_items && (new_items.length != 10) && (new_items.length != 0))
		{
			// Atualiza o ícone que conta a qtd de novos itens.
			m.updateBadge(new_items);
			m.updateUnreadItems(new_items);

			$.each(new_items, function(i, val)
			{
				var notification = webkitNotifications.createNotification(
					val.creator.avatar_url,
					account.name,
					val.creator.name+' '+val.summary
				);
				notification.ondisplay = function(event) {
					setTimeout(function() {
						event.currentTarget.cancel();
					}, 5 * 1000);
				}
				notification.onclick = function(event) {
					chrome.tabs.create({url: getItemUrl(val.url)});
					event.currentTarget.cancel();
				}

				notification.show();
			});
		}
	};

	return m;
})();