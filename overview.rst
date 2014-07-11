Overview
========

* This is a programatic client that can get health records on an individual's account given a MyChart hospital location, a MyChart username, and a MyChart password
* Currently supports about 250 :doc:`hospital systems <overview/hospitals>`
* With this programatic client, the following types of applications are relatively simple to implement with only patient approval to release their records

Gocodo YourChart Client is set of programmatic descriptions and webservice client for Epic's `MyChart Mobile product <https://itunes.apple.com/us/app/mychart/id382952264?mt=8>`_.
With this, a programmer can quickly connect to and retrieve the health records on behalf of individuals for use
in applications. A handful of sample applications my include:

* Creating a Personal Health Record (PHR) application (mobile/ web)
* A Personal Health Record system that aggregates health records across many different hosptial systems
* A way to prove a person is who they say they are and have particular conditions/ go to particular medical systems
* Transfer basic information on individuals going to a new doctor
* Gathering information for a clinical trial

.. toctree::
   :maxdepth: 2

   overview/hospitals
   overview/data
   overview/api_clients
