/**
 * Multinput.js
 * @author: Tisserand David
 * @version 1.1
 * @date: 2020-10-04
 *
 * Need JQuery
 */


function Multinput (target, options) {

	var options = options || [];

	// DEFAULT OPTION
	var defaults = {
		animate: true,
		speed: 250,
		addComplete: false,
		removeComplete: false,
		moveComplete: false,
	}

	this.target = target
	this.options = $.extend({}, defaults, options);

	this.target.css('overflow', 'hidden');

	/* Create model */
	if (this.target.find('.item').length>1) {
		this.model = this.target.find('.item').first().clone(true);
	} else {
		this.model = this.target.find('.item').clone(true);
	}
	this.model.find('input').not('[type=radio], [type=checkbox]').removeAttr('value');
	this.model.find('option[selected]').removeAttr('selected');
	this.model.find('input[type=radio], input[type=checkbox]').prop('checked', false);
	this.model.find('[data-default]').each(function() {
		if ($(this).prop('tagName') == 'INPUT') {
			if ($(this).prop('type') != 'radio' && $(this).prop('type') != 'checkbox') {
				$(this).val($(this).data('default'));
			} else if ($(this).prop('type') == 'checkbox') {
				$(this).prop('checked', true);
			} else if ($(this).prop('type') == 'radio') {
				$(this).prop('checked', true);
			}
		} else if ($(this).prop('tagName') == 'OPTION') {
			$(this).attr('selected', true);
		}
	});

	Multinput.prototype.initTransition = function() {
		this.target.find('.item').css('transition', 'all '+this.options.speed+'ms linear');
	}
	Multinput.prototype.disableTransition = function() {
		this.target.find('.item').css('transition', 'none');
		this.target.find('.item').css('transform', 'translateY(0)');
	}
	Multinput.prototype.resetEvents = function() {
		var that = this;
		this.target.find('[data-action]').off('click');
		this.target.find('[data-action=remove]').on('click', function() { that.removeItem($(this).parents('.item')); });
		this.target.find('[data-action=add]').on('click', function() { that.addItem($(this).parents('.item')); });
		this.target.find('[data-action=moveup]').on('click', function() { that.moveUp($(this).parents('.item')); });
		this.target.find('[data-action=movedown]').on('click', function() { that.moveDown($(this).parents('.item')); });
	}

	Multinput.prototype.addItem = function(currentItem){
		var that = this;
		this.disableTransition();
		var clone = this.model.clone(true);
		clone.insertAfter(currentItem);
		if (this.options.animate) {
			var defaultMargBot = currentItem.css('margin-bottom');
			currentItem.css('margin-bottom', '-'+currentItem.outerHeight()+'px');
			currentItem.animate({marginBottom: defaultMargBot}, this.options.speed);
			setTimeout(function(){
				that.setButtons();
			}, this.options.speed);
		} else { that.setButtons(); }
		this.resetEvents();
		if (this.options.addComplete && this.options.addComplete instanceof Function) {
			this.options.addComplete();
		}
	};
	Multinput.prototype.removeItem = function(targetItem) {
		this.target.find('.item [data-action=remove]').attr('disabled', 'disabled');
		var that = this;
		var nextTarget = targetItem.next('.item');
		if (that.options.animate) {
			this.initTransition();
			targetItem.css('transform', 'translateX(-'+targetItem.outerWidth()+'px)'); 
			setTimeout(function(){
				var defaultMargTop = targetItem.css('margin-top');
				nextTarget.css('margin-top', '-'+targetItem.outerHeight()+'px');
				setTimeout(function(){
					that.disableTransition();
					nextTarget.css('margin-top', defaultMargTop);
					targetItem.remove();
					that.setButtons();
				}, that.options.speed);
			}, this.options.speed);
		} else {
			targetItem.remove();
			that.setButtons();}
		if (that.options.removeComplete && this.options.removeComplete instanceof Function) {
			that.options.removeComplete();
		}
	};
	Multinput.prototype.moveUp = function(targetItem) {
		var that = this;
		var prevTarget = targetItem.prev('.item');
		if (that.options.animate) {
			this.initTransition();
			targetItem.css('transform', 'translateY(-'+targetItem.outerHeight()+'px)'); 
			prevTarget.css('transform', 'translateY('+prevTarget.outerHeight()+'px)');
			setTimeout(function(){
				that.disableTransition();
				targetItem.insertBefore(prevTarget);
				that.setButtons();
			}, this.options.speed);			
		} else {
			targetItem.insertBefore(prevTarget);
			that.setButtons();
		}
		if (this.options.moveComplete && this.options.moveComplete instanceof Function) {
			this.options.moveComplete();
		}
	};
	Multinput.prototype.moveDown = function(targetItem) {
		var that = this;
		var nextTarget = targetItem.next('.item');
		if (that.options.animate) {
			this.initTransition();
			targetItem.css('transform', 'translateY('+targetItem.outerHeight()+'px)'); 
			nextTarget.css('transform', 'translateY(-'+nextTarget.outerHeight()+'px)');
			setTimeout(function(){
				that.disableTransition();
				targetItem.insertAfter(nextTarget);
				that.setButtons();
			}, this.options.speed);
		} else {
			targetItem.insertAfter(nextTarget);
			that.setButtons();
		}
		if (this.options.moveComplete && this.options.moveComplete instanceof Function) {
			this.options.moveComplete();
		}
	};
	Multinput.prototype.setButtons = function() {
        this.target.find('.item [disabled]').removeAttr('disabled');
		this.target.find('.item').find('[data-action=remove]').attr('disabled', 'disabled');
        this.target.find('.item').first().find('[data-action=moveup]').attr('disabled', 'disabled');
        this.target.find('.item').last().find('[data-action=movedown]').attr('disabled', 'disabled');
        if (this.target.find('.item').length > 1) {
            this.target.find('.item').find('[data-action=remove]').removeAttr('disabled');
        }
    }

    this.setButtons();
    this.resetEvents();
}
$.fn.multinput = function(options) {
	return this.each(function() {
		new Multinput($(this),options);
	});
};
$.fn.multinput.Constructor = Multinput;