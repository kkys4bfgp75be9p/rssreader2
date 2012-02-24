/**
 * @author Zhang Ming
 */
rssreader.FeedDetailPanel = Ext.extend(Ext.Panel, {
	styleHtmlContent: true,
	scroll: 'vertical',
	cls:'feeddetail',
	//currentIndex: null,
	tpl: new Ext.XTemplate(
	    '<tpl for=".">',
	        '<h3>{title}</h3>',
	        '<h4>{publishedDate}</h4>',
	        '<div>{content}</div>',
	    '</tpl>'
	),
	initComponent: function(){
		this.backButton = new Ext.Button({
			iconCls: 'arrow_left',
			scope: this,
			handler: this.handlerBack
		});
		
		this.upButton = new Ext.Button({
			iconCls: 'arrow_up',
			sope: this,
			ui: 'plain',
			scope: this,
			handler: this.handlerUp
		});
		
		this.downButton = new Ext.Button({
			iconCls: 'arrow_down',
			scope: this,
			handler: this.handlerDown
		});
		
		this.gotoButton = new Ext.Button({
			iconCls: 'action',
			scope: this,
			handler: this.handlerGoto
		});
		
		this.tbar = Ext.apply({}, this.tbar || {}, {
                dock: 'top',
                xtype: 'toolbar',
                defaults: {
                    iconMask: true,
                    ui: 'plain'
                },
                title: 'Summary',
                items: [
						this.backButton,
						{xtype: 'spacer'},
						this.upButton,
						this.downButton
						]
            });
		
		this.gotobar = Ext.apply({}, this.gotobar || {}, {
                dock: 'bottom',
                xtype: 'toolbar',
                title: 'Go to the link',
                defaults: {
                    iconMask: true,
                    ui: 'plain'
                },
				items: [
					{xtype: 'spacer'},
					this.gotoButton
				]
        });
		
		Ext.apply(this, {
			dockedItems: [this.tbar, this.gotobar]
		});
		
		rssreader.FeedDetailPanel.superclass.initComponent.apply(this, arguments);
	}
	
});

Ext.reg("rssreader-feed-detail-panel", rssreader.FeedDetailPanel);

rssreader.FavoritesFeedDetail = Ext.extend(rssreader.FeedDetailPanel, {
	handlerBack: function(){
		Ext.dispatch({
            controller: "favorites",
            action    : "back2FeedList"
	    });
	},
	
	handlerUp: function(){
		Ext.dispatch({
            controller: "favorites",
            action    : "showPreviousFeedDetail",
            instance  : this.currentIndex - 1
	    });
	},
	
	handlerDown: function(){
		Ext.dispatch({
	        controller: "favorites",
	        action    : "showNextFeedDetail",
	        instance  : this.currentIndex + 1
	    });
	},
	
	handlerGoto: function(){
		Ext.dispatch({
            controller: "favorites",
            action    : "go2SourcePage",
            instance  : this.currentIndex
	    });
	}
});

Ext.reg("rssreader-favorites-feed-detail", rssreader.FavoritesFeedDetail);

rssreader.CarouselFeedDetail = Ext.extend(rssreader.FeedDetailPanel, {
	handlerBack: function(){
		Ext.dispatch({
            controller: "carousel",
            action    : "back2FeedList"
	    });
	},
	
	handlerUp: function(){
		Ext.dispatch({
            controller: "carousel",
            action    : "showPreviousFeedDetail",
            instance  : this.currentIndex - 1
	    });
	},
	
	handlerDown: function(){
		Ext.dispatch({
	        controller: "carousel",
	        action    : "showNextFeedDetail",
	        instance  : this.currentIndex + 1
	    });
	},
	
	handlerGoto: function(){
		Ext.dispatch({
            controller: "carousel",
            action    : "go2SourcePage",
            instance  : this.currentIndex
	    });
	}
});

Ext.reg("rssreader-carousel-feed-detail", rssreader.CarouselFeedDetail);

rssreader.SearchFeedDetail = Ext.extend(rssreader.FeedDetailPanel, {
	handlerBack: function(){
		Ext.dispatch({
            controller: "search",
            action    : "back2FeedList"
	    });
	},
	
	handlerUp: function(){
		Ext.dispatch({
            controller: "search",
            action    : "showPreviousFeedDetail",
            instance  : this.currentIndex - 1
	    });
	},
	
	handlerDown: function(){
		Ext.dispatch({
	        controller: "search",
	        action    : "showNextFeedDetail",
	        instance  : this.currentIndex + 1
	    });
	},
	
	handlerGoto: function(){
		Ext.dispatch({
            controller: "search",
            action    : "go2SourcePage",
            instance  : this.currentIndex
	    });
	}
});

Ext.reg("rssreader-search-feed-detail", rssreader.SearchFeedDetail);