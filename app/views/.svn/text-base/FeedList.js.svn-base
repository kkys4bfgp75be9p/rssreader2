/**
 * @author Zhang Ming
 */
rssreader.FeedList = Ext.extend(Ext.List, {
		singleSelect: true,
		itemTpl: new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="feed">',
					'<span>{title}</span>',
				'</div>',
			'</tpl>'
	    ),
	    onItemDisclosure: true
	}
);

Ext.reg("rssreader-feed-list", rssreader.FeedList);

rssreader.FavoritesFeedList = Ext.extend(rssreader.FeedList, {
	onItemTap: function(item, index, e) {
			Ext.dispatch({
	            controller: "favorites",
	            action    : "showFavoritesFeedDetail",
	            instance  : index
		    });
			return rssreader.FavoritesFeedList.superclass.onItemTap.apply(this, arguments);
	    }
});

Ext.reg("rssreader-favorites-feed-list", rssreader.FavoritesFeedList);

rssreader.CarouselFeedList = Ext.extend(rssreader.FeedList, {
	onItemTap: function (item, index, e) {
		 	Ext.dispatch({
	            controller: "carousel",
	            action    : "showCarouselFeedDetail",
	            instance  : index
		    });
		    return rssreader.CarouselFeedList.superclass.onItemTap.apply(this, arguments);
	    }
});

Ext.reg("rssreader-carousel-feed-list", rssreader.CarouselFeedList);

rssreader.SearchFeedList = Ext.extend(rssreader.FeedList, {
	onItemTap: function (item, index, e) {
		 	Ext.dispatch({
	            controller: "search",
	            action    : "showSearchFeedDetail",
	            instance  : index
		    });
		    return rssreader.SearchFeedList.superclass.onItemTap.apply(this, arguments);
	    }
});

Ext.reg("rssreader-search-feed-list", rssreader.SearchFeedList);

