/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var util = {
    getDummyDriverData: function () {
        var data = {
            drivers: [
                {
                    name: 'John Doe',
                    phone: '6471234567',
                    distanceFromHome: 1,
                    timeLeaving: '18:00',
                    seatsAvailable: 2,
                    karma: 2
                },
                {
                    name: 'Steve Arnott',
                    phone: '4161234567',
                    distanceFromHome: 2,
                    timeLeaving: '18:00',
                    seatsAvailable: 1,
                    karma: -1
                },
                {
                    name: 'Lindsay Bluth',
                    phone: '5141234567',
                    distanceFromHome: 2,
                    timeLeaving: '18:30',
                    seatsAvailable: 3,
                    karma: 100
                }
            ]
        }

        return data;
    },  
    isDriver: function (userType) {
        //TODO: Add ajax call
        if (this.checkLocalStorage('localStorage')) {
            window.localStorage.setItem('driver', userType)
        }
    },
    getUserType: function() {
        if (this.checkLocalStorage('localStorage')) {
            return window.localStorage.getItem('driver')
        }
    },
    checkLocalStorage: function (type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    },
    getListItemTemplate: function (data) {
        var template = '<utl '
    },
    hideAll: function () {
        $('#app-signup').hide()
        $('#top-nav').hide()
        $('#new-ride').hide()
        $('#app-drivers-section').hide()
        $('#app-riders-section').hide()
        $('#rider-information').hide()
    },
    createRide: function () {
        // Replace fallbacks with current user data
        var dest = $('#destination-address').val() || '502 Green St, Whitby, ON L1N 4E5'
        var time = $('#departure-time').val() ? $('#departure-time').val()
                                                    .split(':')
                                                    .map(function (val) { return parseInt(val, 10) })
                                                    .reduce(function (acc, val) { return acc * 60 + val }, 0)
                                              : 1025

        // Create a ride
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        var self = this
        $(document).ready(function () {
            // Initialize timepicker
            $('.timepicker').pickatime({
                default: 'now', // Set default time: 'now', '1:30AM', '16:30'
                fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
                twelvehour: false, // Use AM/PM or 24-hour format
                donetext: 'OK', // text for done-button
                cleartext: 'Clear', // text for clear-button
                canceltext: 'Cancel', // Text for cancel-button
                autoclose: false, // automatic close timepicker
                ampmclickable: true, // make AM PM clickable
                aftershow: function(){} //Function for after opening timepicker
            })
            
            var driver = null;
            $('#driver-toggle').change(function(){
                if ($('#driver-toggle').prop('checked') === true) {
                    $('.app-number-rides-question').show()
                    $('#app-number-rides').material_select()
                    util.isDriver(true)
                } else {
                    $('.app-number-rides-question').hide()
                    $('#app-number-rides').material_select('destroy')
                    util.isDriver(false)
                }
            })

            $('.app-signup-button').on('click', function() {
                util.hideAll()

                $('#top-nav').show()

                $('.nav-title').addClass('active')
                
                if (util.getUserType()) {
                    $('.nav-title').html('Riders')
                    $('#app-drivers-section').show();
                    var data = util.getDummyDriverData();
                    if (data) {
                        var source = $('#drivers-list').html();
                        var template = Handlebars.compile(source);
                        $('#app-drivers-section').append(template(data))
                        
                    }
                } 
            })

            $('.new-ride').on('click', function () {
                util.hideAll()
                $('#new-ride').show()
            })

            $('.rider').on('click', function() {
                util.hideAll()
                $('#rider-information').show()
            })

            // $(document).on('click', '.rider', function() {
            //     $('#app-drivers-section').hide();
            //     $('#rider-information').show();
            // })  

            $('.create-ride').on('click', function () {
                util.hideAll()
                util.createRide()
                $('#app-riders-section').show()
            })

            $('.cancel').on('click', function () {
                util.hideAll()
                $('#app-riders-section').show()
            })

            util.hideAll()
            $('#app-signup').show()
        })
        
        this.bindEvents()
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false)
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready')
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // console.log(id)
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
}