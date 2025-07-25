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
    define(['ApiClient', 'model/ActivityType', 'model/LatLng', 'model/MetaActivity', 'model/MetaAthlete', 'model/PolylineMap', 'model/SportType'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ActivityType'), require('./LatLng'), require('./MetaActivity'), require('./MetaAthlete'), require('./PolylineMap'), require('./SportType'));
  } else {
    // Browser globals (root is window)
    if (!root.StravaApiV3) {
      root.StravaApiV3 = {};
    }
    root.StravaApiV3.SummaryActivity = factory(root.StravaApiV3.ApiClient, root.StravaApiV3.ActivityType, root.StravaApiV3.LatLng, root.StravaApiV3.MetaActivity, root.StravaApiV3.MetaAthlete, root.StravaApiV3.PolylineMap, root.StravaApiV3.SportType);
  }
}(this, function(ApiClient, ActivityType, LatLng, MetaActivity, MetaAthlete, PolylineMap, SportType) {
  'use strict';

  /**
   * The SummaryActivity model module.
   * @module model/SummaryActivity
   * @version 3.0.0
   */

  /**
   * Constructs a new <code>SummaryActivity</code>.
   * @alias module:model/SummaryActivity
   * @class
   * @implements module:model/MetaActivity
   */
  var exports = function() {
    MetaActivity.call(this);
  };

  /**
   * Constructs a <code>SummaryActivity</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SummaryActivity} obj Optional instance to populate.
   * @return {module:model/SummaryActivity} The populated <code>SummaryActivity</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      MetaActivity.constructFromObject(data, obj);
      if (data.hasOwnProperty('external_id'))
        obj.externalId = ApiClient.convertToType(data['external_id'], 'String');
      if (data.hasOwnProperty('upload_id'))
        obj.uploadId = ApiClient.convertToType(data['upload_id'], 'Number');
      if (data.hasOwnProperty('athlete'))
        obj.athlete = MetaAthlete.constructFromObject(data['athlete']);
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('distance'))
        obj.distance = ApiClient.convertToType(data['distance'], 'Number');
      if (data.hasOwnProperty('moving_time'))
        obj.movingTime = ApiClient.convertToType(data['moving_time'], 'Number');
      if (data.hasOwnProperty('elapsed_time'))
        obj.elapsedTime = ApiClient.convertToType(data['elapsed_time'], 'Number');
      if (data.hasOwnProperty('total_elevation_gain'))
        obj.totalElevationGain = ApiClient.convertToType(data['total_elevation_gain'], 'Number');
      if (data.hasOwnProperty('elev_high'))
        obj.elevHigh = ApiClient.convertToType(data['elev_high'], 'Number');
      if (data.hasOwnProperty('elev_low'))
        obj.elevLow = ApiClient.convertToType(data['elev_low'], 'Number');
      if (data.hasOwnProperty('type'))
        obj.type = ActivityType.constructFromObject(data['type']);
      if (data.hasOwnProperty('sport_type'))
        obj.sportType = SportType.constructFromObject(data['sport_type']);
      if (data.hasOwnProperty('start_date'))
        obj.startDate = ApiClient.convertToType(data['start_date'], 'Date');
      if (data.hasOwnProperty('start_date_local'))
        obj.startDateLocal = ApiClient.convertToType(data['start_date_local'], 'Date');
      if (data.hasOwnProperty('timezone'))
        obj.timezone = ApiClient.convertToType(data['timezone'], 'String');
      if (data.hasOwnProperty('start_latlng'))
        obj.startLatlng = LatLng.constructFromObject(data['start_latlng']);
      if (data.hasOwnProperty('end_latlng'))
        obj.endLatlng = LatLng.constructFromObject(data['end_latlng']);
      if (data.hasOwnProperty('achievement_count'))
        obj.achievementCount = ApiClient.convertToType(data['achievement_count'], 'Number');
      if (data.hasOwnProperty('kudos_count'))
        obj.kudosCount = ApiClient.convertToType(data['kudos_count'], 'Number');
      if (data.hasOwnProperty('comment_count'))
        obj.commentCount = ApiClient.convertToType(data['comment_count'], 'Number');
      if (data.hasOwnProperty('athlete_count'))
        obj.athleteCount = ApiClient.convertToType(data['athlete_count'], 'Number');
      if (data.hasOwnProperty('photo_count'))
        obj.photoCount = ApiClient.convertToType(data['photo_count'], 'Number');
      if (data.hasOwnProperty('total_photo_count'))
        obj.totalPhotoCount = ApiClient.convertToType(data['total_photo_count'], 'Number');
      if (data.hasOwnProperty('map'))
        obj.map = PolylineMap.constructFromObject(data['map']);
      if (data.hasOwnProperty('trainer'))
        obj.trainer = ApiClient.convertToType(data['trainer'], 'Boolean');
      if (data.hasOwnProperty('commute'))
        obj.commute = ApiClient.convertToType(data['commute'], 'Boolean');
      if (data.hasOwnProperty('manual'))
        obj.manual = ApiClient.convertToType(data['manual'], 'Boolean');
      if (data.hasOwnProperty('private'))
        obj._private = ApiClient.convertToType(data['private'], 'Boolean');
      if (data.hasOwnProperty('flagged'))
        obj.flagged = ApiClient.convertToType(data['flagged'], 'Boolean');
      if (data.hasOwnProperty('workout_type'))
        obj.workoutType = ApiClient.convertToType(data['workout_type'], 'Number');
      if (data.hasOwnProperty('upload_id_str'))
        obj.uploadIdStr = ApiClient.convertToType(data['upload_id_str'], 'String');
      if (data.hasOwnProperty('average_speed'))
        obj.averageSpeed = ApiClient.convertToType(data['average_speed'], 'Number');
      if (data.hasOwnProperty('max_speed'))
        obj.maxSpeed = ApiClient.convertToType(data['max_speed'], 'Number');
      if (data.hasOwnProperty('has_kudoed'))
        obj.hasKudoed = ApiClient.convertToType(data['has_kudoed'], 'Boolean');
      if (data.hasOwnProperty('hide_from_home'))
        obj.hideFromHome = ApiClient.convertToType(data['hide_from_home'], 'Boolean');
      if (data.hasOwnProperty('gear_id'))
        obj.gearId = ApiClient.convertToType(data['gear_id'], 'String');
      if (data.hasOwnProperty('kilojoules'))
        obj.kilojoules = ApiClient.convertToType(data['kilojoules'], 'Number');
      if (data.hasOwnProperty('average_watts'))
        obj.averageWatts = ApiClient.convertToType(data['average_watts'], 'Number');
      if (data.hasOwnProperty('device_watts'))
        obj.deviceWatts = ApiClient.convertToType(data['device_watts'], 'Boolean');
      if (data.hasOwnProperty('max_watts'))
        obj.maxWatts = ApiClient.convertToType(data['max_watts'], 'Number');
      if (data.hasOwnProperty('weighted_average_watts'))
        obj.weightedAverageWatts = ApiClient.convertToType(data['weighted_average_watts'], 'Number');
    }
    return obj;
  }

  /**
   * The identifier provided at upload time
   * @member {String} externalId
   */
  exports.prototype.externalId = undefined;

  /**
   * The identifier of the upload that resulted in this activity
   * @member {Number} uploadId
   */
  exports.prototype.uploadId = undefined;

  /**
   * @member {module:model/MetaAthlete} athlete
   */
  exports.prototype.athlete = undefined;

  /**
   * The name of the activity
   * @member {String} name
   */
  exports.prototype.name = undefined;

  /**
   * The activity's distance, in meters
   * @member {Number} distance
   */
  exports.prototype.distance = undefined;

  /**
   * The activity's moving time, in seconds
   * @member {Number} movingTime
   */
  exports.prototype.movingTime = undefined;

  /**
   * The activity's elapsed time, in seconds
   * @member {Number} elapsedTime
   */
  exports.prototype.elapsedTime = undefined;

  /**
   * The activity's total elevation gain.
   * @member {Number} totalElevationGain
   */
  exports.prototype.totalElevationGain = undefined;

  /**
   * The activity's highest elevation, in meters
   * @member {Number} elevHigh
   */
  exports.prototype.elevHigh = undefined;

  /**
   * The activity's lowest elevation, in meters
   * @member {Number} elevLow
   */
  exports.prototype.elevLow = undefined;

  /**
   * Deprecated. Prefer to use sport_type
   * @member {module:model/ActivityType} type
   */
  exports.prototype.type = undefined;

  /**
   * @member {module:model/SportType} sportType
   */
  exports.prototype.sportType = undefined;

  /**
   * The time at which the activity was started.
   * @member {Date} startDate
   */
  exports.prototype.startDate = undefined;

  /**
   * The time at which the activity was started in the local timezone.
   * @member {Date} startDateLocal
   */
  exports.prototype.startDateLocal = undefined;

  /**
   * The timezone of the activity
   * @member {String} timezone
   */
  exports.prototype.timezone = undefined;

  /**
   * @member {module:model/LatLng} startLatlng
   */
  exports.prototype.startLatlng = undefined;

  /**
   * @member {module:model/LatLng} endLatlng
   */
  exports.prototype.endLatlng = undefined;

  /**
   * The number of achievements gained during this activity
   * @member {Number} achievementCount
   */
  exports.prototype.achievementCount = undefined;

  /**
   * The number of kudos given for this activity
   * @member {Number} kudosCount
   */
  exports.prototype.kudosCount = undefined;

  /**
   * The number of comments for this activity
   * @member {Number} commentCount
   */
  exports.prototype.commentCount = undefined;

  /**
   * The number of athletes for taking part in a group activity
   * @member {Number} athleteCount
   */
  exports.prototype.athleteCount = undefined;

  /**
   * The number of Instagram photos for this activity
   * @member {Number} photoCount
   */
  exports.prototype.photoCount = undefined;

  /**
   * The number of Instagram and Strava photos for this activity
   * @member {Number} totalPhotoCount
   */
  exports.prototype.totalPhotoCount = undefined;

  /**
   * @member {module:model/PolylineMap} map
   */
  exports.prototype.map = undefined;

  /**
   * Whether this activity was recorded on a training machine
   * @member {Boolean} trainer
   */
  exports.prototype.trainer = undefined;

  /**
   * Whether this activity is a commute
   * @member {Boolean} commute
   */
  exports.prototype.commute = undefined;

  /**
   * Whether this activity was created manually
   * @member {Boolean} manual
   */
  exports.prototype.manual = undefined;

  /**
   * Whether this activity is private
   * @member {Boolean} _private
   */
  exports.prototype._private = undefined;

  /**
   * Whether this activity is flagged
   * @member {Boolean} flagged
   */
  exports.prototype.flagged = undefined;

  /**
   * The activity's workout type
   * @member {Number} workoutType
   */
  exports.prototype.workoutType = undefined;

  /**
   * The unique identifier of the upload in string format
   * @member {String} uploadIdStr
   */
  exports.prototype.uploadIdStr = undefined;

  /**
   * The activity's average speed, in meters per second
   * @member {Number} averageSpeed
   */
  exports.prototype.averageSpeed = undefined;

  /**
   * The activity's max speed, in meters per second
   * @member {Number} maxSpeed
   */
  exports.prototype.maxSpeed = undefined;

  /**
   * Whether the logged-in athlete has kudoed this activity
   * @member {Boolean} hasKudoed
   */
  exports.prototype.hasKudoed = undefined;

  /**
   * Whether the activity is muted
   * @member {Boolean} hideFromHome
   */
  exports.prototype.hideFromHome = undefined;

  /**
   * The id of the gear for the activity
   * @member {String} gearId
   */
  exports.prototype.gearId = undefined;

  /**
   * The total work done in kilojoules during this activity. Rides only
   * @member {Number} kilojoules
   */
  exports.prototype.kilojoules = undefined;

  /**
   * Average power output in watts during this activity. Rides only
   * @member {Number} averageWatts
   */
  exports.prototype.averageWatts = undefined;

  /**
   * Whether the watts are from a power meter, false if estimated
   * @member {Boolean} deviceWatts
   */
  exports.prototype.deviceWatts = undefined;

  /**
   * Rides with power meter data only
   * @member {Number} maxWatts
   */
  exports.prototype.maxWatts = undefined;

  /**
   * Similar to Normalized Power. Rides with power meter data only
   * @member {Number} weightedAverageWatts
   */
  exports.prototype.weightedAverageWatts = undefined;

  // Implement MetaActivity interface:
  /**
   * The unique identifier of the activity
   * @member {Number} id
   */
  exports.prototype.id = undefined;

  return exports;

}));
