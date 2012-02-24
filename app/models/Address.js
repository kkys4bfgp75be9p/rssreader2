/**
 * @author Zhang Ming
 */
Ext.regModel('Address', {
    fields: [
		{name: "id",    type: "int"},
		{name: 'name', type: 'string'},
		{name: 'url', type: 'string'},
		{name: 'image_url', type: 'string'},
		{name: 'description', tpye:'string'}
	],
	
	associations: [
        {type: 'belongsTo', model: 'FeedsGroup'}
    ],
    
    proxy: {
    	type: 'localstorage',
    	id: 'address'
    }	
	
});

