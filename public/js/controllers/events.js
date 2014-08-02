(function(angular) {
    'use strict';

    var EventsController = [
        '$scope', '$stateParams', '$location', 'Global', 'Events', 'Geocoder',
        function ($scope, $stateParams, $location, Global, Events, Geocoder) {
            $scope.global = Global;

            $scope.create = function() {

                var eventData = {
                    title: this.title,
                    content: this.content,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    address: this.address,
                    author: this.author,
                    tags: this.tags,
                    latlng: null
                };

                var saveEvent = function(data) {
                    var event = new Events(data);
                    event.$save(function(response) {
                        $location.path('/api/v1/events/' + response._id);
                    });

                    $scope.title = '';
                    $scope.content = '';
                    $scope.startTime = '';
                    $scope.endTime = '';
                    $scope.address = '';
                    $scope.author = '';
                    $scope.tags = '';
                    $scope.latlng = null;
                };

                if (this.address){
                    Geocoder.latLngForAddress(this.address)
                        .then(function(data) {
                            if (data.hasOwnProperty('lat')){
                                eventData.latlng = [data.lat, data.lng];
                                console.log(eventData.latlng);
                            }
                            saveEvent(eventData);
                        });
                } else {
                    saveEvent(eventData);
                }
            };

            $scope.remove = function(event) {
                if (event) {
                    event.$remove();

                    for (var i in $scope.events) {
                        if ($scope.events[i] === event) {
                            $scope.events.splice(i, 1);
                        }
                    }
                }
                else {
                    $scope.events.$remove();
                    $location.path('/api/v1/events');
                }
            };

            $scope.update = function() {
                var event = $scope.event;
                if (!event.updated) {
                    event.updated = [];
                }
                event.updated.push(new Date().getTime());

                event.$update(function() {
                    $location.path('/api/v1/events/' + event._id);
                });
            };

            $scope.find = function() {
                Events.query(function(events) {
                    $scope.events = events;
                });
            };

            $scope.findOne = function() {
                Events.get({
                    eventId: $stateParams.eventId
                }, function(event) {
                    $scope.event = event;
                });
            };
        }
    ];

    angular.module('startupwichita.controllers').controller('EventsController', EventsController);
})(window.angular);
