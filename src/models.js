let Punch = (model) =>
{
	model.useTags().useHistory().useTrash().timestamps(false, true)
		.comment('Tracks changes in a user\'s engaged activity');

	model
		.increments('id')
		.primary();

	model
		.dateTime('time')
		.comment('the actual time when the punch was made');

	model
		.integer('activity_id')
		.name('activity')
		.namePlural('activities')
		.unsigned().references('id').inTable('activity').notNull()
		.comment('the activity this punch is associated with')
		.required();

	model
		.string('description')
		.comment('a short explanation for the punch')
		.optional();

};

let Activity = (model) =>
{
	model.tags().history().trash().timestamps(false, true)
		.comment('The broad categories that describe the most important ways you plan to parcel out your time.');
		.details('MAKE SURE to allow yourself leisure or even "sit on your ass, stare into space" time if you need it. You are trying to help yourself, not become your own tyrant.  Also, don\'t get too specific-- "Leisure" is good enough as a category-- don\'t separate out into "video games", "sleeping", "walking", unless it\'s important to your long-term goals that you spend a specific amount of time doing those things. I want to keep flexible, kinda loosy-goosey.')
		.nameColumn('name');

	model
		.increments('id')
		.primary();

	model
		.string('name')
		.comment('shown on drop lists')
		.optional();

	model
		.string('description')
		.comment('a short description of the activity, what it encompasses')
		.optional();

	model
		.decimal('rate', 7, 2)
		.comment('how much this activity is worth per hour (may use for pay or some other weighting system, i.e. I want to spend 3 hours working for every 1 hour playing video games)')
		.defaultsTo(0)
		.notNull();
};

/*
Examples:
Get Brian up to speed with the Henderson account, sweep the floor, buy 
toothpaste
*/
let Task = (model) =>
{
	model
		.tags().history().trash().timestamps(false, true)
		.comment('Tasks are used to create checklists.');

	model
		.enum('disposition', ['ready', 'deferred', 'completed', 'in progress', 'aborted', 'cancelled'])
		.defaultTo(false).notNull();

	model
		.integer('plan_id')
		.unsigned().references('id').inTable('activity').notNull()
		.comment('the plan this punch is associated with')
		.optional()
		.inline('plan');

};

/*
I think past plans should be preserved even if they weren't borne out, just grayed out. "here's what you're not
doing that you should be."
*/
let Plan = (model) =>
{
	model
		.tags().history().trash().timestamps(false, true)
		.comment('Plans out your future intention on how to use time, as opposed to actual disposition.');

	model
		.increments('id')
		.primary();

	model
		.dateTime('time_start')
		.comment('when this task is planned to start');

	model
		.dateTime('time_end')
		.comment('when this task is planned to be over');

	model
		.integer('activity_id')
		.unsigned().references('id').inTable('activity').notNull()
		.comment('the activity this plan will be associated with')
		.required();

	model
		.integer('activity_id')
		.unsigned().references('id').inTable('activity').notNull()
		.comment('the activity this plan will be associated with')
		.required();

	model
		.string('description')
		.comment('a short description of your plan, what you hope to get done etc.')
		.optional();


};

exports.Punch    = Punch;
exports.Activity = Activity;
exports.Task     = Task;