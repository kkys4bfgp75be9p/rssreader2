/**
 * @author Zhang Ming
 */


rssreader.SearchContainer = Ext.extend(Ext.Container, {
	layout: 'card',
	fullscreen: true,
	cls:'search',
	id:'searchcontainer',
	cardSwitchAnimation: {
        type: 'slide',
        autoclear: true
    },
	items: [{
		xtype: 'rssreader-searchform',
		id:'rssreader-search-form'
	}],
	
	initComponent: function(){
		rssreader.SearchContainer.superclass.initComponent.apply(this, arguments);
		
		this.on('cardswitch', this.onCardSwitching, this);
				
	},
	
	onCardSwitching: function (container, newCard, oldCard, index) {
	  if (oldCard && 
	  		( oldCard instanceof rssreader.FeedDetailPanel ||
	  		  ( newCard instanceof rssreader.SearchForm && oldCard instanceof rssreader.FeedPanel))) {
        	oldCard.destroy();
        	console.log('successfull deleted!');
        }
	}
});

Ext.reg("rssreader-search-container", rssreader.SearchContainer);