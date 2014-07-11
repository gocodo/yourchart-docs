Overview
========

The Gocodo YourChart Client is a set of programmatic clients for Epic's `MyChart Mobile product <https://itunes.apple.com/us/app/mychart/id382952264?mt=8>`_.
With this, a programmer can quickly connect to and retrieve the health records of an individual.
|project| currently supports connecting to about 250 different :doc:`hospital systems <overview/hospitals>`.
A handful of applications that this set of client libraries could be used to create include:

* Creating a Personal Health Record (PHR) application (mobile/ web)
* A Personal Health Record system that aggregates health records across many different hosptial systems
* A way to prove a person is who they say they are and have particular conditions/ go to particular medical systems
* Transfer basic information on individuals going to a new doctor
* Gathering information for a clinical trial

All a developer needs to get started are an individual's MyChart hosptial location, username, password, and approval to access their health records.

.. toctree::
   :maxdepth: 2

   overview/hospitals
   overview/data
   overview/api_clients
