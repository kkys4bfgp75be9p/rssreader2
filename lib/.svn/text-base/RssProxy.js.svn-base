/**
 * @author Zhang Ming
 */
Ext.data.RssProxy = Ext.extend(Ext.data.ScriptTagProxy, {
	url: 'http://ajax.googleapis.com/ajax/services/feed/load',
    
	/**
     * @property defaultQuery
     * @type String
     * The search query to run if none is specified (defaults to 'extjs')
     */
    defaultQuery: 'http://www.heise.de/newsticker/heise-atom.xml',
	
	constructor: function(config) {
        config = config || {};
        
        Ext.applyIf(config, {
            extraParams: {
                q: this.defaultQuery,
                v: '1.0',
                num: '100',
                hl: 'ja',
                output: 'json-in-script'
            },
			reader: {
				type: 'json',
				root: 'responseData.feed.entries'
			}
        });
        
        Ext.data.RssProxy.superclass.constructor.call(this, config);
    }
});

Ext.data.ProxyMgr.registerType('rss', Ext.data.RssProxy);