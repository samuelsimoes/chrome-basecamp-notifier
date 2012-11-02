auth_code = location.search.match(/\?code\=([^\&]+)/);

Zepto(document).ready(function($){

	var Options = {

		user: null,

		init: function()
		{
			// Caso seja autenticação
			if(auth_code)
			{
				BasecampNotifier.User.getToken(auth_code[1], function(data)
				{
					if(!data)
					{
						Options.showErrorView();
						return false;
					}

					BasecampNotifier.User.cacheUser(data, function(data){

						if(!data)
						{
							Options.showErrorView();
							return false;
						}

						Options.user = data;
						chrome.extension.getBackgroundPage().location.reload();
						Options.showOptionsView();
					});
				});
			}
			else
			{
				if(localStorage['user'])
				{
					var cached_user = JSON.parse(localStorage['user']);
				}
				else
				{
					Options.showErrorView();
					return false;
				}

				BasecampNotifier.User.getByToken(cached_user.token.key, function(data)
				{
					if(!data)
					{
						Options.showErrorView();
						return false;
					}

					Options.user = data;
					Options.showOptionsView();
				});
			}
		},

		showOptionsView: function()
		{
			var listening_accounts_id = (localStorage['bn_listening_accounts_id']) ? JSON.parse(localStorage['bn_listening_accounts_id']) : [];

			$.each(Options.user.accounts, function(i, account) {
				var checked = (listening_accounts_id.indexOf(account.id)>=0) ? " checked " : "";
				$('.project-list').prepend('<div class="project"><input type="checkbox" '+checked+' name="projects" value="'+account.id+'" /> <label>'+account.name+'</label></div>')
			});

			$('.load-view').hide();
			$('.options-view').show();

			$('.project-list').on('submit', function(){

				var form_data = $(this).serializeArray(), listening_accounts = [], user_accounts = {}, listening_accounts_id = [];

				if(form_data.length <= 0)
				{
					$('.flash').html('Escolha pela menos um projeto para ser notificado.').show();
					return false;
				}

				// cria um hash das contas do usuário com o ID como key.
				for (var i = 0, j = Options.user.accounts.length; i < j; i++)
				{
					user_accounts[Options.user.accounts[i].id] = Options.user.accounts[i];
				}

				for (var i = 0, j = form_data.length; i < j; i++)
				{
					listening_accounts.push(user_accounts[form_data[i].value]);
					listening_accounts_id.push(parseInt(form_data[i].value));
				};

				localStorage['bn_listening_accounts'] = JSON.stringify(listening_accounts);
				localStorage['bn_listening_accounts_id'] = JSON.stringify(listening_accounts_id);

				close();
				return false;
			});
		},

		showErrorView: function()
		{
			console.log('erro');
		}
	};
	Options.init();
});