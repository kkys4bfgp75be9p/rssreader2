/**
 * @author Zhang Ming
 */
rssreader.FavoritesPanel = Ext.extend(Ext.Panel, {
	
	initComponent: function(){
		
		this.addButton = new Ext.Button({
			iconCls: 'add',
			handler: function (){
				Ext.dispatch({
		            controller: "favorites",
		            action    : "showAddFeed"
			    });
			}	
		});
		
		this.tbar = Ext.apply({}, this.tbar || {}, {
                dock: 'top',
                xtype: 'toolbar',
                defaults: {
                    iconMask: true,
                    ui: 'plain'
                },
				title: 'Rss Reader',
                items: [{xtype: 'spacer'},this.addButton]
        });
		
		 this.adbar = Ext.apply({}, this.adbar || {}, {
                 dock: 'bottom',
                 xtype: 'container',
                 ui: 'light',
				 id: 'admob_ad'
		 }); 
		Ext.apply(this, {
			dockedItems:[this.tbar, this.adbar] //, this.adbar
		});
		rssreader.FavoritesPanel.superclass.initComponent.apply(this, arguments);;
	}
	
});

Ext.reg("rssreader-favorites-panel", rssreader.FavoritesPanel);
