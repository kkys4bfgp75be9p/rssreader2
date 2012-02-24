Ext.regController("search", {
	
	//mask: new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."}),
	
	showSearchForm: function (anim) {
		  rssreader.tabpanel.searchContainer.setActiveItem('rssreader-search-form', anim);
	},
	
	showFeedList: function (options) {
	  var feedPanel = Ext.getCmp('rssreader-search-feed-panel'),
			searchEngine = options.instance.searchEngine,
			searchText = options.instance.searchText;
	    
		if(!feedPanel){
		  	feedPanel = {
		  		xtype: 'rssreader-feed-panel',
				id: 'rssreader-search-feed-panel',
				layout: 'fit',
				backButton : new Ext.Button({
					iconCls: 'arrow_left',
					handler: function (){
						this.showSearchForm({type: 'slide', direction: 'right'});
					},
					scope:this	
				}),
				items: {
				  	xtype: 'rssreader-search-feed-list',
				  	id: 'rssreader-search-feed-list',
					store: Ext.getStore('SearchFeedStore')
			    }
		  	};
		  	rssreader.tabpanel.searchContainer.add(feedPanel);
		}
		Ext.getCmp('rssreader-search-feed-panel').tbar.setTitle(searchText);  
		rssreader.tabpanel.searchContainer.setActiveItem('rssreader-search-feed-panel', {type: 'slide', direction:'left'});
		_admob.fetchAd(Ext.getCmp('rssreader-search-feed-panel').dockedItems.getAt(1).el);
		Ext.getStore('SearchFeedStore').read({
			params: {
				q: searchEngine+searchText,
				start: 0
		    }
	  	});
	},
	
	showSearchFeedDetail: function (options) {
	  var index = options.instance,
	  	  record = Ext.getStore('SearchFeedStore').getAt(index),
	  	  feedDetailPanel = Ext.getCmp('rssreader-search-feed-detail');
	  	  
	  if(!feedDetailPanel){
	  	feedDetailPanel = {
		  	xtype: 'rssreader-search-feed-detail',
		  	id: 'rssreader-search-feed-detail',
		  	currentIndex: index
		  };
	  	rssreader.tabpanel.searchContainer.add(feedDetailPanel);
	  }
	  
	  rssreader.tabpanel.searchContainer.setActiveItem('rssreader-search-feed-detail', {type: 'slide', direction:'left'});
	  Ext.getCmp('rssreader-search-feed-detail').update(record.data);
	},
	
	back2FeedList: function () {
		  rssreader.tabpanel.searchContainer.setActiveItem('rssreader-search-feed-panel', {type: 'slide', direction:'right'});
		  
		  //remove highlight in feed panel
		  this.removeHighlight(Ext.getCmp('rssreader-search-feed-list'));
	},
	
	showPreviousFeedDetail: function (options) {
	  	var index = options.instance,
	  		DetailPanel = Ext.getCmp('rssreader-search-feed-detail');
	  	if(index >= 0){
	  		var record = Ext.getStore('SearchFeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	showNextFeedDetail: function (options) {
	  	var index = options.instance,
	  	DetailPanel = Ext.getCmp('rssreader-search-feed-detail');
	  	
	  	if(index < Ext.getStore('SearchFeedStore').getCount()){
	  		var record = Ext.getStore('SearchFeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	go2SourcePage: function(options){
		var record = Ext.getStore('SearchFeedStore').getAt(options.instance);
		document.location = record.data.link;
	},
	
	removeHighlight: function(component){
		var selModel = component.getSelectionModel();
        if(selModel){
        	Ext.defer(selModel.deselectAll, 600, selModel);
        }
	}

});