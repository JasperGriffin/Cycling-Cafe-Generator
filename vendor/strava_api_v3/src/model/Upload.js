/*
 * Strava API v3
 * The [Swagger Playground](https://developers.strava.com/playground) is the easiest way to familiarize yourself with the Strava API by submitting HTTP requests and observing the responses before you write any client code. It will show what a response will look like with different endpoints depending on the authorization scope you receive from your athletes. To use the Playground, go to https://www.strava.com/settings/api and change your “Authorization Callback Domain” to developers.strava.com. Please note, we only support Swagger 2.0. There is a known issue where you can only select one scope at a time. For more information, please check the section “client code” at https://developers.strava.com/docs.
 *
 * OpenAPI spec version: 3.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.9
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.StravaApiV3) {
      root.StravaApiV3 = {};
    }
    root.StravaApiV3.Upload = factory(root.StravaApiV3.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The Upload model module.
   * @module model/Upload
   * @version 3.0.0
   */

  /**
   * Constructs a new <code>Upload</code>.
   * @alias module:model/Upload
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>Upload</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Upload} obj Optional instance to populate.
   * @return {module:model/Upload} The populated <code>Upload</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('id_str'))
        obj.idStr = ApiClient.convertToType(data['id_str'], 'String');
      if (data.hasOwnProperty('external_id'))
        obj.externalId = ApiClient.convertToType(data['external_id'], 'String');
      if (data.hasOwnProperty('error'))
        obj.error = ApiClient.convertToType(data['error'], 'String');
      if (data.hasOwnProperty('status'))
        obj.status = ApiClient.convertToType(data['status'], 'String');
      if (data.hasOwnProperty('activity_id'))
        obj.activityId = ApiClient.convertToType(data['activity_id'], 'Number');
    }
    return obj;
  }

  /**
   * The unique identifier of the upload
   * @member {Number} id
   */
  exports.prototype.id = undefined;

  /**
   * The unique identifier of the upload in string format
   * @member {String} idStr
   */
  exports.prototype.idStr = undefined;

  /**
   * The external identifier of the upload
   * @member {String} externalId
   */
  exports.prototype.externalId = undefined;

  /**
   * The error associated with this upload
   * @member {String} error
   */
  exports.prototype.error = undefined;

  /**
   * The status of this upload
   * @member {String} status
   */
  exports.prototype.status = undefined;

  /**
   * The identifier of the activity this upload resulted into
   * @member {Number} activityId
   */
  exports.prototype.activityId = undefined;

  return exports;

}));
