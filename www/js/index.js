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
        phoneNumber: '',
        isDriver: false,
        seatsInCar: 1
    },
    drivers: [
        {
            name: 'Jean-Guy LaPatate',
            phone: '8191234567',
            distanceFromHome: 1,
            timeLeaving: '18:00',
            seatsAvailable: 2,
            karma: 2
        },
        {
            name: 'Bob Vachon',
            phone: '4161234567',
            distanceFromHome: 2,
            timeLeaving: '18:00',
            seatsAvailable: 1,
            karma: -1
        },
        {
            name: 'Amanda Hugankis',
            phone: '5141234567',
            distanceFromHome: 2,
            timeLeaving: '18:30',
            seatsAvailable: 3,
            karma: 100
        }
    ],
    riders: [

        {
            name: 'Booby Tarantino',
            phone: '6471234567',
            distanceFromHome: 1,
            timeLeaving: '18:00',
            karma: 2
        },
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
    ],
    acceptedRiders: [],
    rideCreated: false
}

var util = {
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
        $('#ride-status').hide()
        $('#rider-information').hide()
        $('#user-profile').hide()
        $('#stats').hide()
        $('#no-ride-created').hide()
    },
    applyNavbarProfile: function (profile) {
        if (profile === 'driver') {
            $('#main-nav').show()
            $('#simple-nav').hide()
            $('#nav-tabs').empty()
            if (state.rideCreated) {
                $('#nav-tabs').append('<li class="tab riders"><a>Riders</a></li>')
                $('#nav-tabs').append('<li class="tab ride-status"><a>Ride Status</a></li>')
            } else {
                $('#nav-tabs').append('<li class="tab riders"><a>Riders</a></li>')
            }
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
            if (state.rideCreated) {
                $('#app-riders-section').show()
            } else {
                $('#no-ride-created').show()
            }
            var data = { riders: state.riders }
            if (data) {
                $('#app-riders-section').children('ul').remove()
                var source = $('#riders-list').html()
                var template = Handlebars.compile(source)
                $('#app-riders-section').append(template(data))
            }
        } else {
            util.applyNavbarProfile('rider')
            $('#app-drivers-section').show()
            var data = { drivers: state.drivers }
            if (data) {
                $('#app-drivers-section').children('ul').remove()
                var source = $('#drivers-list').html()
                var template = Handlebars.compile(source)
                $('#app-drivers-section').append(template(data))
            }
        }
    },
    rideStatus: function () {
        util.applyNavbarProfile('driver')
        $('.ride-status').addClass('active')
        $('#ride-status').show()
        var data = { acceptedRiders: state.acceptedRiders }
        if (data) {
            $('#ride-status').children('ul').remove()
            var source = $('#accepted-riders-list').html()
            var template = Handlebars.compile(source)
            $('#ride-status').append(template(data))
        }
    },
    createRide: function () {
        state.rideCreated = true
    },
    saveInitialProfile: function () {
        state.profile.fullName = $('#name').val()
        state.profile.homeAddress = $('#address').val()
        state.profile.phoneNumber = $('#phone').val()
        state.profile.isDriver = $('#driver-toggle').prop('checked')
        state.profile.seatsInCar = parseInt($('#app-number-rides').find(":selected").val(), 10)
    },
    saveProfile: function () {
        state.profile.fullName = $('#profile-name').val()
        state.profile.homeAddress = $('#profile-address').val()
        state.profile.phoneNumber = $('#profile-phone').val()
        state.profile.isDriver = $('#profile-driver-toggle').prop('checked')
        state.profile.seatsInCar = parseInt($('#profile-app-number-rides').find(":selected").val(), 10)
    },
    findWithAttr: function (array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
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
                if ($('#driver-toggle').prop('checked')) {
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
                $('#profile-phone').val(state.profile.phoneNumber)
                $('#profile-driver-toggle').prop('checked', state.profile.isDriver)
                if (state.profile.isDriver) {
                    $('.app-number-rides-question').show()
                } else {
                    $('.app-number-rides-question').hide()
                }
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

            $(document).on('click', '.user-image', function() {
                util.hideAll()
                util.applyNavbarProfile('rider-profile')
                $('#rider-information').show()
            })

            $(document).on('click', '.accept-rider', function() {
                const i = util.findWithAttr(state.riders, 'name', $(this).parent().children('span.title-name').text())
                const [ accRider ] = state.riders.splice(i, 1)
                state.acceptedRiders.push(accRider)
                util.hideAll()
                util.mainScreen()
            })

            $(document).on('click', '.remove-rider', function() {
                const i = util.findWithAttr(state.acceptedRiders, 'name', $(this).parent().children('span.title-name').text())
                const [ remRider ] = state.acceptedRiders.splice(i, 1)
                state.riders.push(remRider)
                util.hideAll()
                util.rideStatus()
            })

            $(document).on('click', '.get-ride', function () {
                const i = util.findWithAttr(state.drivers, 'name', $(this).parent().children('span.title-name').text())
                state.drivers.splice(i, 1)
                var rider = {
                    name: state.profile.fullName,
                    phone: state.profile.phoneNumber,
                    distanceFromHome: 2, // API call
                    timeLeaving: '18:00', // API call
                    karma: 2 // API call
                }
                state.riders.push(rider)
                util.hideAll()
                util.mainScreen()
            })

            $(document).on('click', '.riders', function () {
                util.hideAll()
                util.mainScreen()
                $('.riders').addClass('active')
            })

            $(document).on('click', '.ride-status', function () {
                util.hideAll()
                util.rideStatus()
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
            if (state.profile.isDriver) {
                $('.app-number-rides-question').show()
            } else {
                $('.app-number-rides-question').hide()
            }
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