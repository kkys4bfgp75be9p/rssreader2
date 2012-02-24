/**
 * @author Zhang Ming
 */
rssreader.JsonP = {
    yqlUrl: 'http://query.yahooapis.com/v1/public/yql',
    
	
    
    request: function(cfg) {
        var p = cfg.params || {};
        p.q = cfg.query;
        p.format = 'json';
        Ext.util.JSONP.request({
            url: this.yqlUrl,
            callbackKey: 'callback',
            params: p,
            callback: cfg.callback,
            scope: cfg.scope || window
        });
    },
	
	YQLRequest: function(url, node, index) {
			Ext.get(node).mask('Loading...', 'x-mask-loading-logo', false);
            
            rssreader.JsonP.request({
                query: 'select * from xml where url="'+ url+'"',
                callback: function(response) {
                    var results = [],
						model = Ext.getStore('DefaultFeeds').getAt(index);
                    //console.log(response);
					if (response.query && response.query.results) {
                        results = response.query.results;
						if(results.rss) {
							if(results.rss.channel.title){
								model.set('name', results.rss.channel.title);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							if(results.rss.channel.description){
								model.set('description', results.rss.channel.description);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							if(results.rss.channel.image){
								if(!results.rss.channel.image.url||results.rss.channel.image.url==''){
									model.set('image_url', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png');
									Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
								}
								var img = new Image();
								img.onload = function(){
									model.set('image_url', results.rss.channel.image.url);	
									Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
								}
								img.src = results.rss.channel.image.url;
								model.set('image_url', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png');
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							} else {
								model.set('image_url', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png');
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}	
						}
						
						if(results.feed){
							//console.log(results.feed);
							if(results.feed.title){
								model.set('name', results.feed.title);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							if(results.feed.subtitle){
								model.set('description', results.feed.subtitle);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							model.set('image_url', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png');
							Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
						}
						if (results.RDF && results.RDF.channel) {
							if(results.RDF.channel.title){
								model.set('name', results.RDF.channel.title);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							if(results.RDF.channel.description){
								model.set('description', results.RDF.channel.description);
								Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
							}
							model.set('image_url', 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/128px-Feed-icon.svg.png');
							Ext.getStore('DefaultFeeds').getProxy().batch({update: [model]});
						}
					}
                    Ext.get(node).unmask();
				}
            });
            
    },
	
	validFeedUrl: function(url){
		
		rssreader.JsonP.request({
			query: 'select * from xml where url="' + url + '"',
			callback: function(response){
				var results = [];
				if (response.query && response.query.results) {
					results = response.query.results;
					if (results.rss) {
						if (results.rss.channel && results.rss.channel.title) {
							//Ext.getBody().unmask();
							//Ext.YQL.mask.hide();
							rssreader.JsonP.confirmAddFeed(results.rss.channel.title, url);
							return;
						}
					}
					if (results.feed) {
						if (results.feed.title) {
							//Ext.getBody().unmask();
							//Ext.YQL.mask.hide();
							rssreader.JsonP.confirmAddFeed(results.feed.title, url);
							return;
						} 
					}
					if (results.RDF) {
						if (results.RDF.channel && results.RDF.channel.title) {
							//Ext.getBody().unmask();
							//Ext.YQL.mask.hide();
							rssreader.JsonP.confirmAddFeed(results.RDF.channel.title, url);
							return;
						} 
					} 
				}
				//Ext.getBody().unmask();
				//Ext.YQL.mask.hide();
				Ext.Msg.alert('Not a valid feed url!', 'Please try again.', Ext.emptyFn);
			}
			
		});
	},
	
	confirmAddFeed: function(title, url){
		Ext.Msg.confirm('find feed: ' + title,'do you want to save it to the list?', function(btn){
			if(btn=="yes"){
				Ext.dispatch({
		            controller: "favorites",
		            action    : "addFeed2Localstorage",
		            instance  : {
		            	name: title,
						url: url
		            }
			    });	
			}
		});
	} 
};



