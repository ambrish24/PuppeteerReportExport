const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");
const pdfMakePrinter = require("pdfmake/src/printer");
const htmlToPdfMake = require("html-to-pdfmake");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const fs = require('fs');
const axios = require("axios");
const bodyParse = require("body-parser");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
app.options("/")
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParse.json());
app.options("*", function(req,res) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Encoding, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, X-DR-SYSTEMID, X-DR-EXPORT-FILENAME, X-DR-EXPORT-MESSAGE, X-DR-L10N, X-DR-SESSIONCONTEXT-PLANID, X-DR-SESSIONCONTEXT-GLOBAL, X-DR-SESSIONCONTEXT-LOCAL, X-DR-PREF-DATETIMEPATTERN,USERNAME,X-BP-USERNAME,X-BP-TENANT");
    res.header("Access-Control-Expose-Headers", "Content-Type, Content-Encoding, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, X-DR-SYSTEMID, X-DR-EXPORT-FILENAME, X-DR-EXPORT-MESSAGE, X-DR-L10N, X-DR-SESSIONCONTEXT-PLANID, X-DR-SESSIONCONTEXT-GLOBAL, X-DR-SESSIONCONTEXT-LOCAL, X-DR-PREF-DATETIMEPATTERN,USERNAME,X-BP-USERNAME,X-BP-TENANT");
    res.send("");
})
app.post("/", async (req, res) => {
    console.log("getting pdf");
    const resp = await getPdf(req.body);
    console.log("sending pdf");
    res.set({ "Content-Type": "application/pdf" });
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Encoding, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, X-DR-SYSTEMID, X-DR-EXPORT-FILENAME, X-DR-EXPORT-MESSAGE, X-DR-L10N, X-DR-SESSIONCONTEXT-PLANID, X-DR-SESSIONCONTEXT-GLOBAL, X-DR-SESSIONCONTEXT-LOCAL, X-DR-PREF-DATETIMEPATTERN,USERNAME,X-BP-USERNAME,X-BP-TENANT");
    res.header("Access-Control-Expose-Headers", "Content-Type, Content-Encoding, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-XSRF-TOKEN, X-DR-SYSTEMID, X-DR-EXPORT-FILENAME, X-DR-EXPORT-MESSAGE, X-DR-L10N, X-DR-SESSIONCONTEXT-PLANID, X-DR-SESSIONCONTEXT-GLOBAL, X-DR-SESSIONCONTEXT-LOCAL, X-DR-PREF-DATETIMEPATTERN,USERNAME,X-BP-USERNAME,X-BP-TENANT");
    // res.set({ 'Content-Type': 'text/html', 'Content-Length': resp.length })
    // var pdf = {content: [htmlToPdfMake(resp, {window: window})]};
    // // console.log(JSON.stringify(pdf));
    // // generatePdf(pdf, (response) => {
    // //   res.send(response);
    // // });
    // pdfMake.createPdf(pdf).
    // );
    res.send(resp);
});
app.get("/pdf", (req, res) => {
    var body = {
        "restrictedMode": false,
        "filterList": [
            {
                "curPrefSnapshot": {
                    "core.grid.datasources.sql.configuration.NotEqualOperand": {
                        "value": "!=",
                        "resolvedValue": "!=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.NotEqualOperand",
                        "id": "466",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Not Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.KeywordForNULL": {
                        "value": "NULL",
                        "resolvedValue": "NULL",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.KeywordForNULL",
                        "id": "461",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "30",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Keyword for NULL"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterForNOT": {
                        "value": "!",
                        "resolvedValue": "!",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterForNOT",
                        "id": "467",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Character for NOT"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterForOR": {
                        "value": "|",
                        "resolvedValue": "|",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterForOR",
                        "id": "468",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Character for OR"
                    },
                    "core.grid.datasources.sql.configuration.KeywordForOR": {
                        "value": "OR",
                        "resolvedValue": "OR",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.KeywordForOR",
                        "id": "462",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "30",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Keyword for OR"
                    },
                    "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand": {
                        "value": ">=",
                        "resolvedValue": ">=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand",
                        "id": "460",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Greater Than or Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.LessThanOperand": {
                        "value": "<",
                        "resolvedValue": "<",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.LessThanOperand",
                        "id": "463",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Less Than Operand"
                    },
                    "core.grid.datasources.sql.configuration.LessThanOrEqualOperand": {
                        "value": "<=",
                        "resolvedValue": "<=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.LessThanOrEqualOperand",
                        "id": "464",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Less Than or Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.GreaterThanOperand": {
                        "value": ">",
                        "resolvedValue": ">",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.GreaterThanOperand",
                        "id": "459",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Greater Than Operand"
                    },
                    "core.grid.datasources.sql.configuration.EqualOperand": {
                        "value": "=",
                        "resolvedValue": "=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.EqualOperand",
                        "id": "457",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.EscapeCharacter": {
                        "value": "\\",
                        "resolvedValue": "\\",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.EscapeCharacter",
                        "id": "458",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Escape character"
                    },
                    "core.grid.datasources.sql.configuration.MultiCharacterWildCard": {
                        "value": "*",
                        "resolvedValue": "*",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.MultiCharacterWildCard",
                        "id": "465",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Multicharacter Wildcard"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterWildCard": {
                        "value": "_",
                        "resolvedValue": "_",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterWildCard",
                        "id": "469",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Single Character Wildcard"
                    },
                    "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay": {
                        "value": "500",
                        "resolvedValue": 500,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay",
                        "id": "576",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 4,
                            "name": "Default String",
                            "behaviour": "NUMBER",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Default filter change stream delay"
                    },
                    "core.grid.datasources.sql.configuration.SearchOnEnter": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SearchOnEnter",
                        "id": "577",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Enable search after Enter only"
                    },
                    "core.grid.datasources.sql.configuration.trimFilterWhitespace": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.trimFilterWhitespace",
                        "id": "574",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Trim Whitespace in Filters"
                    },
                    "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands",
                        "id": "456",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": false,
                        "displayName": "Disable Wildcards and Operands"
                    },
                    "com.blueplanet.core.dateFormat": {
                        "value": "dd-MM-yy",
                        "resolvedValue": "dd-MM-yy",
                        "valueMap": null,
                        "text": null,
                        "preference": "com.blueplanet.core.dateFormat",
                        "id": "1761",
                        "system": 4,
                        "userId": "1",
                        "page": null,
                        "parentSystemPreferenceId": null,
                        "preferenceType": {
                            "id": 13,
                            "name": "Date Format",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "displayName": "Date Format"
                    },
                    "oracleDateTimeFormat": {
                        "value": "DD-MM-YY",
                        "resolvedValue": "dd-MM-yy",
                        "valueMap": null,
                        "text": null,
                        "preference": "com.blueplanet.core.dateFormat",
                        "id": "1761",
                        "system": 4,
                        "userId": "1",
                        "page": null,
                        "parentSystemPreferenceId": null,
                        "preferenceType": {
                            "id": 13,
                            "name": "Date Format",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "displayName": "Date Format"
                    }
                },
                "selectedIds": [],
                "filteredIds": [],
                "restrictToSelectedObjects": false,
                "templateId": "4431",
                "globalTemplate": false,
                "clearGridOnNewSearch": false,
                "clientSortBinary": true,
                "clientSortCollation": "",
                "precalcPref": [
                    "_",
                    "*",
                    "!",
                    "|",
                    " OR ",
                    "NULL",
                    "<",
                    "<=",
                    ">",
                    ">=",
                    "!=",
                    "="
                ],
                "reportAttributes": [
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Location",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LOCATIONNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Location",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "LocationNamePlaceHolder",
                        "placeHolderColumnName": "name",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Device Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [
                            "BGColor"
                        ],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Device Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Full Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "FULLNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Full Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Relative Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "RELATIVENAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Relative Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "RelativeNamePlaceHolder",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "ALIAS1",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "ALIAS1",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "ALIAS1",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "ALIAS2",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "ALIAS2",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "ALIAS2",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Node Type",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODETYPENAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Node Type",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Node Subtype",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODEDEFNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Node Subtype",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "NOTES",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NOTES",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "NOTES",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Provision Status",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "PROVISIONSTATUSNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Provision Status",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Created Date",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDDATE",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Created Date",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Created By",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDBYUSER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Created By",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Last Modified Date",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LASTMODIFIEDDATE",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Last Modified Date",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Modified By",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "MODIFIEDBYUSER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Modified By",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "updateId",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODEID",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "updateId",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "GRIDROWID",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "GRIDROWID",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "GRIDROWID",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "char",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "#ff00f0",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "BGCOLOR",
                        "customProperty": "style:background-color",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "#ff00f0",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "UpdateIdFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "UPDATEIDFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "UpdateIdFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "LocationFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LOCATIONNAMEFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "LocationFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "LOCATIONEXTFILTER",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "CreatedDateFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDDATEFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "CreatedDateFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    }
                ],
                "reportAttributeOrderItems": [
                    {
                        "order": 2,
                        "key": "Created Date"
                    }
                ],
                "reportName": "Devices",
                "className": null,
                "objectClassId": null,
                "saveAsUserPreference": false,
                "worksheetName": null,
                "displayName": null
            }
        ],
        "gridInfo": {
            "gridName": "sqlGridDemo",
            "tabName": "devices"
        },
        "startOfRecord": 1,
        "numberOfRecords": 1,
        "prefs": {
            "core.grid.datasources.sql.configuration.NotEqualOperand": {
                "value": "!=",
                "resolvedValue": "!=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.NotEqualOperand",
                "id": "466",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Not Equal Operand"
            },
            "core.grid.datasources.sql.configuration.KeywordForNULL": {
                "value": "NULL",
                "resolvedValue": "NULL",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.KeywordForNULL",
                "id": "461",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "30",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Keyword for NULL"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterForNOT": {
                "value": "!",
                "resolvedValue": "!",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterForNOT",
                "id": "467",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Character for NOT"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterForOR": {
                "value": "|",
                "resolvedValue": "|",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterForOR",
                "id": "468",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Character for OR"
            },
            "core.grid.datasources.sql.configuration.KeywordForOR": {
                "value": "OR",
                "resolvedValue": "OR",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.KeywordForOR",
                "id": "462",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "30",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Keyword for OR"
            },
            "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand": {
                "value": ">=",
                "resolvedValue": ">=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand",
                "id": "460",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Greater Than or Equal Operand"
            },
            "core.grid.datasources.sql.configuration.LessThanOperand": {
                "value": "<",
                "resolvedValue": "<",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.LessThanOperand",
                "id": "463",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Less Than Operand"
            },
            "core.grid.datasources.sql.configuration.LessThanOrEqualOperand": {
                "value": "<=",
                "resolvedValue": "<=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.LessThanOrEqualOperand",
                "id": "464",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Less Than or Equal Operand"
            },
            "core.grid.datasources.sql.configuration.GreaterThanOperand": {
                "value": ">",
                "resolvedValue": ">",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.GreaterThanOperand",
                "id": "459",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Greater Than Operand"
            },
            "core.grid.datasources.sql.configuration.EqualOperand": {
                "value": "=",
                "resolvedValue": "=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.EqualOperand",
                "id": "457",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Equal Operand"
            },
            "core.grid.datasources.sql.configuration.EscapeCharacter": {
                "value": "\\",
                "resolvedValue": "\\",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.EscapeCharacter",
                "id": "458",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Escape character"
            },
            "core.grid.datasources.sql.configuration.MultiCharacterWildCard": {
                "value": "*",
                "resolvedValue": "*",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.MultiCharacterWildCard",
                "id": "465",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Multicharacter Wildcard"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterWildCard": {
                "value": "_",
                "resolvedValue": "_",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterWildCard",
                "id": "469",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Single Character Wildcard"
            },
            "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay": {
                "value": "500",
                "resolvedValue": 500,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay",
                "id": "576",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 4,
                    "name": "Default String",
                    "behaviour": "NUMBER",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Default filter change stream delay"
            },
            "core.grid.datasources.sql.configuration.SearchOnEnter": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SearchOnEnter",
                "id": "577",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Enable search after Enter only"
            },
            "core.grid.datasources.sql.configuration.trimFilterWhitespace": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.trimFilterWhitespace",
                "id": "574",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Trim Whitespace in Filters"
            },
            "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands",
                "id": "456",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": false,
                "displayName": "Disable Wildcards and Operands"
            },
            "com.blueplanet.core.dateFormat": {
                "value": "dd-MM-yy",
                "resolvedValue": "dd-MM-yy",
                "valueMap": null,
                "text": null,
                "preference": "com.blueplanet.core.dateFormat",
                "id": "1761",
                "system": 4,
                "userId": "1",
                "page": null,
                "parentSystemPreferenceId": null,
                "preferenceType": {
                    "id": 13,
                    "name": "Date Format",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "displayName": "Date Format"
            },
            "oracleDateTimeFormat": {
                "value": "DD-MM-YY",
                "resolvedValue": "dd-MM-yy",
                "valueMap": null,
                "text": null,
                "preference": "com.blueplanet.core.dateFormat",
                "id": "1761",
                "system": 4,
                "userId": "1",
                "page": null,
                "parentSystemPreferenceId": null,
                "preferenceType": {
                    "id": 13,
                    "name": "Date Format",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "displayName": "Date Format"
            }
        },
        "maxValues": {}
    }
    var url =
        "http://localhost:8080/blueplanet-core-showcase-rest/core/export/sql/by/filter?type=pdf&zipped=false";
    console.log('pdf called');
    //http.post(url, body).
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify(body),
        headers: {
            'Accept': 'application/octet-stream',
            'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
    }).then( (response) => {
        console.log('got pdf');
        var fileData = Buffer.from(response.data, 'base64');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("content-type", "application/pdf");
        res.send(fileData);
    });
});


app.get("/pdf/write", (req, res) => {
    var body = {
        "restrictedMode": false,
        "filterList": [
            {
                "curPrefSnapshot": {
                    "core.grid.datasources.sql.configuration.NotEqualOperand": {
                        "value": "!=",
                        "resolvedValue": "!=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.NotEqualOperand",
                        "id": "466",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Not Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.KeywordForNULL": {
                        "value": "NULL",
                        "resolvedValue": "NULL",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.KeywordForNULL",
                        "id": "461",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "30",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Keyword for NULL"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterForNOT": {
                        "value": "!",
                        "resolvedValue": "!",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterForNOT",
                        "id": "467",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Character for NOT"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterForOR": {
                        "value": "|",
                        "resolvedValue": "|",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterForOR",
                        "id": "468",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Character for OR"
                    },
                    "core.grid.datasources.sql.configuration.KeywordForOR": {
                        "value": "OR",
                        "resolvedValue": "OR",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.KeywordForOR",
                        "id": "462",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "30",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Keyword for OR"
                    },
                    "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand": {
                        "value": ">=",
                        "resolvedValue": ">=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand",
                        "id": "460",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Greater Than or Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.LessThanOperand": {
                        "value": "<",
                        "resolvedValue": "<",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.LessThanOperand",
                        "id": "463",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Less Than Operand"
                    },
                    "core.grid.datasources.sql.configuration.LessThanOrEqualOperand": {
                        "value": "<=",
                        "resolvedValue": "<=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.LessThanOrEqualOperand",
                        "id": "464",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Less Than or Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.GreaterThanOperand": {
                        "value": ">",
                        "resolvedValue": ">",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.GreaterThanOperand",
                        "id": "459",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Greater Than Operand"
                    },
                    "core.grid.datasources.sql.configuration.EqualOperand": {
                        "value": "=",
                        "resolvedValue": "=",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.EqualOperand",
                        "id": "457",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "29",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Equal Operand"
                    },
                    "core.grid.datasources.sql.configuration.EscapeCharacter": {
                        "value": "\\",
                        "resolvedValue": "\\",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.EscapeCharacter",
                        "id": "458",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Escape character"
                    },
                    "core.grid.datasources.sql.configuration.MultiCharacterWildCard": {
                        "value": "*",
                        "resolvedValue": "*",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.MultiCharacterWildCard",
                        "id": "465",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Multicharacter Wildcard"
                    },
                    "core.grid.datasources.sql.configuration.SingleCharacterWildCard": {
                        "value": "_",
                        "resolvedValue": "_",
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SingleCharacterWildCard",
                        "id": "469",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "28",
                        "preferenceType": {
                            "id": 2,
                            "name": "Default String",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Single Character Wildcard"
                    },
                    "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay": {
                        "value": "500",
                        "resolvedValue": 500,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay",
                        "id": "576",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 4,
                            "name": "Default String",
                            "behaviour": "NUMBER",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Default filter change stream delay"
                    },
                    "core.grid.datasources.sql.configuration.SearchOnEnter": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.SearchOnEnter",
                        "id": "577",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Enable search after Enter only"
                    },
                    "core.grid.datasources.sql.configuration.trimFilterWhitespace": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.trimFilterWhitespace",
                        "id": "574",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": true,
                        "displayName": "Trim Whitespace in Filters"
                    },
                    "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands": {
                        "value": "OFF",
                        "resolvedValue": false,
                        "valueMap": null,
                        "text": null,
                        "preference": "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands",
                        "id": "456",
                        "system": 4,
                        "page": null,
                        "parentSystemPreferenceId": "26",
                        "preferenceType": {
                            "id": 5,
                            "name": "Default Boolean",
                            "behaviour": "BOOLEAN",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "systemLevelOnly": false,
                        "displayName": "Disable Wildcards and Operands"
                    },
                    "com.blueplanet.core.dateFormat": {
                        "value": "dd-MM-yy",
                        "resolvedValue": "dd-MM-yy",
                        "valueMap": null,
                        "text": null,
                        "preference": "com.blueplanet.core.dateFormat",
                        "id": "1761",
                        "system": 4,
                        "userId": "1",
                        "page": null,
                        "parentSystemPreferenceId": null,
                        "preferenceType": {
                            "id": 13,
                            "name": "Date Format",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "displayName": "Date Format"
                    },
                    "oracleDateTimeFormat": {
                        "value": "DD-MM-YY",
                        "resolvedValue": "dd-MM-yy",
                        "valueMap": null,
                        "text": null,
                        "preference": "com.blueplanet.core.dateFormat",
                        "id": "1761",
                        "system": 4,
                        "userId": "1",
                        "page": null,
                        "parentSystemPreferenceId": null,
                        "preferenceType": {
                            "id": 13,
                            "name": "Date Format",
                            "behaviour": "STRING",
                            "regularExpression": null,
                            "regularExpressionFailMessage": null,
                            "enumValues": null
                        },
                        "flag": 0,
                        "regularExpression": null,
                        "regularExpressionFailMessage": null,
                        "markedForCreation": false,
                        "displayName": "Date Format"
                    }
                },
                "selectedIds": [],
                "filteredIds": [],
                "restrictToSelectedObjects": false,
                "templateId": "4431",
                "globalTemplate": false,
                "clearGridOnNewSearch": false,
                "clientSortBinary": true,
                "clientSortCollation": "",
                "precalcPref": [
                    "_",
                    "*",
                    "!",
                    "|",
                    " OR ",
                    "NULL",
                    "<",
                    "<=",
                    ">",
                    ">=",
                    "!=",
                    "="
                ],
                "reportAttributes": [
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Location",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LOCATIONNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Location",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "LocationNamePlaceHolder",
                        "placeHolderColumnName": "name",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Device Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [
                            "BGColor"
                        ],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Device Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Full Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "FULLNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Full Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Relative Name",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "RELATIVENAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Relative Name",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "RelativeNamePlaceHolder",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "ALIAS1",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "ALIAS1",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "ALIAS1",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "ALIAS2",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "ALIAS2",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "ALIAS2",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Node Type",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODETYPENAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Node Type",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Node Subtype",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODEDEFNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Node Subtype",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "NOTES",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NOTES",
                        "customProperty": null,
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "NOTES",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": null,
                        "placeHolderName": null,
                        "placeHolderColumnName": null,
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Provision Status",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "PROVISIONSTATUSNAME",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Provision Status",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Created Date",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDDATE",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Created Date",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Created By",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDBYUSER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Created By",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Last Modified Date",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LASTMODIFIEDDATE",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Last Modified Date",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": true,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "Modified By",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "MODIFIEDBYUSER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "Modified By",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": true,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "updateId",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "NODEID",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "updateId",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "GRIDROWID",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "GRIDROWID",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": false,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "GRIDROWID",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "char",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "#ff00f0",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "BGCOLOR",
                        "customProperty": "style:background-color",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "#ff00f0",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "number",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "UpdateIdFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "UPDATEIDFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "UpdateIdFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "string",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "LocationFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "LOCATIONNAMEFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "LocationFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "LOCATIONEXTFILTER",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    },
                    {
                        "fieldType": "date",
                        "dateTimeFormat": null,
                        "filtered": false,
                        "sortable": true,
                        "visible": false,
                        "reported": false,
                        "filterable": false,
                        "filter": {
                            "isExternal": false,
                            "allowable": [
                                ""
                            ],
                            "suggest": [
                                "",
                                ""
                            ],
                            "filterString": "",
                            "filterTypeId": 1
                        },
                        "fieldName": "CreatedDateFilter",
                        "fieldNameAlias": null,
                        "fieldDescription": null,
                        "tableColumnWidth": 0,
                        "tableColumnType": null,
                        "tableColumnName": "CREATEDDATEFILTER",
                        "customProperty": "",
                        "customPropertyFieldNames": [],
                        "dropDownListComplete": false,
                        "exactMatchOnly": false,
                        "smartSearch": false,
                        "editable": false,
                        "alwaysInclude": true,
                        "suppressAttributes": -1,
                        "sortNotUserEditable": false,
                        "functionName": null,
                        "index": 0,
                        "include": 128,
                        "dropDownMaxSize": 0,
                        "dropDownFlagCleared": false,
                        "cellTooltip": null,
                        "image": null,
                        "filteredNonUserEditable": false,
                        "reportedNonUserEditable": false,
                        "useTextAreaAsFilter": false,
                        "key": "CreatedDateFilter",
                        "groupName": null,
                        "columnWidth": 144,
                        "joinOnly": false,
                        "bindVariableName": "",
                        "placeHolderName": "",
                        "placeHolderColumnName": "",
                        "categories": null,
                        "extFunction": false,
                        "usedForFilterConditional": false
                    }
                ],
                "reportAttributeOrderItems": [
                    {
                        "order": 2,
                        "key": "Created Date"
                    }
                ],
                "reportName": "Devices",
                "className": null,
                "objectClassId": null,
                "saveAsUserPreference": false,
                "worksheetName": null,
                "displayName": null
            }
        ],
        "gridInfo": {
            "gridName": "sqlGridDemo",
            "tabName": "devices"
        },
        "startOfRecord": 1,
        "numberOfRecords": 1,
        "prefs": {
            "core.grid.datasources.sql.configuration.NotEqualOperand": {
                "value": "!=",
                "resolvedValue": "!=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.NotEqualOperand",
                "id": "466",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Not Equal Operand"
            },
            "core.grid.datasources.sql.configuration.KeywordForNULL": {
                "value": "NULL",
                "resolvedValue": "NULL",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.KeywordForNULL",
                "id": "461",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "30",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Keyword for NULL"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterForNOT": {
                "value": "!",
                "resolvedValue": "!",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterForNOT",
                "id": "467",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Character for NOT"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterForOR": {
                "value": "|",
                "resolvedValue": "|",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterForOR",
                "id": "468",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Character for OR"
            },
            "core.grid.datasources.sql.configuration.KeywordForOR": {
                "value": "OR",
                "resolvedValue": "OR",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.KeywordForOR",
                "id": "462",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "30",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Keyword for OR"
            },
            "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand": {
                "value": ">=",
                "resolvedValue": ">=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.GreaterThanOrEqualOperand",
                "id": "460",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Greater Than or Equal Operand"
            },
            "core.grid.datasources.sql.configuration.LessThanOperand": {
                "value": "<",
                "resolvedValue": "<",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.LessThanOperand",
                "id": "463",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Less Than Operand"
            },
            "core.grid.datasources.sql.configuration.LessThanOrEqualOperand": {
                "value": "<=",
                "resolvedValue": "<=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.LessThanOrEqualOperand",
                "id": "464",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Less Than or Equal Operand"
            },
            "core.grid.datasources.sql.configuration.GreaterThanOperand": {
                "value": ">",
                "resolvedValue": ">",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.GreaterThanOperand",
                "id": "459",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Greater Than Operand"
            },
            "core.grid.datasources.sql.configuration.EqualOperand": {
                "value": "=",
                "resolvedValue": "=",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.EqualOperand",
                "id": "457",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "29",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Equal Operand"
            },
            "core.grid.datasources.sql.configuration.EscapeCharacter": {
                "value": "\\",
                "resolvedValue": "\\",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.EscapeCharacter",
                "id": "458",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Escape character"
            },
            "core.grid.datasources.sql.configuration.MultiCharacterWildCard": {
                "value": "*",
                "resolvedValue": "*",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.MultiCharacterWildCard",
                "id": "465",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Multicharacter Wildcard"
            },
            "core.grid.datasources.sql.configuration.SingleCharacterWildCard": {
                "value": "_",
                "resolvedValue": "_",
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SingleCharacterWildCard",
                "id": "469",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "28",
                "preferenceType": {
                    "id": 2,
                    "name": "Default String",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Single Character Wildcard"
            },
            "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay": {
                "value": "500",
                "resolvedValue": 500,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.DefaultFilterChangeStreamDelay",
                "id": "576",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 4,
                    "name": "Default String",
                    "behaviour": "NUMBER",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Default filter change stream delay"
            },
            "core.grid.datasources.sql.configuration.SearchOnEnter": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.SearchOnEnter",
                "id": "577",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Enable search after Enter only"
            },
            "core.grid.datasources.sql.configuration.trimFilterWhitespace": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.trimFilterWhitespace",
                "id": "574",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": true,
                "displayName": "Trim Whitespace in Filters"
            },
            "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands": {
                "value": "OFF",
                "resolvedValue": false,
                "valueMap": null,
                "text": null,
                "preference": "core.grid.datasources.sql.configuration.DisableWildCardsAndOperands",
                "id": "456",
                "system": 4,
                "page": null,
                "parentSystemPreferenceId": "26",
                "preferenceType": {
                    "id": 5,
                    "name": "Default Boolean",
                    "behaviour": "BOOLEAN",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "systemLevelOnly": false,
                "displayName": "Disable Wildcards and Operands"
            },
            "com.blueplanet.core.dateFormat": {
                "value": "dd-MM-yy",
                "resolvedValue": "dd-MM-yy",
                "valueMap": null,
                "text": null,
                "preference": "com.blueplanet.core.dateFormat",
                "id": "1761",
                "system": 4,
                "userId": "1",
                "page": null,
                "parentSystemPreferenceId": null,
                "preferenceType": {
                    "id": 13,
                    "name": "Date Format",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "displayName": "Date Format"
            },
            "oracleDateTimeFormat": {
                "value": "DD-MM-YY",
                "resolvedValue": "dd-MM-yy",
                "valueMap": null,
                "text": null,
                "preference": "com.blueplanet.core.dateFormat",
                "id": "1761",
                "system": 4,
                "userId": "1",
                "page": null,
                "parentSystemPreferenceId": null,
                "preferenceType": {
                    "id": 13,
                    "name": "Date Format",
                    "behaviour": "STRING",
                    "regularExpression": null,
                    "regularExpressionFailMessage": null,
                    "enumValues": null
                },
                "flag": 0,
                "regularExpression": null,
                "regularExpressionFailMessage": null,
                "markedForCreation": false,
                "displayName": "Date Format"
            }
        },
        "maxValues": {}
    }
    var url =
        "http://localhost:8080/blueplanet-core-showcase-rest/core/export/sql/by/filter?type=pdf&zipped=false";
    console.log('pdf write called');
    //http.post(url, body).
    axios({
        method: 'post',
        url: url,
        data: JSON.stringify(body),
        headers: {
            'Accept': 'application/octet-stream',
            'Content-Type': 'application/json'
        },
        responseType: 'stream'
    }).then( (response) => {
        response.data.pipe(fs.createWriteStream("temp/my.pdf"));
        res.send("");
    });
});
async function getPdf(reportObj) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--start-maximized"],

    });
    const page = await browser.newPage();
    page.setViewport({width: 800, height: 800, deviceScaleFactor: 2});
    await page.goto("http://localhost:4000/blueplanet-core-showcase/login", {
        waitUntil: "networkidle0"
    });
    await page.focus("input.fc-username-value");
    await page.keyboard.type("administrator");
    await page.focus("span.fc-password-value > input");
    await page.keyboard.type("12345678");
    const loginBtn = await page.$(".fc-paltform-login-button");
    await loginBtn.click();
    await page.waitForNavigation({
        waitUntil: ["domcontentloaded", "networkidle0"]
    });
    page.evaluate(function(report) {
        console.log('setting Storage');
        console.log(report);
        sessionStorage.setItem('fcReportObj', JSON.stringify(report));
        console.log(sessionStorage);
    }, reportObj);
    await page.goto(
        "http://localhost:4000/blueplanet-core-showcase/s;id=NorLzglzF/page;id=root-opc;type=fc-manage-reports-demo;tab=hMvCj3YWRR;data=%7B%22fcIcon%22:%22mdi-view-dashboard%22,%22fcHeader%22:%22Manage%20Reports%22%7D",
        { waitUntil: "domcontentloaded" }
    );
//   const treeItem1 = await page.$(
//     "fc-report-tree fc-inventory-tree > p-tree > div > div > ul > p-treenode:nth-child(3) > li > div > span.ui-tree-toggler.pi.ui-unselectable-text.ng-star-inserted.pi-caret-right"
//   );
    // await treeItem1.click();
    // await page.waitForSelector('#ui-panel-0-content > div > fc-inventory-tree > p-tree > div > div > ul > p-treenode:nth-child(3) > li > ul > p-treenode:nth-child(6) > li > div > span > span > span > span > i');
    // const dockedWindow = await page.$("fc-docked-window");
//   await dockedWindow.evaluate((div) => {
//       div.style.display = 'none';
//   })
//   const dashboard = await page.$(
//     "#ui-panel-0-content > div > fc-inventory-tree > p-tree > div > div > ul > p-treenode:nth-child(3) > li > ul > p-treenode:nth-child(6) > li > div > span > span > span > span > i"
//   );
    // dashboard.click();
    console.log('Waiting for fc-report');
    await page.waitForSelector('.fc-report');
    console.log('fc-report found');
    await page.addStyleTag({
        content: `
          fc-widget-container {
              display: inline-block !important;
          }
           #ui-tabpanel-0 > div {
                 height: 100% !important;
           }
           #ui-tabpanel-0 > div > fc-manage-reports-demo > fc-documentation > div > div:nth-child(4) > div:nth-child(1) {
             height: 2000px !important;
           }
           .fc-widget.card {
             // display: block !important;
             border: none !important;
             box-shadow: none !important;
             background-color: none !important;
           }
           fc-report, body {
             background-color: white !important;
           }
           *::before {
               content: "";
           }
           body {
            display: table !important;
           }
           .material-icons, button {
             visibility: hidden !important;
           }
           i::before {
               content: "" !important;
           }
           input {
             display: none !important;
           }
           .reportHeader, .reportFooter {
               box-shadow: none !important;
               border: none;
           }
           .widget-icons {
               display: none !important;
           }
           @media print {
            //    .fc-widget.card {
            //       break-inside: avoid;
            //    }
            //    .fc-widget-menu {
            //        break-after: avoid;
            //    }
            //    fc-widget-container {
            //        break-inside: avoid;
            //    }
           }
      `
    });
    // await page.emulateMediaType("screen");
    //await page.waitFor(20000);
    // const cavases = await page.$$('canvas');
    // console.log(cavases.length);
    // cavases.forEach(async (canvas, index) => {
    //   let screenshot = await canvas.screenshot({ encoding: "base64" });
    //   console.log(screenshot);
    //   // await canvas.evaluate((elem) => {
    //   //   elem.outerHTML = `<img src="data:image/png;base64, ${screenshot}"`;
    //   // });
    // })
    // await page.setContent(html);
    const dashboardDiv = await page.$(".fc-report");
    await page.waitForSelector('.reportHeader');
    let headerElem = await page.$('.fc-report header');
    let footerElem = await page.$('.fc-report footer');
    let headerDashboard = await page.$('.fc-report header fc-dashboard');
    let footerDashboard = await page.$('.fc-report footer fc-dashboard');
    let headerHtmlData =await headerElem.evaluate(async (header) => {
        return await new Promise((resolve) => {

            var temp = document.querySelector('.reportHeader');
            resolve([header.offsetHeight+'px', temp.outerHTML, temp.style.height, temp.style.marginLeft]);
        })
    });
    let headerHeight = headerHtmlData[0];
    let footerHtmlData =await footerElem.evaluate(async (footer) => {
        return await new Promise((resolve) => {
            var temp = document.querySelector('.reportFooter');
            resolve([footer.offsetHeight + 'px', temp.outerHTML, temp.style.height, temp.style.marginLeft]);
        })
    });

    let footerHeight = footerHtmlData[0];

    await dashboardDiv.evaluate((div) => {
        // page.setContent(div.outerHTML);
        const node = div;
        var canvases = node.querySelectorAll("canvas");
        // headerElem.remove();
        // footerElem.remove();
        // var canvUrl;
        // canvases.forEach((canvas) => {
        //   var img = document.createElement("img");
        //   img.src = canvas.toDataURL();
        //   img.width = canvas.width;
        //   img.height = canvas.height;
        //   canvUrl = img.src
        //   img.style.zIndex = 1000;
        //   canvas.parentElement.replaceChild(img, canvas);
        // });
        document.body.innerHTML = ``;
        document.body.appendChild(node);
    });
    // console.log(html);
    const headerImgUrl = "data:image/jpeg;base64," + await headerElem.screenshot({encoding: "base64"});
    const footerImgUrl = "data:image/jpeg;base64," + await footerElem.screenshot({encoding: "base64"});
    let headerTemplate = `
<div>
    <img src = ${headerImgUrl} style="width: '100%';height: ${headerHtmlData[2]}"/>
</div>
`
    let footerTemplate = `
<div>
    <img src = ${footerImgUrl} style="width: '100%';height: ${footerHtmlData[2]}"/>
</div>
`
    await dashboardDiv.evaluate((node) => {
        node.querySelector('.reportHeader').style.display = 'none';
        node.querySelector('.reportFooter').style.display = 'none';
        const dashboards = node.querySelectorAll('.report fc-dashboard fc-widget-container');
        document.body.innerHTML = '';
        dashboards.forEach((dash) => {
            document.body.appendChild(dash);
        })
        //document.body.appendChild(dashboards)
    });
// await page.waitFor(5000);
// let html = await page.content();
// return html;
    const pdf = await page.pdf({ format: "A3", printBackground: true, displayHeaderFooter: true ,headerTemplate: headerTemplate, footerTemplate: footerTemplate, margin: {top: headerHeight, bottom: footerHeight, left: headerHtmlData[3], right: headerHtmlData[3]} }); // serialized HTML of page DOM.
//  const pdf = await page.pdf({ format: "A4", printBackground: true}); // serialized HTML of page DOM.
    await browser.close();
    return pdf;
}

var generatePdf = (docDefinition, callback) => {
    console.log("generating pdf");
    try {
        var fontDescriptors = {
            Roboto: {
                normal: "fonts/Roboto-Regular.ttf",
                bold: "fonts/Roboto-Medium.ttf",
                italics: "fonts/Roboto-Italic.ttf",
                bolditalics: "fonts/Roboto-MediumItalic.ttf"
            }
        };
        const printer = new pdfMakePrinter(fontDescriptors);
        console.log("creating document");
        const doc = printer.createPdfKitDocument(docDefinition);

        let chunks = [];

        doc.on("data", (chunk) => {
            chunks.push(chunk);
            console.log("chunk");
            console.log(chunk);
        });

        doc.on("end", () => {
            console.log("In End");
            const result = Buffer.concat(chunks);
            callback(result);
        });

        doc.end();
    } catch (err) {
        console.log("caught error");
        throw err;
    }
};

app.listen(8000, () => {
    console.log("Example app listening on port 8000!");
});

