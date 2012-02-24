Ext.regController("carousel", {
	
	mask: new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."}),
	
/********************private methods**********************************************************/	
	//after the carousel store is loaded, create dynamic items from store.
	createCarouselItems: function () {
		this.carouselItems = [];
		
		Ext.getStore('Carousel').each(function(rec){
			if(rec.data.localdata!=""){
				Ext.Ajax.request({
	                url: rec.data.localdata,
	                scope: this,
	                success: function(response, opts){
						var res = Ext.util.JSON.decode(response.responseText);
						
						 this.carouselItems.push({
							 xtype: 'rssreader-dataview',
							 cls: rec.data.name,
							 title: rec.data.name,
							 store: new Ext.data.Store({
								 model: 'Address',
								 data : res.addresses
							 })
						 });
					}
	            });
			}
        }, this);	
	},
	
	//at first time tapping to carousel view, create carousel with dynamic content. 
	createCarousel: function(){
		this.mask.show();
		rssreader.tabpanel.carouselContainer.add({
			xtype: 'carousel',
			id: 'news-group',
			items: this.carouselItems
		});
		rssreader.tabpanel.carouselContainer.doLayout();
		
		this.mask.hide();
	},
/******************************************************************************/
	
	
	
	
	showCarousel: function(anim){
		rssreader.tabpanel.carouselContainer.setActiveItem('news-group', anim);
	},
	
	showFeedList: function(options){
		var feedPanel = Ext.getCmp('rssreader-carousel-feed-panel'),
			record = options.instance;
	    
		if(!feedPanel){
		  	feedPanel = {
		  		xtype: 'rssreader-feed-panel',
				id: 'rssreader-carousel-feed-panel',
				layout: 'fit',
				backButton : new Ext.Button({
					iconCls: 'arrow_left',
					handler: function (){
						this.showCarousel({type: 'slide', direction: 'right'});
					},
					scope:this	
				}),
				items: {
				  	xtype: 'rssreader-carousel-feed-list',
				  	id: 'rssreader-carousel-feed-list',
					store: Ext.getStore('CarouselFeedStore')
			    }
		  	};
		  	rssreader.tabpanel.carouselContainer.add(feedPanel);
		}
		Ext.getCmp('rssreader-carousel-feed-panel').tbar.setTitle(record.data.name);  
		rssreader.tabpanel.carouselContainer.setActiveItem('rssreader-carousel-feed-panel', {type: 'slide', direction:'left'});
		_admob.fetchAd(Ext.getCmp('rssreader-carousel-feed-panel').dockedItems.getAt(1).el);
		Ext.getStore('CarouselFeedStore').read({
			params: {
				q: record.data.url,
				start: 0
		    }
	  	});
	},
	
	showCarouselFeedDetail: function (options) {
	  var index = options.instance,
	  	  record = Ext.getStore('CarouselFeedStore').getAt(index),
	  	  feedDetailPanel = Ext.getCmp('rssreader-carousel-feed-detail');
	  	  
	  if(!feedDetailPanel){
	  	feedDetailPanel = {
		  	xtype: 'rssreader-carousel-feed-detail',
		  	id: 'rssreader-carousel-feed-detail',
		  	currentIndex: index
		  };
	  	rssreader.tabpanel.carouselContainer.add(feedDetailPanel);
	  }
	  
	  rssreader.tabpanel.carouselContainer.setActiveItem('rssreader-carousel-feed-detail', {type: 'slide', direction:'left'});
	  Ext.getCmp('rssreader-carousel-feed-detail').update(record.data);
	},
	
	back2FeedList: function () {
		  rssreader.tabpanel.carouselContainer.setActiveItem('rssreader-carousel-feed-panel', {type: 'slide', direction:'right'});
		  
		  //remove highlight in feed panel
		  this.removeHighlight(Ext.getCmp('rssreader-carousel-feed-list'));
	},
	
	showPreviousFeedDetail: function (options) {
	  	var index = options.instance,
	  		DetailPanel = Ext.getCmp('rssreader-carousel-feed-detail');
	  	if(index >= 0){
	  		var record = Ext.getStore('CarouselFeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	showNextFeedDetail: function (options) {
	  	var index = options.instance,
	  	DetailPanel = Ext.getCmp('rssreader-carousel-feed-detail');
	  	
	  	if(index < Ext.getStore('CarouselFeedStore').getCount()){
	  		var record = Ext.getStore('CarouselFeedStore').getAt(index);
	  		DetailPanel.update(record.data);
	  		DetailPanel.currentIndex = index;
	  	}
	},
	
	go2SourcePage: function(options){
		var record = Ext.getStore('CarouselFeedStore').getAt(options.instance);
		document.location = record.data.link;
	},
	
	
	removeHighlight: function(component){
		var selModel = component.getSelectionModel();
        if(selModel){
        	Ext.defer(selModel.deselectAll, 600, selModel);
        }
	}
	
});