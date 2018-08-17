
$(document).ready(function() {
	var pointer = new Point(
		{  
			size: 'medium',
			color: 'green'
		});

	pointer.getAttributes();
	pointer.getPrivateAttributes();

	pointer.init();
});