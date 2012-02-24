/**
 * @author Zhang Ming
 */
rssreader.CarouselContainer = Ext.extend(Ext.Container, {
	layout: 'card',
	cardSwitchAnimation: {
        type: 'slide',
        cover: false
    },
	
	initComponent: function(){
		rssreader.CarouselContainer.superclass.initComponent.apply(this, arguments);
		
		this.on('cardswitch', this.onCardSwitching, this);
				
	},
	
	onCardSwitching: function (container, newCard, oldCard, index) {
	  if (oldCard && 
	  		( oldCard instanceof rssreader.FeedDetailPanel ||
	  		  oldCard instanceof rssreader.AddFeedPanel ||	
	  		  ( newCard instanceof Ext.Carousel && oldCard instanceof rssreader.FeedPanel))) {
        	oldCard.destroy();
        	console.log('successfull deleted!');
        }
	}	
});

Ext.reg("rssreader-carousel-container", rssreader.CarouselContainer);

rssreader.DataView = Ext.extend(Ext.DataView, {
	layout: 'card',
	scroll: false,
	tpl : new Ext.XTemplate(
	    	 '<div class="title"></div>'+
	    	 '<tpl for=".">'+
		         '<div class="group-feed-widget">'+
					 '<div class="widget">'+
						 '<img class="x-icon-mask">'+
				     '</div>'+
					 '<div class="widget-title">{name}</div>'+
		         '</div>'+
		     '</tpl>'
	),
	selectedItemCls: "x-item-selected",
	itemSelector: 'div.group-feed-widget',
	listeners: {
	 	itemtap: function(item, index, e){
			var record = this.store.getAt(index);
			Ext.dispatch({
	            controller: "carousel",
	            action    : "showFeedList",
	            instance  : record
		    });
	 	}
	},
	
	afterRender: function(){
		rssreader.DataView.superclass.afterRender.call(this);
		var title = new Ext.Element(this.el).down('div.title');
		title.dom.innerHTML = this.title;
	}
});
Ext.reg("rssreader-dataview", rssreader.DataView);
