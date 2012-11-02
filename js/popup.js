Zepto(document).ready(function(){

	$('#close-button').on('click', function(){
		close();
		return false;
	});

	/**
	 * Ao carregar a página, quando o ícone da pop for clicado
	 * ele apaga a informação dos itens não lidos.
	 */
	localStorage.removeItem('bn_unread_updates_count');
	chrome.browserAction.setBadgeText({text: ''});

	var user = (localStorage['user']) ? JSON.parse(localStorage['user']) : null;

	var valid_token = JSON.parse(localStorage.getItem('bn_valid_token'));
	console.log(valid_token);

	if(user && valid_token)
	{
		$('.login-button').hide();

		var listening_projects = JSON.parse(localStorage['bn_listening_accounts']);

		/**
		 * Montagem a listagem baseado no cache.
		 */
		$.each(listening_projects, function(i, account){

			var updates = JSON.parse(localStorage['bn_updates_'+account.id]);

			$('.content').prepend('<h1>'+account.name+'</h1><ul class="notification-list account-'+account.id+'"></li>');

			$.each(updates.items, function(i, update){
				var url = getItemUrl(update.url);
				$('.account-'+account.id).append('<li class="notification-id-'+update.id+'" data-link="'+url+'"><span class="user">'+update.creator.name+'</span> '+update.summary+' <small>'+update.bucket.name+'</small></li>');
			});
		});
	}
	else
	{
		$('.login-button').show();
	}

	$('.notification-list li').on('click', function(){
		chrome.tabs.create({url: $(this).attr('data-link')});
		return false;
	});

	var unread_items = (localStorage['bn_unread_items']) ? JSON.parse(localStorage['bn_unread_items']) : null;

	if(unread_items)
	{
		$.each(unread_items, function(i, unread_item_id){
			$('.notification-id-'+unread_item_id).addClass('new');
		});
	}

	localStorage.removeItem('bn_unread_items');

	$('#login').on('click', function(){
		chrome.tabs.create({url: BasecampNotifier.authorizationUri()});
	});
});