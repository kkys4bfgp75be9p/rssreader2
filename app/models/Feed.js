/**
 * @author Zhang Ming
 */
Ext.regModel('Feed', {
    fields: [
		{name: 'title', type: 'string'},
		{name: 'content', type: 'string'},
		{name: 'link', type: 'string'},
		{name: 'publishedDate', tpye: 'date'},
		{name: 'contentSnippet', type: 'string'}
	],
	
	proxy: 'rss'
});