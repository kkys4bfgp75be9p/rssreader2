/**
 * @author Zhang Ming
 */


rssreader.FavoritesContainer = Ext.extend(Ext.Container, {
	layout: 'card',
	cardSwitchAnimation: {
        type: 'slide',
        cover: false
    },
	
	initComponent: function(){
		rssreader.FavoritesContainer.superclass.initComponent.apply(this, arguments);
		
		this.on('cardswitch', this.onCardSwitching, this);
				
	},
	
	onCardSwitching: function (container, newCard, oldCard, index) {
	  if (oldCard && 
	  		( oldCard instanceof rssreader.FeedDetailPanel ||
	  		  oldCard instanceof rssreader.AddFeedPanel ||	
	  		  ( newCard instanceof rssreader.FavoritesPanel && oldCard instanceof rssreader.FeedPanel))) {
        	oldCard.destroy();
        	console.log('successfull deleted!');
        }
	}	
});

Ext.reg('rssreader-favorites-container', rssreader.FavoritesContainer);
