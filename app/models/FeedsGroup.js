/**
 * @author Zhang Ming
 */
Ext.regModel('FeedsGroup', {
    fields: [
		{name: "id",    type: "int"},
		{name: 'name', type: 'string'},
		{name: 'searchUrl', type: 'string'},
		{name: 'localdata', type:'string'}
	],
	
	hasMany:{model: 'Address', name:'addresses'},
	
	belongsTo: 'RSSFeeds'
	
});