/**
 * Summary.
 *
 * Description.
 *
 * @link 	
 * @file 
 * @author Oliver Valido
 * @since 1.0.0
 */


var Point = function(options) {
	/**
	 * Define Root
	 * @type {Reference}
	 */
	var root = this;

	// Global attributes
	var $body, $point;

	/**
	 * Private attributes
	 * @type {Object}
	 */
	var pointAttributes = {
		radius: 20,
		offset: 10,
		position: 'absolute',
		borderRadius: '50%',
		zIndex: '10000',
		background: '#000'
	};

	/**
	 * Attributes to generate the point features
	 * @type {Object}
	 */
	var attributesPublic = {
		// CSS Attributes			
		size: 'medium',
		color: '#000'		
	};

	/**
	 * [sizes description]
	 * @type {Object}
	 */
	var sizes = Object.freeze({
		small: 10,
		medium: 15,
		big: 30
	});

	/**
	 * Constructor
	 * @param  {Object} options Params to initialize point mouse
	 * @return {void}       
	 */
	this.construct = function (options) {
		$.extend(attributesPublic, options);

		setSize(attributesPublic.size);	
		setOffset();	
		setBackground();
	};

	/**
	 * Private method to setup the size of the Point
	 * @param {string} response String with the values small, medium or big for the point.	
	 */
	var setSize = function (response) {
		switch(response) {
			case 'small':
				pointAttributes.radius = sizes.small;
				break;
			case 'medium':
				pointAttributes.radius = sizes.medium;
				break;
			case 'big':
				pointAttributes.radius = sizes.big;
				break;
		}
	}

	/**
	 * Private method to set the offset as the half of he radius.
	 * This will make the point to be in the middle of the circle.
	 */
	var setOffset = function () {
		pointAttributes.offset = pointAttributes.radius / 2;
	}

	/**
	 * Method to set up tht background color
	 */
	var setBackground = function () {
		pointAttributes.background = attributesPublic.color;
	}

	/**
	 * Initialize the mouse pointer on the mouse-poin container
	 * @return {void} 
	 */
	this.init = function () {		
		$body = $('body');
		$point = $('#mouse-point');
		delay = 45;

		// Set up the CSS attributes.
		$point.css('width', pointAttributes.radius + 'px');
		$point.css('height', pointAttributes.radius + 'px');
		$point.css('position', pointAttributes.position);
		$point.css('border-radius', pointAttributes.borderRadius);
		$point.css('background', pointAttributes.background);
		$point.css('z-index', pointAttributes.zIndex);
		// Add opacity

		// Set the mouemove event.
		$body.mousemove(function(event) {			
			setTimeout(function() {  
				var positionX = event.pageX;
				var positionY = event.pageY;

				$point.css('top', positionY - pointAttributes.offset);
				$point.css('left', positionX - pointAttributes.offset);
			}, delay);			
		});
	}

	/**
	 * Temporary method to display the atributes
	 * @return {[type]} [description]
	 */
	this.getAttributes = function () {
		console.log(attributesPublic);
	}

	/**
	 * Temporary method to show the private attributes
	 * @return {[type]} [description]
	 */
	this.getPrivateAttributes = function () {
		console.log(pointAttributes);
	}

	// Call the constructor
	this.construct(options);
}