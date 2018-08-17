/**
 * Mouse Point.
 *
 * Mouse Point script to draw a point that will follow the mouse trought the screen.
 * When the mouse hovers by a link it will increase the size and decrease when leaving a link.
 * the size and the color can be edited.
 *
 *
 * @link 	
 * @file mouse-point.js 
 * @author Oliver Valido
 * @since 1.1.0
 */


var Point = function(options) {
	/**
	 * Define Root
	 * @type {Reference}
	 */
	var root = this;

	// Global attributes
	var $body, $point, growing;

	/**
	 * Private attributes
	 * @type {Object}
	 */
	var pointAttributes = {
		radius: 20,
		offset: 10,
		currentOpacity: 0.75,
		position: 'absolute',
		borderRadius: '50%',
		zIndex: '10000',
		background: '#000',
		opacity: 0.75,
		smallRadius: 20,		
		bigRadius: 60,
		smallOffset: 10,
		bigOffset: 30,
		bigOpacity: 0.30
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
		smallGrow: 45,
		medium: 20,
		mediumGrow: 75,
		big: 30,
		bigGrow: 100
	});

	/**
	 * Constructor
	 * @param  {Object} options Params to initialize point mouse. Params that can be set
	 *                          color - value -> Any html color
	 *                          size - value -> small, medium, big
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
				pointAttributes.smallRadius = sizes.small;
				pointAttributes.bigRadius = sizes.smallGrow;
				break;
			case 'medium':
				pointAttributes.radius = sizes.medium;
				pointAttributes.smallRadius = sizes.medium;
				pointAttributes.bigRadius = sizes.mediumGrow;
				break;
			case 'big':
				pointAttributes.radius = sizes.big;
				pointAttributes.smallRadius = sizes.big;
				pointAttributes.bigRadius = sizes.bigGrow;
				break;
		}
	}

	/**
	 * Private method to set the offset as the half of he radius.
	 * This will make the point to be in the middle of the circle.
	 */
	var setOffset = function () {
		pointAttributes.smallOffset = pointAttributes.radius / 2;
		pointAttributes.offset = pointAttributes.smallOffset;
	}

	/**
	 * Method to set up tht background color
	 */
	var setBackground = function () {
		pointAttributes.background = attributesPublic.color;
	};

	/**
	 * Set the small standard size of the point
	 */
	var setPointSizeCSS = function () {
		$point.css('width', pointAttributes.radius + 'px');
		$point.css('height', pointAttributes.radius + 'px');
		$point.css('position', pointAttributes.position);
		$point.css('border-radius', pointAttributes.borderRadius);
		$point.css('background', pointAttributes.background);
		$point.css('z-index', pointAttributes.zIndex);
		$point.css('opacity', pointAttributes.currentOpacity);
		$point.css('pointer-events', 'none');

	};

	/**
	 * Set the big size for the point
	 */
	var setBigSize = function () {

		$point.css('width', pointAttributes.bigRadius + 'px');
		$point.css('height', pointAttributes.bigRadius + 'px');
		$point.css('position', pointAttributes.position);
		$point.css('border-radius', pointAttributes.borderRadius);
		$point.css('background', pointAttributes.background);
		$point.css('z-index', pointAttributes.zIndex);
		$point.css('opacity', pointAttributes.bigOpacity);
		$point.css('pointer-events', 'none');
	};

	/**
	 * Set the position of the point
	 * @param {double} x position x in the mouse
	 * @param {double} y position y in the mouse
	 */
	var setPosition = function(x, y) {
		$point.css('top', y - pointAttributes.offset);
		$point.css('left', x - pointAttributes.offset);
	};

	/**
	 * Start animation to grow the point
	 * @return {void} 
	 */
	var startGrowPoint = function() {
		// While the radius haven't got the maximum size and still 
		// growing keep going on the loop
		if (pointAttributes.radius < pointAttributes.bigRadius && growing)
			setTimeout(function() {
				pointAttributes.radius += 1.5;
				pointAttributes.offset = pointAttributes.radius / 2;
				pointAttributes.currentOpacity = pointAttributes.bigOpacity;
				// Get the html position.
				var pointPosition = $point.position();
				$point.css('top', pointPosition.top - 0.5);
				$point.css('left', pointPosition - 0.5);
				// Refres the point
				setPointSizeCSS();
				
				startGrowPoint();

			}, 1);			
	};

	/**
	 * Method to start the reduce animation
	 * @return {void} 
	 */
	var startReducePoint = function() {
		if (pointAttributes.radius > pointAttributes.smallRadius && !growing)
			setTimeout(function() {				
				pointAttributes.radius -= 1;
				pointAttributes.offset = pointAttributes.radius / 2;
				pointAttributes.currentOpacity = pointAttributes.opacity;
				// Get the html position.
				var pointPosition = $point.position();
				$point.css('top', pointPosition.top + 0.5);
				$point.css('left', pointPosition + 0.5);
				// Refres the point
				setPointSizeCSS();
				
				startReducePoint();
			}, 5);
	};

	/**
	 * Initialize the mouse pointer on the mouse-poin container
	 * @return {void} 
	 */
	this.init = function () {		
		$body = $('body');
		$point = $('#mouse-point');
		delay = 100;
		growing = true;

		// Set up the CSS attributes.
		setPointSizeCSS();

		/**
		 * Event to calculate the point potition when the mouse moves.
		 * The mouse will have a delay of movement depending on the delay variable. 
		 * @param  {Object} event
		 * @return {[type]} 
		 */
		$body.mousemove(function (event) {			
			setTimeout(function() {  
				var positionX = event.pageX;
				var positionY = event.pageY;

				setPosition(positionX, positionY);

			}, delay);			
		});

		// Set the mouseover event
		$body.mouseover(function (event) {
			$target = $(event.target)
			
			if ($target.is('a')) {
				growing = true;
				startGrowPoint();
			}
			else {
				growing = false;
				startReducePoint();
			}
		});
	};

	/**
	 * Temporary method to display the atributes
	 * @return {[type]} [description]
	 */
	this.getAttributes = function () {
		console.log(attributesPublic);
	};

	/**
	 * Temporary method to show the private attributes
	 * @return {[type]} [description]
	 */
	this.getPrivateAttributes = function () {
		console.log(pointAttributes);
	};

	// Call the constructor
	this.construct(options);
}