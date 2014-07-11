Node.js
=======

The |project| is available as a Node.js npm package. For access to the source, contact `Michael Wasser <http://about.me/mwasser>`_.

Once installed, the package can be include via

.. code-block:: javascript

  var YourChartClient = require('yourchart')

To create a client, use

.. code-block:: javascript

  var client = new YourChartClient('<Epic MyChart Username>', '<Epic MyChart Password>', '<Epic-specified Organization ID>')

To get an organizations id, you can programatically access an array of all known sites using ``YourChartClient.sites``. Each site will have an ``orgId`` which tells the client where to fetch health records from. Each object in the sites array looks like the following example:

.. code-block:: javascript
  :emphasize-lines: 4
  
  { 
    serviceUrl: 'https://mychart.swedish.org/MyChartWeb/Wcf/Epic.MyChartMobile/MyChartMobile.svc/',
    name: 'Swedish',
    orgId: '512',
    myChartBranding: 'MyChart',
    myChartUserLabel: 'Username',
    locations: [ 'Washington' ],
    timezone: 'America/Los_Angeles'
  }

Once a client is initialized, any of the listed :doc:`Calls <../calls>` can be used to access patient information.
In the node.js client, the names of calls and the properties listed in the resulting :doc:`Models <../models>`
will be camel-cased versions of the call. E.g. The call documented as ``ListPastAppointments`` becomes ``listPastAppointments`` in the node.js client.
For each call, the first paramenter will be a hash of both request parameters (key would be the name of the parameter) as well as the request model
(key would be ``request_model``). The second parameter will be a callback with a 
first parameter communicating error conditions if there are error conditions,
and a second parameter with the requests response model. For example, a call to ``getAccountDetails`` may look as follows:

.. code-block:: javascript

  client.getAccountDetails({
    request_model: {
      billingAccountId: "<account id>",
      billingAccountType: <account type>
    }
  }, function (err, response) {
    if (response.isPaperless) {
      console.log("User receives paperless statements!");
    }
  });

Calls to authenticate will be automatically made, during the first call and its results
are stored in ``authenticateResponse`` on the instance of the client. Calls to authenticate
directly will also authorize the client/ store the results for future calls.

Putting it all together:

.. code-block:: javascript

  var YourChartClient = require('yourchart'),
      orgId, client;

  orgId = YourChartClient.filter(function (elm) { return elm.name == 'Swedish'; })[0];
  
  client = new YourChartClient('<Swedish MyChart username>', '<Swedish MyChart password>', orgId);

  client.listPastAppointments({identifier: 0, index: 0}, function (err, data) {
    if (err) return console.log(err.stack);

    console.log("Past Appointments:");
    console.log("==================");

    console.dir(data);

    if (typeof data.appointmentList !== undefined && data.appointmentList.length > 0) {
      var appointmentID = data.appointmentList[0].dat;

      epicClient.getEncounter({identifier: 0, appointment_dat: appointmentID}, function (err, data) {
        if (err) return console.log(err.stack);

        console.log("");
        console.log("First Past Appointment Details:");
        console.log("===============================");

        console.dir(data);
      });
    }
  });
