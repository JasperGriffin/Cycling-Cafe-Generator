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
    define(['ApiClient', 'model/SummaryAthlete'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./SummaryAthlete'));
  } else {
    // Browser globals (root is window)
    if (!root.StravaApiV3) {
      root.StravaApiV3 = {};
    }
    root.StravaApiV3.Comment = factory(root.StravaApiV3.ApiClient, root.StravaApiV3.SummaryAthlete);
  }
}(this, function(ApiClient, SummaryAthlete) {
  'use strict';

  /**
   * The Comment model module.
   * @module model/Comment
   * @version 3.0.0
   */

  /**
   * Constructs a new <code>Comment</code>.
   * @alias module:model/Comment
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>Comment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Comment} obj Optional instance to populate.
   * @return {module:model/Comment} The populated <code>Comment</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('activity_id'))
        obj.activityId = ApiClient.convertToType(data['activity_id'], 'Number');
      if (data.hasOwnProperty('text'))
        obj.text = ApiClient.convertToType(data['text'], 'String');
      if (data.hasOwnProperty('athlete'))
        obj.athlete = SummaryAthlete.constructFromObject(data['athlete']);
      if (data.hasOwnProperty('created_at'))
        obj.createdAt = ApiClient.convertToType(data['created_at'], 'Date');
    }
    return obj;
  }

  /**
   * The unique identifier of this comment
   * @member {Number} id
   */
  exports.prototype.id = undefined;

  /**
   * The identifier of the activity this comment is related to
   * @member {Number} activityId
   */
  exports.prototype.activityId = undefined;

  /**
   * The content of the comment
   * @member {String} text
   */
  exports.prototype.text = undefined;

  /**
   * @member {module:model/SummaryAthlete} athlete
   */
  exports.prototype.athlete = undefined;

  /**
   * The time at which this comment was created.
   * @member {Date} createdAt
   */
  exports.prototype.createdAt = undefined;

  return exports;

}));
