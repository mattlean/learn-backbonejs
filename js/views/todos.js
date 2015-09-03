var app = app || {};

app.TodoView = Backbone.View.extend({

	tagName: 'li',

	// Cache the template function for a single item
	template: _.template( $('#item-template').html() ),

	// The DOM events specific to an item
	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// The To-do view listens for change to its model, re-rendering. Since there's
	// a one-to-one correspondence between a To-do and a To-do view in this
	// app, we set a direct reference on the model for convenience
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	// Re-renders the titles of the to-do item
	render: function() {
		this.$el.html( this.template( this.model.attributes) );
		this.$input = this.$('.edit');
		return this;
	},

	// Switch this view into 'editing' mode, displaying the input field
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// Close the 'editing' mode saving changes to the to-do
	close: function() {
		var value = this.$input.val().trim();

		if ( value ) {
			this.model.save({ title: value });
		}

		this.$el.removeClass('editing');
	},

	// If you hit 'enter' we're done editing the item
	updateOncenter: function ( e ) {
		if ( e. which === ENTER_KEY ) {
			this.close();
		}
	}
});
