## An application to visualize and work with energy data primary obtained from Spanish Electric Network.

This application downloads data through the Spanish Electric Network API.
https://api.esios.ree.es/ in order to show these data, and perform calculations on them.

Through an own API it will store in BBDD the results of relevant calculations to be able to present them independently.

Front technology: Angular 6, Chart.js, Blob, Bootstrap 4 for Angular.
Back technology: node.js, express, mongoDB..

A long-term development for the management of energy data is planned

At this time, the following functionalities are implemented:

###For generic archive (pdf,xml,xls)
Getting a list of archives
Getting a list of archives by date
Getting a list of archives filtered by taxonomy terms
Getting a list of archives by date and filter by taxonomy terms
Getting a list of archives by start_date, end_date and date_type datos
Getting a list of archives by start_date, end_date and date_type publicacion
Getting a specific Archive
Download Archive (pdf,xls)

###For archive JSON
Get a specific Archive Value of type JSON
Getting a list of archives of type JSON
Getting a list of archives of type JSON filtered by taxonomy terms
Getting a specific Archive of type JSON
Getting json data for calculations by id_archive, start_date, end_date
