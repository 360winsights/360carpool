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

            self.hideAll()
            
            $('#driver-toggle').change(function(){
                if ($('#driver-toggle').prop('checked') === true) {
                    $('.app-number-rides-question').show()
                    $('#app-number-rides').material_select()
                } else {
                    $('.app-number-rides-question').hide()
                    $('#app-number-rides').material_select('destroy')
                }
            })

            $('.app-signup-button').on('click', function() {
                $('#app-signup').hide()
                $('#app-riders-section').show()
            })

            $('.new-ride').on('click', function () {
                self.hideAll()
                $('#new-ride').show()
            })

            $('.create-ride').on('click', function () {
                self.hideAll()
                $('#app-riders-section').show()
            })

            $('.cancel').on('click', function () {
                self.hideAll()
                $('#app-riders-section').show()
            })
        })
        
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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
    },
    hideAll: function () {
        $('#top-nav').hide()
        $('#new-ride').hide()
        $('#app-riders-section').hide()
    }
};
