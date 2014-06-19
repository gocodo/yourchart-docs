AuthenticateResponse
====================

Describes the current session and Epic deployment features.

=====================  ==========================  ====================
Property               Type                        Description
=====================  ==========================  ====================
AccountID              String                      Username/ Account ID
Available2011Features  Boolean                     Epic 2011 features enabled
Available2012Features  Boolean                     Epic 2012 features enabled
Available2013Features  Boolean                     Epic 2013 features enabled
HomeURL                String                      *unknown*
DeviceTimeout          Integer                     *unknown*
FeatureInformation     :doc:`feature_information`  List of supported features by given deployment
IsAdmitted             Boolean                     *unknown*
IsPatient              Boolean                     *unknown*
Name                   String                      Individual's full name
ReadOnlyServer         Boolean                     *unknown*
ShowTerms              String                      Show terms and conditions. Generally specified when user hasn't yet accepted terms. *Note the possible values are unknown*
Status                 String                      *unknown*
TermsConditions        String                      Text for terms and conditions when ShowTerms is enabled
Ticket                 String                      Login session token to be used in all future requests. Most client's should record this automatically.
TicketTimeout          Integer                     Number of minutes (*this is a guess*) before login session token will expire.
=====================  ==========================  ====================

**Used in calls**:

* :doc:`../calls/authenticate`
