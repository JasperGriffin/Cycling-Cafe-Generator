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
    define(['ApiClient', 'model/SummaryAthlete', 'model/SummaryClub', 'model/SummaryGear'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./SummaryAthlete'), require('./SummaryClub'), require('./SummaryGear'));
  } else {
    // Browser globals (root is window)
    if (!root.StravaApiV3) {
      root.StravaApiV3 = {};
    }
    root.StravaApiV3.DetailedAthlete = factory(root.StravaApiV3.ApiClient, root.StravaApiV3.SummaryAthlete, root.StravaApiV3.SummaryClub, root.StravaApiV3.SummaryGear);
  }
}(this, function(ApiClient, SummaryAthlete, SummaryClub, SummaryGear) {
  'use strict';

  /**
   * The DetailedAthlete model module.
   * @module model/DetailedAthlete
   * @version 3.0.0
   */

  /**
   * Constructs a new <code>DetailedAthlete</code>.
   * @alias module:model/DetailedAthlete
   * @class
   * @implements module:model/SummaryAthlete
   */
  var exports = function() {
    SummaryAthlete.call(this);
  };

  /**
   * Constructs a <code>DetailedAthlete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DetailedAthlete} obj Optional instance to populate.
   * @return {module:model/DetailedAthlete} The populated <code>DetailedAthlete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      SummaryAthlete.constructFromObject(data, obj);
      if (data.hasOwnProperty('follower_count'))
        obj.followerCount = ApiClient.convertToType(data['follower_count'], 'Number');
      if (data.hasOwnProperty('friend_count'))
        obj.friendCount = ApiClient.convertToType(data['friend_count'], 'Number');
      if (data.hasOwnProperty('measurement_preference'))
        obj.measurementPreference = ApiClient.convertToType(data['measurement_preference'], 'String');
      if (data.hasOwnProperty('ftp'))
        obj.ftp = ApiClient.convertToType(data['ftp'], 'Number');
      if (data.hasOwnProperty('weight'))
        obj.weight = ApiClient.convertToType(data['weight'], 'Number');
      if (data.hasOwnProperty('clubs'))
        obj.clubs = ApiClient.convertToType(data['clubs'], [SummaryClub]);
      if (data.hasOwnProperty('bikes'))
        obj.bikes = ApiClient.convertToType(data['bikes'], [SummaryGear]);
      if (data.hasOwnProperty('shoes'))
        obj.shoes = ApiClient.convertToType(data['shoes'], [SummaryGear]);
    }
    return obj;
  }

  /**
   * The athlete's follower count.
   * @member {Number} followerCount
   */
  exports.prototype.followerCount = undefined;

  /**
   * The athlete's friend count.
   * @member {Number} friendCount
   */
  exports.prototype.friendCount = undefined;

  /**
   * The athlete's preferred unit system.
   * @member {module:model/DetailedAthlete.MeasurementPreferenceEnum} measurementPreference
   */
  exports.prototype.measurementPreference = undefined;

  /**
   * The athlete's FTP (Functional Threshold Power).
   * @member {Number} ftp
   */
  exports.prototype.ftp = undefined;

  /**
   * The athlete's weight.
   * @member {Number} weight
   */
  exports.prototype.weight = undefined;

  /**
   * The athlete's clubs.
   * @member {Array.<module:model/SummaryClub>} clubs
   */
  exports.prototype.clubs = undefined;

  /**
   * The athlete's bikes.
   * @member {Array.<module:model/SummaryGear>} bikes
   */
  exports.prototype.bikes = undefined;

  /**
   * The athlete's shoes.
   * @member {Array.<module:model/SummaryGear>} shoes
   */
  exports.prototype.shoes = undefined;

  // Implement SummaryAthlete interface:
  /**
   * The unique identifier of the athlete
   * @member {Number} id
   */
  exports.prototype.id = undefined;

  /**
   * Resource state, indicates level of detail. Possible values: 1 -> \"meta\", 2 -> \"summary\", 3 -> \"detail\"
   * @member {Number} resourceState
   */
  exports.prototype.resourceState = undefined;

  /**
   * The athlete's first name.
   * @member {String} firstname
   */
  exports.prototype.firstname = undefined;

  /**
   * The athlete's last name.
   * @member {String} lastname
   */
  exports.prototype.lastname = undefined;

  /**
   * URL to a 62x62 pixel profile picture.
   * @member {String} profileMedium
   */
  exports.prototype.profileMedium = undefined;

  /**
   * URL to a 124x124 pixel profile picture.
   * @member {String} profile
   */
  exports.prototype.profile = undefined;

  /**
   * The athlete's city.
   * @member {String} city
   */
  exports.prototype.city = undefined;

  /**
   * The athlete's state or geographical region.
   * @member {String} state
   */
  exports.prototype.state = undefined;

  /**
   * The athlete's country.
   * @member {String} country
   */
  exports.prototype.country = undefined;

  /**
   * The athlete's sex.
   * @member {module:model/SummaryAthlete.SexEnum} sex
   */
  exports.prototype.sex = undefined;

  /**
   * Deprecated.  Use summit field instead. Whether the athlete has any Summit subscription.
   * @member {Boolean} premium
   */
  exports.prototype.premium = undefined;

  /**
   * Whether the athlete has any Summit subscription.
   * @member {Boolean} summit
   */
  exports.prototype.summit = undefined;

  /**
   * The time at which the athlete was created.
   * @member {Date} createdAt
   */
  exports.prototype.createdAt = undefined;

  /**
   * The time at which the athlete was last updated.
   * @member {Date} updatedAt
   */
  exports.prototype.updatedAt = undefined;


  /**
   * Allowed values for the <code>measurementPreference</code> property.
   * @enum {String}
   * @readonly
   */
  exports.MeasurementPreferenceEnum = {
    /**
     * value: "feet"
     * @const
     */
    feet: "feet",

    /**
     * value: "meters"
     * @const
     */
    meters: "meters"
  };

  return exports;

}));
