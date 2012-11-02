BasecampNotifier = {

	cache_qty: 10,

	// in seconds
	update_interval: 10,

	newTokenUri: function(code)
	{
		return 'https://launchpad.37signals.com/authorization/token?client_id='+ConfigKeys.client_id+'&redirect_uri='+encodeURIComponent(ConfigKeys.redirect_uri)+'&client_secret='+ConfigKeys.client_secret+'&type=web_server&code='+code;
	},

	authorizationUri: function()
	{
		return 'https://launchpad.37signals.com/authorization/new?client_id='+ConfigKeys.client_id+'&redirect_uri='+encodeURIComponent(ConfigKeys.redirect_uri)+'&type=web_server';
	}
}

/**
 * Função responsável por gerar o diff entre cache e novas respostas
 * do WebService.
 */
function diffCache(data, cache)
{
	var new_data = []
	var cache_by_id = {}

	for (var i = 0, j = cache.length; i < j; i++)
	{
		cache_by_id[cache[i].id] = cache[i]
	}

	for (var i = 0, j = data.length; i < j; i++)
	{
		if (typeof(cache_by_id[data[i].id]) !== 'object')
		{
			new_data.push(data[i])
		}
	}

	return new_data;
}

function getItemUrl(url)
{
	return url.replace(/(https:\/\/basecamp.com\/[\d]+)\/api\/v1(.[^.]+).json/, "$1$2");
}