/**
 * @author Zhang Ming
 */


rssreader.SearchForm = Ext.extend(Ext.form.FormPanel, {
	scroll: false,
	standardSubmit: true,
	fullscreen:false,
	dockedItems: {
        xtype: 'toolbar',
        ui: 'dark',
        title: 'Search',
        dock: 'top'
    },
    items: [{
		xtype: 'fieldset',
		title: 'Search news Feed',
		instructions: 'Please enter a search key word.',
		defaults: {
			lableAlign: 'left'
		},
		items:[
			{
				xtype: 'textfield',
				name: 'search-key',
				id: 'search-feed',
				placeHolder: 'Search',
				useClearIcon: true,
				allowBlank:true,
				required:true
			},{
                xtype: 'selectfield',
                name: 'search-engine',
				id:'search-engine',
                options: [{
                    text: 'Yahoo news search',
                    value: 'http://news.search.yahoo.com/news/rss?p='
                }, {
                    text: 'Baidu news search',
                    value: 'http://news.baidu.com/ns?tn=newsrss&sr=0&cl=2&rn=20&ct=0&word='
                }]
            },
			{
	            layout: 'vbox',
	            defaults: {xtype: 'button', flex: 1, style: 'margin: .5em;'},
	            items: [{
	                text: 'Search',
	                scope: this,
	                handler: function(btn){
						var searchText = Ext.getCmp('search-feed').getValue(),
							searchEngine = Ext.getCmp('search-engine').getValue();
						if(searchText!=""){
							Ext.dispatch({
					            controller: "search",
					            action    : "showFeedList",
					            instance  : {
					            	searchEngine:searchEngine,
					            	searchText  : searchText
					            }
						    });
						} else Ext.Msg.alert('Please enter a search word!', 'Please try again.', Ext.emptyFn);
						
	                }
	            }]
	        }
		]}]
});

Ext.reg("rssreader-searchform", rssreader.SearchForm);