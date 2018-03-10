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

var state = {
    profile: {
        fullName: '',
        homeAddress: '',
        isDriver: false,
        seatsInCar: 1
    }
}

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

        return data
    },
    getDummyRiderData: function () {
        var data = {
            riders: [
                {
                    name: 'John Doe',
                    phone: '6471234567',
                    distanceFromHome: 1,
                    timeLeaving: '18:00',
                    karma: 2
                },
                {
                    name: 'Steve Arnott',
                    phone: '4161234567',
                    distanceFromHome: 2,
                    timeLeaving: '18:00',
                    karma: -1
                },
                {
                    name: 'Lindsay Bluth',
                    phone: '5141234567',
                    distanceFromHome: 2,
                    timeLeaving: '18:30',
                    karma: 100
                }
            ]
        }

        return data
    },
    userIsDriver: function() {
        // if (this.checkLocalStorage('localStorage')) {
        //     return window.localStorage.getItem('driver') === 'true'
        // }
        return state.profile.isDriver
    },
    /*
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
    */
    hideAll: function () {
        $('#main-nav').hide()
        $('#simple-nav').hide()
        $('#app-signup').hide()
        $('#new-ride').hide()
        $('#app-drivers-section').hide()
        $('#app-riders-section').hide()
        $('#rider-information').hide()
        $('#user-profile').hide()
        $('#stats').hide()
    },
    applyNavbarProfile: function (profile) {
        if (profile === 'driver') {
            $('#main-nav').show()
            $('#simple-nav').hide()
            $('#nav-tabs').empty()
            $('#nav-tabs').append('<li class="tab"><a>Riders</a></li>')
        } else if (profile === 'rider') {
            $('#main-nav').show()
            $('#simple-nav').hide()
            $('#nav-tabs').empty()
            $('#nav-tabs').append('<li class="tab"><a>Drivers</a></li>')
        } else if (profile === 'new-ride') {
            $('#main-nav').hide()
            $('#simple-nav').show()
            $('#nav-title').text('New Ride')
            $('#left-action').empty()
            $('#right-action').empty()
            $('#left-action').append('<li><a class="create-ride">CREATE</a></li>')
            $('#right-action').append('<li><a class="cancel">CANCEL</a></li>')
        } else if (profile === 'rider-profile') {
            $('#main-nav').hide()
            $('#simple-nav').show()
            $('#nav-title').text('Rider Profile')
            $('#left-action').empty()
            $('#right-action').empty()
            $('#left-action').append('<li><a class="cancel">BACK</a></li>')
        } else if (profile === 'profile') {
            $('#main-nav').hide()
            $('#simple-nav').show()
            $('#nav-title').text('Profile')
            $('#left-action').empty()
            $('#right-action').empty()
            $('#left-action').append('<li><a class="save-profile">SAVE</a></li>')
            $('#right-action').append('<li><a class="cancel">CANCEL</a></li>')
        } else if (profile === 'stats') {
            $('#main-nav').hide()
            $('#simple-nav').show()
            $('#nav-title').text('Eco-Stats')
            $('#left-action').empty()
            $('#right-action').empty()
            $('#left-action').append('<li><a class="cancel">BACK</a></li>')
        } else {
            $('#main-nav').hide()
            $('#simple-nav').hide()
        }
    },
    mainScreen: function () {
        if (util.userIsDriver()) {
            util.applyNavbarProfile('driver')
            $('#app-riders-section').show()
            var data = util.getDummyRiderData()
            if (data) {
                $('#app-riders-section').children('ul').remove()
                var source = $('#riders-list').html()
                var template = Handlebars.compile(source)
                $('#app-riders-section').append(template(data))
            }
        } else {
            util.applyNavbarProfile('rider')
            $('#app-drivers-section').show()
            var data = util.getDummyDriverData()
            if (data) {
                $('#app-drivers-section').children('ul').remove()
                var source = $('#drivers-list').html()
                var template = Handlebars.compile(source)
                $('#app-drivers-section').append(template(data))
            }
        }
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
    },
    saveInitialProfile: function () {
        state.profile.fullName = $('#name').val()
        state.profile.homeAddress = $('#address').val()
        state.profile.isDriver = $('#driver-toggle').prop('checked')
        state.profile.seatsInCar = parseInt($('#app-number-rides').find(":selected").val(), 10)
    },
    saveProfile: function () {
        state.profile.fullName = $('#profile-name').val()
        state.profile.homeAddress = $('#profile-address').val()
        state.profile.isDriver = $('#profile-driver-toggle').prop('checked')
        state.profile.seatsInCar = parseInt($('#profile-app-number-rides').find(":selected").val(), 10)
    }
}

var app = {
    // Application Constructor
    initialize: function() {
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
            
            var driver = null
            $('#driver-toggle').change(function(){
                if ($('#driver-toggle').prop('checked') === true) {
                    $('.app-number-rides-question').show()
                    $('#app-number-rides').material_select()
                } else {
                    $('.app-number-rides-question').hide()
                    $('#app-number-rides').material_select('destroy')
                }
            })
            $('#profile-driver-toggle').change(function(){
                if ($('#profile-driver-toggle').prop('checked')) {
                    $('.app-number-rides-question').show()
                    $('#profile-app-number-rides').material_select()
                } else {
                    $('.app-number-rides-question').hide()
                    $('#profile-app-number-rides').material_select('destroy')
                }
            })

            $('.app-signup-button').on('click', function() {
                util.saveInitialProfile()
                util.hideAll()
                util.mainScreen()
            })

            $('.profile').on('click', function () {
                util.hideAll()
                util.applyNavbarProfile('profile')
                $('#user-profile').show()
                $('#profile-name').val(state.profile.fullName)
                $('#profile-address').val(state.profile.homeAddress)
                $('#profile-driver-toggle').prop('checked', state.profile.isDriver)
            })

            $('.new-ride').on('click', function () {
                util.hideAll()
                util.applyNavbarProfile('new-ride')
                $('#new-ride').show()
            })

            $('.stats').on('click', function () {
                util.hideAll()
                util.applyNavbarProfile('stats')
                $('#stats').show()
            })

            $(document).on('click', '.rider img', function() {
                util.hideAll()
                util.applyNavbarProfile('rider-profile')
                $('#rider-information').show()
            })

            $(document).on('click', '.create-ride', function () {
                util.hideAll()
                util.createRide()
                util.mainScreen()
            })

            $(document).on('click', '.save-profile', function() {
                util.saveProfile()
                util.hideAll()
                util.mainScreen()
            })

            $(document).on('click', '.cancel', function () {
                util.hideAll()
                util.mainScreen()
            })

            // Upon app load, hide everything then show signup page
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