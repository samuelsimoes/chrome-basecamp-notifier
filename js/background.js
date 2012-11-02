Zepto(document).ready(function(){

	var notifications = function()
	{
		if(BasecampNotifier.User.findUser())
		{
			var user = JSON.parse(localStorage.getItem('user'));
			var listen_projects = JSON.parse(localStorage['bn_listening_accounts']);
			
			$.each(listen_projects, function(i, account){
				BasecampNotifier.Notification.listenUpdates(user, account);
			});
		}
	};
	notifications();
	
	setInterval(notifications, BasecampNotifier.update_interval * 1000);
});