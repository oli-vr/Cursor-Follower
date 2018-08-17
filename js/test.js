
$(document).ready(function() {
	var pointer = new Point(
		{  
			size: 'medium',
			color: 'red'
		});

	pointer.getAttributes();
	pointer.getPrivateAttributes();

	pointer.init();
});