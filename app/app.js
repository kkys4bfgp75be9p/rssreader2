/**
 * This file sets application-wide settings and launches the application when everything has
 * been loaded onto the page.
 * 
 * The global variable kiva holds a reference to the application, and namespaces are automatically
 * set up for kiva.views, kiva.models, kiva.controllers and kiva.stores
 */ 
Ext.regApplication({
    name: "rssreader",
    defaultUrl:'favorites/first',
	
	defaultTarget: "tabpanel",
    glossOnIcon: false,
    
    /**
     * This function is automatically called when the document has finished loading. All we do here
     * is launch the application by calling the loans controller's 'list' action (see app/controllers/loans.js)
     */
    launch: function() {
		
		this.tabpanel = new rssreader.TabPanel({
            application: this,
            scope: this,
            listeners: {
                cardswitch: this.onCardSwitch
            }
        });
    },
    
    onCardSwitch: function (panel, newCard, oldCard) {
      //create carousel items after render
      if(newCard instanceof rssreader.CarouselContainer && newCard.items.getCount() == 0){
      	Ext.dispatch({
            controller: "carousel",
            action    : "createCarousel"
	    });
      }
    }
});