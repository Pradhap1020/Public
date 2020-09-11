//=============================================================================================
// environment = "local";
environment = "live";
Page_Parameter_Object = {};
//=============================================================================================
Domain_Name = "creator.zoho.com";
zc_ownername = "zappyworks"
Application_Name = "pub-hub"
AuthToken = "550f64dfe0ea61d27c7876f559a36745"
Auth =  "Zoho-oauthtoken 1000.9d36342d136ae6d978f51a53af3eeab3.9166f73189793a8f11e0bdfb44c3f09c";
//=============================================================================================
//=============================================================================================
//=============================================================================================
Zappyconfigration = {"environment":environment,"LocalDatabase":"LocalDatabase","PageParameter":Page_Parameter_Object}
if(Zappyconfigration.environment == "live")
{
    var ZAPPY =
    { 
        init: function ()
        {
            return new Promise(function(resolve, reject)
		    {
                var creatorSdkPromise = ZOHO.CREATOR.init();
                creatorSdkPromise.then(function(data)
                { 
                    resolve(data)
                })

            })
            .catch(function(error)
            {
				reject(error);
	        });    
        },
        getAllRecords: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getAllRecords(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
           
                .catch(function(error)
                {
                    reject(error);
                });    
            })
        },
        addRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.addRecord(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
            
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        updateRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.updateRecord(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
          
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        getRecordById: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getRecordById(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
            
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        deleteRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getRecordById(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
           
            .catch(function(error)
            {
				reject(error);
            }); 
        })   
        },
        deleteRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getRecordById(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
           
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        uploadFile: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getRecordById(config);
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
           
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        getQueryParams: function ()
        { 
            return new Promise(function(resolve, reject)
		    {
                var getRecordscourse = ZOHO.CREATOR.API.getQueryParams();
		        getRecordscourse.then(function(DataFromCreator)
		        { 
                    resolve(DataFromCreator)
                })
           
            .catch(function(error)
            {
				reject(error);
            });    
        })
        },
        getSourceURI: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                //for Get the files inside the node server
                str= window.location.href;
                var res = str.split("/app/");
                End_point_url =  res[0]+"/app/"
                resolve(End_point_url)
               
           
            .catch(function(error)
            {
				reject(error);
            });    
        })
        }
    }
}
else if (Zappyconfigration.environment == "local"){
    var ZAPPY =
    { 
        init: function ()
        {
            return new Promise(function(resolve, reject)
		    {
                data={"localStart":"Api will be considered as external"}
                resolve(data)
            })
            .catch(function(error)
            {
				reject(error);
	        });    
        },
        getAllRecords:function (Config)
        {
            return new Promise(function(resolve, reject)
		    {
                Request_url ="https://"+Domain_Name+"/api/v2/"+zc_ownername+"/"+Application_Name+"/view/"+Config.reportName+"?authtoken="+AuthToken
                From_no = ((((Config.page?Config.page:1)-1)*((Config.pageSize?Config.pageSize:200)))+1);
                Limit_no = (Config.pageSize?Config.pageSize:200)
                Request_url = Request_url+"&from="+From_no+"&limit="+Limit_no;
                if(Config.criteria)
                {
                    Request_url = Request_url+"&criteria="+Config.criteria;
                }
                $.ajax(
                {
                    url: Request_url,
                    success: function(result)
                    {
                        resolve(result);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        reject("some error");
                     }}); 
            })    
        },
        getRecordById:function (Config)
        {
            return new Promise(function(resolve, reject)
		    {
                Request_url ="https://"+Domain_Name+"/api/v2/"+zc_ownername+"/"+Application_Name+"/view/"+Config.reportName+"/"+Config.id+"?authtoken="+AuthToken
                $.ajax(
                {
                    url: Request_url,
                    success: function(result)
                    {
                        resolve(result);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        reject("some error");
                     }}); 
               
            })
        },
        addRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                Request_url ="https://"+Domain_Name+"/api/v2/"+zc_ownername+"/"+Application_Name+"/form/"+config.formName
                
                
                $.ajax(
                {
                    type: "POST",
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", Auth),
                        request.setRequestHeader("Access-Control-Allow-Origin", "*");
                      },
                    url: Request_url,
                    data: JSON.stringify(config.data),
                    success: function(result)
                    {
                        resolve(result);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        reject("some error");
                     }}); 
            })  
        },
        updateRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                reject("updateRecord is not possicle in local");   
            })   
        },
        deleteRecord: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                Request_url ="https://"+Domain_Name+"/api/v2/"+zc_ownername+"/"+Application_Name+"/view/"+Config.reportName+"/record/delete?authtoken="+AuthToken
                if(Config.criteria)
                {
                    Request_url = Request_url+"&criteria="+Config.criteria;
                }
                $.ajax(
                {
                    url: Request_url,
                    type:"POST",
                    success: function(result)
                    {
                        resolve(result);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        reject("some error");
                     }});   
            })   
        },
        uploadFile: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                reject("uploadFile is not possicle in local");   
            })   
        },
        getQueryParams: function ()
        { 
            return new Promise(function(resolve, reject)
		    {
                resolve(Zappyconfigration.PageParameter)
            })
            .catch(function(error)
            {
				reject(error);
	        });    
        },
        getSourceURI: function (config)
        { 
            return new Promise(function(resolve, reject)
		    {
                resolve("")    
            })
            .catch(function(error)
            {
				reject(error);
	        });    
        }               
    }
}