/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/file', 'N/https', 'N/ui/serverWidget'],
    /**
 * @param{file} file
 * @param{https} https
 * @param{serverWidget} serverWidget
 */
    (file, https, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
         try{
           if(scriptContext.request.method === "GET"){
            let form = serverWidget.createForm({
                title: "Hourly Weather Data",
             });
            form.clientScriptFileId = 2531;
             form.addFieldGroup({
                id: "custpage_filtergroup",
                label:"Filters",
             });
             form.addField({
                id : 'custpage_fil_date',
                type : serverWidget.FieldType.DATE,
                label : 'Date',
                container:'custpage_filtergroup'
            });
    
            form.addField({
                id:'custpage_fil_loc',
                type: serverWidget.FieldType.TEXT,
                label:"Location",
                container:'custpage_filtergroup'
            });
    
            form.addButton({
                id: "custpage_getdata_button",
                label: "Get Weather Data",
                functionName: ""
            });

            let subList = form.addSublist({
                id: "custpage_sublist_data",
                label: "Weather Information API",
                type: serverWidget.SublistType.LIST
            });

            subList.addField({
                id: "custpage_datetime",
                label: "DateTime",
                type: serverWidget.FieldType.TEXT,
            });

            subList.addField({
                id: "custpage_datetimeepoch",
                label:"DatetimeEpoc",
                type:serverWidget.FieldType.INTEGER,
            });
            subList.addField({
                id: "custpage_temp",
                label: "Temperature",
                type: serverWidget.FieldType.FLOAT
            });

            subList.addField({
                id: "custpage_feelslike",
                label: "Feelslike",
                type: serverWidget.FieldType.FLOAT
            })

            subList.addField({
                id: "custpage_humid",
                label: "humidity",
                type: serverWidget.FieldType.FLOAT
            })
            subList.addField({
                id: "custpage_dew",
                label: "dew",
                type: serverWidget.FieldType.FLOAT
            })

            subList.addField({
                id: "custpage_precip",
                label: "precip",
                type: serverWidget.FieldType.INTEGER
            })

            subList.addField({
                id: "custpage_predp",
                label: "dew",
                type: serverWidget.FieldType.INTEGER
            });
    
            subList.addField({
                id: "custpage_precipprob",
                label: "preciprob",
                type: serverWidget.FieldType.INTEGER
            });


            subList.addField({
                id: "custpage_snow",
                label: "snow",
                type: serverWidget.FieldType.INTEGER
            });

            subList.addField({
                id: "custpage_snowdepth",
                label: "snowdepth",
                type: serverWidget.FieldType.INTEGER
            });
            
            subList.addField({
                id: "custpage_preciptype",
                label: "preciptype",
                type: serverWidget.FieldType.TEXT
            });

            subList.addField({
                id: "custpage_windgust",
                label: "windgust",
                type: serverWidget.FieldType.TEXT
            });

          

            form.addButton({
                id: "custpage_downloadcsv",
                label: "Download CSV",
                functionName: ""
            });

            let locationV = scriptContext.request.parameters.location||null;
            let datev     = scriptContext.request.parameters.date||null;
            log.debug("location",locationV)
            log.debug("date",datev);
            let locationVal = JSON.stringify(locationV);
            let dateVal     = JSON.stringify(datev)
            let headersRequest = {
                'Content-Type': 'application/json'
            }
            let apiUrl2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+locationV+"/"+datev+"/"+datev+"/?unitGroup=metric&key=Y8V23A8SG58ZTP8M42W8AV5P9&contentType=json";
            log.debug("url2",apiUrl2)
            // let apiUrl1 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+locationVal+"/"+dateVal+"/"+dateVal+"/?unitGroup=metric&key=Y8V23A8SG58ZTP8M42W8AV5P9&contentType=json";
            // log.debug("api1",apiUrl1);
            let apiUrl ="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kakkanad/2024-08-29/2024-09-29?unitGroup=metric&key=Y8V23A8SG58ZTP8M42W8AV5P9&contentType=json";
            log.debug("url",apiUrl);
             let response = https.request({
                method:https.Method.GET,
                url: apiUrl2,
                headers: headersRequest
            });
            log.debug(response.code);
            // let response1 = https.request({
            //     method:https.Method.GET,
            //     url: apiUrl,
            //     headers: headersRequest
            // });
            // log.debug(response1.code);
            if(response.code == 200){
                let weatherData = JSON.parse(response.body);
               log.debug("weather",weatherData);
           }
           scriptContext.response.writePage(form);
         }
         }catch(e){

            log.error("error",e.message)
         }

        }

        return {onRequest}

    });
