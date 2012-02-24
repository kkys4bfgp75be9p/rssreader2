/**
 * @author Zhang Ming
 */


rssreader.TabPanel = Ext.extend(Ext.TabPanel, {
	cls:'rssreader',
	layout: 'card',
	fullscreen: true,
	cardSwitchAnimation: {
        type: 'slide',
        cover: false
    },
	
	initComponent: function(){
		
		this.favoritesContainer = new rssreader.FavoritesContainer({
			title: 'Favorites',
			iconCls: 'favorites'
		});
		
		this.carouselContainer = new rssreader.CarouselContainer({
			title: 'News Group',
			iconCls:'home'
		});
		
		this.searchContainer = new rssreader.SearchContainer({
			title: 'Search',
			iconCls:'search'
		});
		
		this.infoPanel = new rssreader.InfoPanel({
			title: 'Info',
			iconCls: 'info'
		});
		
		Ext.apply(this, {
			items: [ this.favoritesContainer, this.carouselContainer, this.searchContainer, this.infoPanel],  
			tabBar: {
				dock : 'bottom',
				ui: 'dark',
				layout: {
	                pack: 'center'
		        }
			}
		});
		
		rssreader.TabPanel.superclass.initComponent.apply(this, arguments);
		
	}
});

Ext.reg('rssMain', rssreader.TabPanel);