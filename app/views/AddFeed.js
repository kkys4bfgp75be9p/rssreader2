/**
 * @author Zhang Ming
 */


rssreader.AddFeedPanel = Ext.extend(Ext.form.FormPanel, {
	//scroll: 'vertical',
	//standardSubmit: true,
	
	initComponent: function(){
		 Ext.apply(this, {
		 	items: [
				{
					xtype: 'fieldset',
					title: 'Add a feed',
					instructions: 'Please enter a valid feed url.',
					defaults: {
						lableAlign: 'left'
					},
					items:[
						{
							xtype: 'urlfield',
							name: 'url',
							id: 'feed-url',
							label: 'Url',
							placeHolder: 'Required',
							useClearIcon: true,
							required:true
						}
					]
				}
			],
			dockedItems : [
				{
					xtype: 'toolbar',
					dock: 'top',
					defaults: {
	                    iconMask: true,
	                    ui: 'plain'
	                },
					items: [
						{
							text: 'Cancel',
							scope: this,
							handler: function(){
								this.reset();
								Ext.dispatch({
						            controller: "favorites",
						            action    : "showFavorites",
						            instance  : {type: 'slide', direction:'down'}
							    });
							}
						},
						{
							xtype: 'spacer'
						},
						{
							text:'Reset',
							scope: this,
							handler: function(){
								this.reset();
							}
						},
						{
							text: 'Save',
							scope: this,
							handler: function(){
								var url= Ext.getCmp('feed-url').getValue();
								Ext.dispatch({
						            controller: "favorites",
						            action    : "validFeed",
						            instance  : url
							    });
								
							}
						}	
					]
				}
			]
		});
		
		rssreader.FeedPanel.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg("rssreader-addfeed-panel", rssreader.AddFeedPanel);