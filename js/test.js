
$(document).ready(function() {
	var pointer = new CursorFollower(
		{  
			size: 'medium',
			color: 'red'
		});

	pointer.getAttributes();
	pointer.getPrivateAttributes();

	pointer.init();
});