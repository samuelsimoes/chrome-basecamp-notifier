BasecampNotifier.User = (function()
{
	var m = {};

	m.init = function(){
		return m;
	}

	/**
	 * Função responsável por pegar todos os usuários
	 * guardados no localstorage.
	 */
	m.findUser = function()
	{
		var user = localStorage.getItem('user');

		if(!user) return false;

		return JSON.parse(user);
	}

	/**
	 * Função responsável por gravar um novo usuário ou atualizar o token,
	 * em caso de token desatualizado.
	 */
	m.getToken = function(auth_code, callback)
	{
		var ret = false;

		$.ajax({
			url: BasecampNotifier.newTokenUri(auth_code),
			type: 'POST',
			dataType: "json",
			success: function(data, status, xhr) {
				etag = xhr.getResponseHeader('Etag');
				if(typeof callback != "undefined") callback(data);

				/*m.getByToken(data.access_token, function(){
					user.token = {
						key: data.access_token,
						etag: etag
					};

					localStorage.setItem('user', JSON.stringify(user));
				});*/
			}
		});

		if(!ret) return false;

		user.token = {
			key: ret.access_token,
			etag: etag
		};

		localStorage.setItem('user', JSON.stringify(user));

		return user;
	}

	m.cacheUser = function(data, callback)
	{
		$.ajax({
			url: 'https://launchpad.37signals.com/authorization.json',
			headers: {
				"Authorization": "Bearer "+data.access_token,
			},
			dataType: "json",
			success: function(ws_data, textStatus, xhr) {
				var user = ws_data;
				user.token = {
					key: data.access_token
				};
				localStorage['user'] = JSON.stringify(user);
				
				localStorage['bn_listening_accounts'] = JSON.stringify([user.accounts[0]]);
				localStorage['bn_listening_accounts_id'] = JSON.stringify([user.accounts[0].id]);
				
				if(typeof callback != "undefined") callback(user);
			}
		});
	}

	m.getByToken = function(token, callback)
	{
		$.ajax({
			url: 'https://launchpad.37signals.com/authorization.json',
			headers: {
				"Authorization": "Bearer "+token,
			},
			dataType: "json",
			success: function(data, textStatus, xhr) {
				if(typeof callback != "undefined") callback(data);
			},
		});
	}

	return m;
})();