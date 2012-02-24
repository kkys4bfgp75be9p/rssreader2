
Ext.regController("favorites", {
	
	mask: new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."}),
    
    first: function() {
		this.mask.show();
		
		var store = Ext.getStore('DefaultFeeds'),
			cstore = Ext.getStore('Carousel'),
			first = store.first(),
			cfirst = cstore.first();
		
		if(!first || !cfirst){
			
			var gstore = Ext.getStore('RSSFeeds');
			gstore.load({
				scope: this,
				callback: function(records){
					if(!first){
						var defaultData = records[0].feedsgroups();
						store.loadData(defaultData.first().addresses().getRange());
						store.sync();	
					}
					if(!cfirst){
						var defaultData = records[0].feedsgroups();
						cstore.loadData(defaultData.getRange(1));
						cstore.sync();
					}
					this.initApp();
				}
			});
		} else {
			this.initApp();
		} 

    },

	initApp: function(){
		Ext.dispatch({
	            controller: "carousel",
	            action    : "createCarouselItems"
		    });
		this.showFavorites({
			instance:{type: 'pop'}
		});
		_admob.fetchAd(Ext.get('admob_ad'));
	},
    
    showFavorites: function(options) {
        //dynamically add default feeds list.
        var defaultFeedsPanel = Ext.getCmp('rssreader-favorites-panel');
        
        if(!defaultFeedsPanel){
        	defaultFeedsPanel = {
	        	xtype: 'rssreader-favorites-panel',
	        	id: 'rssreader-favorites-panel',
	        	layout: 'fit',
	        	items: [{
					xtype: 'rssreader-favorites-feeds-list',
					id: 'rssreader-favorites-feeds-list',
					store: Ext.getStore('DefaultFeeds')	
				}]
	        };
	        rssreader.tabpanel.favoritesContainer.add(defaultFeedsPanel);
        }
        rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-favorites-panel', options.instance);
        
        //remove highlight in feeds panel
        this.removeHighlight(Ext.getCmp('rssreader-favorites-feeds-list'));
		this.mask.hide();
	},
	
	showAddFeed: function () {
	  var addFeedPanel = Ext.getCmp('rssreader-addfeed-panel');
	  
	  if(!addFeedPanel){
	  	addFeedPanel = {
		  	xtype: 'rssreader-addfeed-panel',
		  	id: 'rssreader-addfeed-panel'
		  };
		rssreader.tabpanel.favoritesContainer.add(addFeedPanel);
	  }
	  rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-addfeed-panel', {type: 'slide', direction:'up'});
	},
	
	validFeed: function (options) {
	  this.mask.show();
	  var url = options.instance;
	  rssreader.JsonP.validFeedUrl(url);	
	},
	
	addFeed2Localstorage: function (options) {
	  var store = Ext.getStore('DefaultFeeds');
	  var list = Ext.getCmp('rssreader-favorites-feeds-list');
	  
	  store.add(options.instance);
	  store.sync();
		
	  rssreader.JsonP.YQLRequest(options.instance.url, list.getNode(store.last()), store.getCount()-1);
	  list.select(store.getCount()-1);
	  Ext.getCmp('rssreader-addfeed-panel').reset();
	  rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-favorites-panel', {type: 'slide', direction:'down'});
	  
	  list.scroller.updateBoundary();
	  list.scroller.scrollTo({x: 0, y:list.scroller.size.height}, true);
	  this.removeHighlight(list);
	},
	
	
	showFeedList: function (options) {
	  //console.log(options.instance);
	  var feedPanel = Ext.getCmp('rssreader-feed-panel'),
	  	  record = options.instance;
	  
	  if(!feedPanel){
	  	feedPanel = {
	  		xtype: 'rssreader-feed-panel',
	  		id: 'rssreader-feed-panel',
	  		layout: 'fit',
	  		backButton : new Ext.Button({
					iconCls: 'arrow_left',
					handler: function (){
						this.showFavorites({ 
							instance: {type: 'slide', direction:'right'}
						});
					},
					scope:this	
				}),
	  		items: {
			  	xtype: 'rssreader-favorites-feed-list',
			  	id: 'rssreader-favorites-feed-list',
			  	store: Ext.getStore('FeedStore')
			  }
	  	};
	  	rssreader.tabpanel.favoritesContainer.add(feedPanel);
	  }
	  
	  
	  rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-feed-panel', {type: 'slide', direction:'left'});
	  
	  Ext.getCmp('rssreader-favorites-feed-list').scroller.scrollTo({
		    x: 0,
		    y: 0
		});
	  
	  Ext.getCmp('rssreader-feed-panel').tbar.setTitle(record.data.name);
	  _admob.fetchAd(Ext.getCmp('rssreader-feed-panel').dockedItems.getAt(1).el);
	  Ext.getStore('FeedStore').read({
			params: {
				q: record.data.url,
				start: 0
		    }
	  });
	},
	
	showFavoritesFeedDetail: function (options) {
	  var index = options.instance,
	  	  record = Ext.getStore('FeedStore').getAt(index),
	  	  feedDetailPanel = Ext.getCmp('rssreader-favorites-feed-detail');
	  	  
	  if(!feedDetailPanel){
	  	feedDetailPanel = {
		  	xtype: 'rssreader-favorites-feed-detail',
		  	id: 'rssreader-favorites-feed-detail',
		  	currentIndex: index
		  };
		rssreader.tabpanel.favoritesContainer.add(feedDetailPanel);
	  }
	  Ext.getCmp('rssreader-favorites-feed-detail').update(record.data);
	  
	  rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-favorites-feed-detail', {type: 'slide', direction:'left'});
	},
	
	back2FeedList: function () {
		  rssreader.tabpanel.favoritesContainer.setActiveItem('rssreader-feed-panel', {type: 'slide', direction:'right'});
		  
		  //remove highlight in feed panel
		  this.removeHighlight(Ext.getCmp('rssreader-favorites-feed-list'));
	},
	
	showPreviousFeedDetail: function (options) {
	  	var index = options.instance,
	  		DetailPanel = Ext.getCmp('rssreader-favorites-feed-detail');
	  	if(index >= 0){
	  		var record = Ext.getStore('FeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	showNextFeedDetail: function (options) {
	  	var index = options.instance,
	  	DetailPanel = Ext.getCmp('rssreader-favorites-feed-detail');
	  	
	  	if(index < Ext.getStore('FeedStore').getCount()){
	  		var record = Ext.getStore('FeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	go2SourcePage: function(options){
		var record = Ext.getStore('FeedStore').getAt(options.instance);
		document.location = record.data.link;
	},
	
	removeHighlight: function(component){
		var selModel = component.getSelectionModel();
        if(selModel){
        	Ext.defer(selModel.deselectAll, 600, selModel);
        }
	}	
});
