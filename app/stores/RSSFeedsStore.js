/**
 * @author Zhang Ming
 */

Ext.regStore('RSSFeeds', {
    model: 'RSSFeeds',
    sorters: { property: 'name', direction: 'ASC'},
    storeId: 'rssfeeds',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : 'resources/default.json',
		reader: {
			type:'json',
			root: 'rss'
		}
    }
});
