Calls
=====

Each call bellow will send a web request to the previously selected hospital system. For more information
on creating a client and using the given calls, see the client specific documentation (e.g. the :doc:`node.js client <getting_started/nodejs>`).

.. toctree::
   :maxdepth: 2

   calls/authenticate
   calls/get_account_details
   calls/get_bills_and_statements
   calls/get_encounters
   calls/get_message_detail
   calls/get_test_details
   calls/list_alerts
   calls/list_allergies
   calls/list_current_health_issues
   calls/list_future_appointments
   calls/list_health_advisory
   calls/list_immunizations
   calls/list_inbox
   calls/list_medications
   calls/list_message_recipients
   calls/list_patient_accesses
   calls/list_past_appointments
   calls/list_test_results
   calls/log_audit

In addition to the calls listed above, support could be theoretically added for any feature seen in MyChart Mobile.
Here's a list of calls known to exist at some :doc:`hospitals <overview/hospitals>` that are currently unsupported by Gocodo Epic Client:

 * Schedule Appointment
 * Send Message (to a doctor, nurse, etc)
 * Get Imaging Results
 * Request Medication Refill

If are working with a site that supports any of the above features and would like to see support added, please
:doc:`look here <contribute/mychart_test_logins>`.
