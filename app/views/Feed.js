/**
 * @author Zhang Ming
 */

rssreader.FeedPanel = Ext.extend(Ext.Panel, {
	
	initComponent: function(){

		
		
		this.tbar = Ext.apply({}, this.tbar || {}, {
                dock: 'top',
                xtype: 'toolbar',
                defaults: {
                    iconMask: true,
                    ui: 'plain'
                },
                items: [this.backButton]
            });
		this.tbar = new Ext.Toolbar(this.tbar);
		
		this.adbar = Ext.apply({}, this.adbar || {}, {
                 dock: 'bottom',
                 xtype: 'container',
                 ui: 'light',
                 height: 48
		 }); 
		
		Ext.apply(this, {
			dockedItems: [this.tbar, this.adbar]
		});
		
		rssreader.FeedPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg("rssreader-feed-panel", rssreader.FeedPanel);


