/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();define(["require","exports","./AbstractInteractableModule","jquery","../Router","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification"],function(t,e,r,o,a,n,s){"use strict";return new(function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.selectorDeleteTrigger=".t3js-clearTypo3temp-delete",e.selectorOutputContainer=".t3js-clearTypo3temp-output",e.selectorStatContainer=".t3js-clearTypo3temp-stat-container",e.selectorStatsTrigger=".t3js-clearTypo3temp-stats",e.selectorStatTemplate=".t3js-clearTypo3temp-stat-template",e.selectorStatNumberOfFiles=".t3js-clearTypo3temp-stat-numberOfFiles",e.selectorStatDirectory=".t3js-clearTypo3temp-stat-directory",e}return __extends(e,t),e.prototype.initialize=function(t){var e=this;this.currentModal=t,this.getStats(),t.on("click",this.selectorStatsTrigger,function(t){t.preventDefault(),o(e.selectorOutputContainer).empty(),e.getStats()}),t.on("click",this.selectorDeleteTrigger,function(t){var r=o(t.currentTarget).data("folder"),a=o(t.currentTarget).data("storage-uid");t.preventDefault(),e.delete(r,a)})},e.prototype.getStats=function(){var t=this,e=this.getModalBody();o.ajax({url:a.getUrl("clearTypo3tempFilesStats"),cache:!1,success:function(r){!0===r.success?(e.empty().append(r.html),n.setButtons(r.buttons),Array.isArray(r.stats)&&r.stats.length>0&&r.stats.forEach(function(r){if(r.numberOfFiles>0){var o=e.find(t.selectorStatTemplate).clone();o.find(t.selectorStatNumberOfFiles).text(r.numberOfFiles),o.find(t.selectorStatDirectory).text(r.directory),o.find(t.selectorDeleteTrigger).attr("data-folder",r.directory),o.find(t.selectorDeleteTrigger).attr("data-storage-uid",r.storageUid),e.find(t.selectorStatContainer).append(o.html())}})):s.error("Something went wrong")},error:function(t){a.handleAjaxError(t,e)}})},e.prototype.delete=function(t,e){var r=this,n=this.getModalBody(),c=this.getModuleContent().data("clear-typo3temp-delete-token");o.ajax({method:"POST",url:a.getUrl(),context:this,data:{install:{action:"clearTypo3tempFiles",token:c,folder:t,storageUid:e}},cache:!1,success:function(t){!0===t.success&&Array.isArray(t.status)?(t.status.forEach(function(t){s.success(t.message)}),r.getStats()):s.error("Something went wrong")},error:function(t){a.handleAjaxError(t,n)}})},e}(r.AbstractInteractableModule))});