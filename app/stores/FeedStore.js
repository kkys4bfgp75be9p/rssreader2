/**
 * @author Zhang Ming
 */
// cc.stores.FeedStore = new Ext.data.Store({
	// model: 'Feed',
	// storeId: 'FeedStore',
    // autoLoad: false,
// 	
// })

Ext.regStore('FeedStore', {
    model: 'Feed',
    //sorters: { property: 'title', direction: 'ASC'},
    storeId: 'feedstore'
});

Ext.regStore('CarouselFeedStore', {
    model: 'Feed',
    //sorters: { property: 'title', direction: 'ASC'},
    storeId: 'carouselfeedstore'
});


Ext.regStore('SearchFeedStore', {
    model: 'Feed',
    //sorters: { property: 'title', direction: 'ASC'},
    storeId: 'searchfeedstore'
});

